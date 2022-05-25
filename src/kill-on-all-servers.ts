import {getServers} from "utils";

export async function KillOnAllServers(ns: NS) {
  for(const server of getServers(ns)) {
    if (ns.hasRootAccess(server.name)) {
      ns.killall(server.name)
    }
  }
}

/** @param {NS} ns */
export async function main(ns: NS): Promise<void>{
  await KillOnAllServers(ns);
}
