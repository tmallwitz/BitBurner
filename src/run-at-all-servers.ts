import {getServers} from "utils";

export async function RunAtAllServers(ns: NS) {
  const w = 5;
  const g = 12;
  const h = 1;

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
            ns.exec(scriptH,server.name,threadsToStart);
          }
          if (gThreads > 0 && numThreads > 0) {
            const threadsToStart = Math.min(numThreads,gThreads);
            hThreads -= threadsToStart;
            numThreads -= threadsToStart;
            ns.exec(scriptG,server.name,threadsToStart);
          }
          if (wThreads > 0 && numThreads > 0) {
            const threadsToStart = Math.min(numThreads,wThreads);
            hThreads -= threadsToStart;
            numThreads -= threadsToStart;
            ns.exec(scriptW,server.name,threadsToStart);
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
  await RunAtAllServers(ns);
}
