import {promises} from "dns";

export async function OptimizeServerMoneySecurity(ns:NS, target: string): Promise<void> {
  const scriptW = "w.js";
  const scriptG = "g.js";

  const ram = ns.getServerMaxRam('home') -  ns.getScriptRam('MCP.js') - 64; //64 GB so that we can do smth
  const memPerScript: number = Math.max(ns.getScriptRam(scriptW),ns.getScriptRam(scriptG));
  const numThreads = Math.floor(ram / (2*memPerScript))

  const pidw = ns.exec(scriptW,'home',numThreads,target);
  const pidg = ns.exec(scriptG,'home',numThreads,target);

  const ConsoleOut = function () {
    let s = `Money ${ns.nFormat(ns.getServerMoneyAvailable(target),'0.000a')} | ${ns.nFormat(ns.getServerMaxMoney(target),'0.000a')} ][ `
    s += `Security ${ns.getServerSecurityLevel(target)} | ${ns.getServerMinSecurityLevel(target)}`
    ns.tprint(s)
  }

  while (ns.getServerMoneyAvailable(target) < ns.getServerMaxMoney(target)) {
    ConsoleOut();
    await ns.asleep(10000);
  }
  ns.tprint("Money is maximized")
  ns.kill(pidg);
  const pidw2 = ns.exec(scriptW,'home',numThreads,target);

  while (ns.getServerSecurityLevel(target) > ns.getServerMinSecurityLevel(target)) {
    ConsoleOut();
    await ns.asleep(10000);
  }
  ns.tprint("Security is minimized")

  ns.kill(pidw);
  ns.kill(pidw2);

  ns.tprint("Server ready:")
  // ns.tprint("getGrowTime: " + ns.getGrowTime(target))
  // ns.tprint("getWeakenTime: " + ns.getWeakenTime(target))
  // ns.tprint("getHackTime: " + ns.getHackTime(target))
}

/** @param {NS} ns */
export async function main(ns: NS): Promise<void> {
  if (!(typeof ns.args[0] === 'string')) {
    ns.tprint('Arg0 must be the target name!')
    ns.exit();
  }
  const target = <string>ns.args[0];
  await OptimizeServerMoneySecurity(ns, target);
}
