/** @param {NS} ns */
import {RootAll} from "/root-all";
import {RunAtAllServers} from "/run-at-all-servers";

export async function main(ns: NS): Promise<void> {
  if (!(typeof ns.args[0] === 'string')) {
    ns.tprint('Arg0 must be the target name!')
    ns.exit();
  }
  const target = <string>ns.args[0];
  RootAll(ns);
  await RunAtAllServers(ns,target);
}
