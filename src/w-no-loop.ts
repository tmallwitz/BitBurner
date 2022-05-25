/** @param {NS} ns */
export async function main(ns: NS): Promise<void> {
  if (!(typeof ns.args[0] === 'string')) {
    ns.tprint('Arg0 must be the target name!')
    ns.exit();
  }
  const target = <string>ns.args[0];
  const  ret =  await ns.weaken(target);
  ns.tprint("Weaken: " + ret);
}
