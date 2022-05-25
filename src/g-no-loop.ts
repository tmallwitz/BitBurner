/** @param {NS} ns */
export async function main(ns: NS) {
  if (!(typeof ns.args[0] === 'string')) {
    ns.tprint('Arg0 must be the target name!')
    ns.exit();
  }
  const target = <string>ns.args[0];
  const res =  await ns.grow(target);
  ns.tprint("Grow: " + res);
}
