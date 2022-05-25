/** @param {NS} ns */
export async function main(ns: NS): Promise<void> {
  if (!(typeof ns.args[0] === 'string')) {
    ns.tprint('Arg0 must be the target name!')
    ns.exit();
  }
  const target = <string>ns.args[0];
  await ns.asleep(Math.floor(Math.random() * 10000));
  while (true) {
    await ns.weaken(target);
  }
}
