import {getServers} from "utils";

export function RootAll(ns: NS) {
  let toolCount = 0;
  toolCount += ns.fileExists("BruteSSH.exe", "home")?1:0;
  toolCount += ns.fileExists("FTPCrack.exe", "home")?1:0;
  toolCount += ns.fileExists("relaySMTP.exe", "home")?1:0;
  toolCount += ns.fileExists("HTTPWorm.exe", "home")?1:0;
  toolCount += ns.fileExists("SQLInject.exe", "home")?1:0;
  const myLvl = ns.getHackingLevel();

  let server
  getServers(ns).forEach(EachServer);

  function EachServer(server: {name: string,depth:number}) {
    const target = server.name;
    if (target == 'home') {
      //nix
    } else if (myLvl < ns.getServerRequiredHackingLevel(target)) {
      //ns.tprint(`Level to low: ${target} needs lvl ${ns.getServerRequiredHackingLevel(target)}`)
    } else if (toolCount < ns.getServerNumPortsRequired(target)) {
      ns.tprint(`Not enough tools: ${target} needs ${ns.getServerNumPortsRequired(target)}`)
    } else {
      ns.tprint(`Hacking ${target}`)
      if (ns.fileExists("BruteSSH.exe", "home")) {
        ns.brutessh(target);
      }
      if (ns.fileExists("FTPCrack.exe", "home")) {
        ns.ftpcrack(target);
      }
      if (ns.fileExists("relaySMTP.exe", "home")) {
        ns.relaysmtp(target);
      }
      if (ns.fileExists("HTTPWorm.exe", "home")) {
        ns.httpworm(target);
      }
      if (ns.fileExists("SQLInject.exe", "home")) {
        ns.sqlinject(target);
      }
      ns.nuke(target);
    }
  }
}


/** @param {NS} ns */
export async function main(ns: NS): Promise<void> {
  RootAll(ns);
}
