import {RootAll} from "/root-all";
import {RunAtAllServers} from "run-at-all-servers";
import {upgradeHackNet} from "HacknetBot";

let hackLevel = -1;
export async function main(ns: NS): Promise<void> {
  while (true) {
    const currentHackLevel = ns.getHackingLevel();
    if (currentHackLevel != hackLevel) {
      RootAll(ns);
      let target = "n00dles";
      if (currentHackLevel >= 10)
        target = "joesguns";
      await RunAtAllServers(ns,target);
      hackLevel = currentHackLevel;
    }
    await upgradeHackNet(ns);
    await ns.sleep(100);
  }
}
