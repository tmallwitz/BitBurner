/** @param {NS} ns */
export async function main(ns: NS): Promise<void> {
  ns.run('/dist/root-alll.js')
  ns.run('/dist/run-at-all-servers.js')
}
