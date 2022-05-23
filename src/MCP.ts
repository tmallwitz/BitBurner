import {RootAll} from "root-alll";
import {RunAtAllServers} from "run-at-all-servers";
import {upgradeHackNet} from "HacknetBot";

let hackLevel = -1;
export async function main(ns: NS): Promise<void> {
  while (true) {
    const currentHackLevel = ns.getHackingLevel();
    if (currentHackLevel != hackLevel) {
      RootAll(ns);
      await RunAtAllServers(ns);
      hackLevel = currentHackLevel;
    }
    await upgradeHackNet(ns);
    await ns.sleep(100);
  }
}
