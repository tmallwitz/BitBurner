import {getServers} from "utils";

export async function RunAtAllServers(ns: NS, target: string) {
  const w = 75;
  const g = 880;
  const h = 78;

  /*
var curGrowTime = ns.getGrowTime(target); var curWeakTime = ns.getWeakenTime(target); var curHackTime = ns.getHackTime(target);
   */

  const sum = w+g+h;

  const scriptW = "w.js";
  const scriptG = "g.js";
  const scriptH = "h.js";


  const ramMCP =  ns.getScriptRam('MCP.js') + 64;

  const memPerScript: number = Math.max(ns.getScriptRam(scriptW),Math.max(ns.getScriptRam(scriptG),ns.getScriptRam(scriptH)));

  //calc possible Threads
  let possibleThreads = 0;
  for(const server of getServers(ns)) {
      if (ns.hasRootAccess(server.name)) {
        let ram = ns.getServerMaxRam(server.name);
        if (server.name === 'home') ram -= ramMCP;
        possibleThreads += Math.floor(ram / memPerScript)
      }
  }

  let hThreads = Math.floor(possibleThreads / sum) * h;
  let gThreads = Math.floor(possibleThreads / sum) * g;
  let wThreads = Math.floor(possibleThreads / sum) * w;

  ns.tprint(`Threads possible: ${possibleThreads} => W ${wThreads} G ${gThreads} H ${hThreads}`);
  for(const server of getServers(ns)) {
    //getServers(ns).forEach(server => {
//    if (server.name != 'home') {
      if (ns.hasRootAccess(server.name)) {
        ns.killall(server.name)
        await ns.scp(scriptW,server.name);
        await ns.scp(scriptG,server.name);
        await ns.scp(scriptH,server.name);
        let ram = ns.getServerMaxRam(server.name);
        if (server.name === 'home') ram -= ramMCP;
        let numThreads = Math.floor(ram / memPerScript)
        ns.tprint(`Running for Server ${server.name} with ${ns.getServerMaxRam(server.name)} GB Ram and ${numThreads} Threads`)
        if (numThreads > 0) {
          if (hThreads > 0 && numThreads > 0) {
            const threadsToStart = Math.min(numThreads,hThreads);
            hThreads -= threadsToStart;
            numThreads -= threadsToStart;
            ns.exec(scriptH,server.name,threadsToStart,target);
            ns.tprint(`  Starting HackThreads: ${threadsToStart}`);
          }
          if (gThreads > 0 && numThreads > 0) {
            const threadsToStart = Math.min(numThreads,gThreads);
            gThreads -= threadsToStart;
            numThreads -= threadsToStart;
            ns.exec(scriptG,server.name,threadsToStart,target);
            ns.tprint(`  Starting GrowThreads: ${threadsToStart}`);
          }
          if (wThreads > 0 && numThreads > 0) {
            const threadsToStart = Math.min(numThreads,wThreads);
            wThreads -= threadsToStart;
            numThreads -= threadsToStart;
            ns.exec(scriptW,server.name,threadsToStart,target);
            ns.tprint(`  Starting WeakenThreads: ${threadsToStart}`);
          }
        } else {
          ns.tprint(`Cannot run on ${server.name}, ram is only with ${ns.getServerMaxRam(server.name)}`);
        }
      }
    }
//  }
}

/** @param {NS} ns */
export async function main(ns: NS): Promise<void>{
  if (!(typeof ns.args[0] === 'string')) {
    ns.tprint('Arg0 must be the target name!')
    ns.exit();
  }
  const target = <string>ns.args[0];
  await RunAtAllServers(ns,target);
}
