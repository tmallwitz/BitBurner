/** @param {NS} ns */
export async function main(ns: NS): Promise<void> {
  const target = "joesguns"

  ns.tprint("getGrowTime: " + ns.getGrowTime(target))
  ns.tprint("getWeakenTime: " + ns.getWeakenTime(target))
  ns.tprint("getHackTime: " + ns.getHackTime(target))
  ns.tprint("----")
  const PartPerHack = ns.hackAnalyze(target);
  const HackThreads = Math.floor(0.5 / ns.hackAnalyze(target));
  const HackPart = PartPerHack * HackThreads;
  const HackSecRise = ns.hackAnalyzeSecurity(HackThreads)
  ns.tprint("hackAnalyze: "+ PartPerHack);
  ns.tprint("Threads for 50% : "+ HackThreads);
  ns.tprint("Will Hack: "+ HackPart);
  ns.tprint("hackAnalyzeSecurity: "+ HackSecRise);
  ns.tprint("----")
  const GrowthNeeded = 1 / HackPart;
  const GrowthThread = Math.ceil(ns.growthAnalyze(target,GrowthNeeded))
  const GrowthSecRise = ns.growthAnalyzeSecurity(GrowthThread);
  ns.tprint("GrowthNeeded: "+ GrowthNeeded);
  ns.tprint("growthAnalyze: "+ ns.growthAnalyze(target,GrowthNeeded));
  ns.tprint("GrowsThread: "+ GrowthThread);
  ns.tprint("growthAnalyzeSecurity: " + GrowthSecRise)
  ns.tprint("Security rise own calc: " + GrowthThread * 0.004)
  ns.tprint("----")
  ns.tprint("growthAnalyze: "+ ns.growthAnalyze(target,GrowthNeeded));
  const ThreadsForHackRise = Math.ceil(HackSecRise / 0.05);
  const ThreadsForGrowthRise = Math.ceil(GrowthSecRise / 0.05);
  ns.tprint("ThreadsForHackRise: "+ ThreadsForHackRise);
  ns.tprint("ThreadsForGrowthRise: "+ ThreadsForGrowthRise);
  ns.tprint("Weaken Threads total: "+ ThreadsForHackRise+ThreadsForGrowthRise);
  ns.tprint("----")
  const wRam = ns.getScriptRam("w.js") * ThreadsForHackRise+ThreadsForGrowthRise;
  const gRam = ns.getScriptRam("g.js") * GrowthThread;
  const hRam = ns.getScriptRam("h.js") * HackThreads;
  ns.tprint(`wRam (${ThreadsForHackRise+ThreadsForGrowthRise} * ${ns.getScriptRam("w.js")}): `+ wRam);
  ns.tprint(`gRam: (${GrowthThread} * ${ns.getScriptRam("g.js")}): `+ gRam);
  ns.tprint(`hRam: (${HackThreads} * ${ns.getScriptRam("h.js")}): `+ hRam);
  ns.tprint("----")
  ns.tprint(`Ram Per Batch: ${wRam+gRam+hRam} GB`);
  ns.tprint("----")
  ns.tprint("----")

  const timeG = Math.round(ns.getGrowTime(target));
  const timeW = Math.round(ns.getWeakenTime(target));
  const timeH = Math.round(ns.getHackTime(target));

  const w1Start = 0;
  const w2Start = 200;
  const gStart = timeW+50-timeG;
  const hStart = timeW - 50 - timeH;
  const end = timeW +200;

  ns.tprint("Startreihenfolge:")
  ns.tprint(`W1 Start ${w1Start} END ${w1Start+timeW}`);
  ns.tprint(`${w2Start}`);
  ns.tprint(`W2 Start ${w2Start} END ${w2Start+timeW}`);
  ns.tprint(`${gStart-w2Start}`);
  ns.tprint(`G  Start ${gStart} END ${gStart+timeG}`);
  ns.tprint(`${hStart-gStart-w2Start}`);
  ns.tprint(`H  Start ${hStart} END ${hStart+timeH}`);
  ns.tprint(`Total Batch Runtime: ${end}`)
}
