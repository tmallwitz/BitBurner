import {getServers} from "/utils";

class BatchHackManager {
  private  distanceMS = 100;
  private  scriptW = "w-no-loop.js";
  private  scriptW2 = "w-no-loop_2.js";
  private  scriptG = "g-no-loop.js";
  private  scriptH = "h-no-loop.js";
  private src = 'home';
  private FreeRamAtHome = 128;


  private debug(ns:NS, s: string) {
    ns.tprint(s);
  }

  private  ScriptRamNeed(ns:NS) : number {
    return Math.max(ns.getScriptRam(this.scriptW),Math.max(ns.getScriptRam(this.scriptG),ns.getScriptRam(this.scriptH)));
  }

  private async CountPossibleThreadsAndCopyScripts(ns:NS): Promise<number> {
    const memPerScript = this.ScriptRamNeed(ns)
    //calc possible Threads
    let possibleThreads = 0;
    for(const server of getServers(ns)) {
      if (ns.hasRootAccess(server.name)) {
        let ram = ns.getServerMaxRam(server.name);
        if (server.name === 'home') ram -= this.FreeRamAtHome;
        possibleThreads += Math.floor(ram / memPerScript)
        await ns.scp(this.scriptW,server.name);
        await ns.scp(this.scriptW2,server.name);
        await ns.scp(this.scriptG,server.name);
        await ns.scp(this.scriptH,server.name);
      }
    }
    return possibleThreads;
  }


  private async Calculations(ns: NS, target:string): Promise<void> {
    const PartPerHack = ns.hackAnalyze(target);
    const HackThreads = Math.floor(0.5 / ns.hackAnalyze(target));
    const HackPart = PartPerHack * HackThreads;
    const HackSecRise = ns.hackAnalyzeSecurity(HackThreads)

    const GrowthNeeded = 1 / HackPart;
    const GrowthThread = Math.ceil(ns.growthAnalyze(target,GrowthNeeded))
    const GrowthSecRise = ns.growthAnalyzeSecurity(GrowthThread);

    const ThreadsForHackRise = Math.ceil(HackSecRise / 0.05);
    const ThreadsForGrowthRise = Math.ceil(GrowthSecRise / 0.05);
    //
    // const wRam = ns.getScriptRam("w.js") * ThreadsForHackRise+ThreadsForGrowthRise;
    // const gRam = ns.getScriptRam("g.js") * GrowthThread;
    // const hRam = ns.getScriptRam("h.js") * HackThreads;

    const timeG = Math.round(ns.getGrowTime(target));
    const timeW = Math.round(ns.getWeakenTime(target));
    const timeH = Math.round(ns.getHackTime(target));

    const ThreadsPerBatch = HackThreads+GrowthThread+ThreadsForHackRise+ThreadsForGrowthRise;
    const ThreadsPossible = await this.CountPossibleThreadsAndCopyScripts(ns);

    this.debug(ns,`ThreadsPerBatch: ${ThreadsPerBatch}, ThreadsPossible: ${ThreadsPossible} RamNeededPerBatch: ${ns.nFormat(ThreadsPerBatch*1.75 * 1000 * 1000 * 1000,'0.00b')}`)


    const SimultaneouslyBatches = Math.floor(ThreadsPossible / ThreadsPerBatch);

    const HackHappens = timeW - this.distanceMS;

    const sleep1 = 2*this.distanceMS;
    const sleep2 = HackHappens + 2 * this.distanceMS - timeG - sleep1;
    const sleep3 = HackHappens - timeH - sleep1 -sleep2;
    const sleep4 = timeH + 3 * this.distanceMS + this.distanceMS;

    const TotalBatchTime = timeW +  2 * this.distanceMS + this.distanceMS;
    const TotalBatchesPossible = Math.floor(TotalBatchTime / (4*this.distanceMS));

    const BatchesToRun = Math.min(TotalBatchesPossible,SimultaneouslyBatches);

    this.debug(ns,`TotalBatchesPossible: ${TotalBatchesPossible}, SimultaneouslyBatches: ${SimultaneouslyBatches}`)
  }

  public async run(ns:NS, target:string) {
    await this.Calculations(ns,target);
  }
}

export const batchHackManager = new BatchHackManager();

/** @param {NS} ns */
export async function main(ns: NS): Promise<void> {
  if (!(typeof ns.args[0] === 'string')) {
    ns.tprint('Arg0 must be the target name!')
    ns.exit();
  } else {
    await batchHackManager.run(ns, ns.args[0]);
  }
}
