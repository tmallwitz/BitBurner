import {OptimizeServerMoneySecurity} from "/PrepareServerForWGH";
import {createInterface} from "readline";

/** @param {NS} ns */
export async function main(ns: NS): Promise<void> {
  if (!(typeof ns.args[0] === 'string')) {
    ns.tprint('Arg0 must be the target name!')
    ns.exit();
  }


  let earnings = 0;

  const target = <string>ns.args[0];
  const src = 'CopperWeb-1653515796888-1';


  await OptimizeServerMoneySecurity(ns, target);
  let start = new Date().getTime();

  while (true) {
    const distanceMS = 150;

    const scriptW = "w-no-loop.js";
    const scriptW2 = "w-no-loop_2.js";
    const scriptG = "g-no-loop.js";
    const scriptH = "h-no-loop.js";

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


    const SimultaneouslyBatches = Math.floor((ns.getServerMaxRam(src) - 9 ) / (1.75 * (HackThreads+GrowthThread+ThreadsForHackRise+ThreadsForGrowthRise)));



    const HackHappens = timeW - distanceMS;

    const sleep1 = 2*distanceMS;
    const sleep2 = HackHappens + 2 * distanceMS - timeG - sleep1;
    const sleep3 = HackHappens - timeH - sleep1 -sleep2;
    const sleep4 = timeH + 3 * distanceMS + distanceMS;

    const TotalBatchTime = timeW +  2 * distanceMS + distanceMS;
    const TotalBatchesPossible = Math.floor(TotalBatchTime / (4*distanceMS));

    //ns.tprint(`Possible batches in a Multibatch: ${TotalBatchesPossible}`);

    const BatchesToRun = Math.min(TotalBatchesPossible,SimultaneouslyBatches);

    let TimeTable:  {when: number, threads: number, script: string, CacheBuster: string}[] = [];

    //ns.tprint(`Planing ${BatchesToRun} Batches`)
    for (let i = 0; i< BatchesToRun; i++) {
      const offset = i * 4 * distanceMS;
      TimeTable.push({when: offset, threads: ThreadsForHackRise, script: scriptW, CacheBuster: i.toString()})
      TimeTable.push({when: offset+sleep1, threads: ThreadsForGrowthRise, script: scriptW2, CacheBuster: i.toString()})
      TimeTable.push({when: offset+sleep1+sleep2, threads: GrowthThread, script: scriptG, CacheBuster: i.toString()})
      TimeTable.push({when: offset+sleep1+sleep2+sleep3, threads: HackThreads, script: scriptH, CacheBuster: i.toString()})
      earnings += 31136040;
    }




    TimeTable = TimeTable.sort((t1,t2) => {
      if (t1.when > t2.when)
        return 1;
      if (t1.when < t2.when)
        return -1;
      return 0;
    })


    // ns.tprint(`Timetable:`)
    // for(const timedEvent of TimeTable) {
    //   ns.tprint(`  When: ${timedEvent.when} Threads: ${timedEvent.threads} Script: ${timedEvent.script} CacheBuster :${timedEvent.CacheBuster}`)
    // }

    for (let i = 0; i < TimeTable.length; i++) {
      const sleepTime = TimeTable[i].when - (i === 0 ? 0: TimeTable[i-1].when);
      if (sleepTime > 0 ) {
        await ns.asleep(sleepTime)
      }
      ns.exec(TimeTable[i].script, src, TimeTable[i].threads, target,TimeTable[i].CacheBuster);
    }

    // for(const timedEvent of TimeTable) {
    //   if (timedEvent.when > 0)
    //     await ns.asleep(timedEvent.when);
    //   ns.tprint('Running '+timedEvent.script);
    //   ns.exec(timedEvent.script, src, timedEvent.threads, target,timedEvent.CacheBuster);
    // }



    /*


        // const w2Start = 2*distanceMS;
        // const gStart = timeW+distanceMS-timeG;
        // const hStart = timeW - distanceMS - timeH;

        for (let i = 1; i <= SimultaneouslyBatches; i++ ) {
          ns.tprint("Starting a Batch !");
          ns.exec(scriptW, src, ThreadsForHackRise, target,i);
          ns.tprint("  Started W1");
          await ns.asleep(sleep1);
          ns.exec(scriptW2, src, ThreadsForGrowthRise, target,i);
          ns.tprint("  Started W2");
          await ns.asleep(sleep2);
          ns.exec(scriptG, src, GrowthThread, target,i);
          ns.tprint("  Started G");
          await ns.asleep(sleep3);
          ns.exec(scriptH, src, HackThreads, target,i);
          ns.tprint("  Started H");
          ns.tprint("  All scripts started");
          ns.tprint("Batch done, next round please! ");
          if (i != SimultaneouslyBatches) {
            await ns.asleep(distanceMS)
          } else  {
            await ns.asleep(sleep4)
          }
        }
        ns.tprint("Multi Batch done!");
    */
//    ns.tprint("  Sleep final for " + sleep4);
    await ns.asleep(sleep4)
    let needOptimization = false;
    if (ns.getServerMoneyAvailable(target) < ns.getServerMaxMoney(target)) {
      ns.tprint("ALERT! Money missing");
      needOptimization = true;
    }
    if (ns.getServerSecurityLevel(target) > ns.getServerMinSecurityLevel(target)) {
      ns.tprint("ALERT! Sec Level not Minimum");
      needOptimization = true;
    }
    if (needOptimization)
      await OptimizeServerMoneySecurity(ns, target);

    const SecondsPassed = (new Date().getTime() - start) / 1000;
    ns.tprint(`Time passed: ${ns.nFormat(SecondsPassed,"00:00:00")} and earned ${ns.nFormat(earnings,"0.000a")}`);
    ns.tprint(`Earning per Second: ${ns.nFormat(earnings / SecondsPassed,"0.000a")}`);
  }
}
