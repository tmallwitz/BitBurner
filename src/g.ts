/** @param {NS} ns */
export async function main(ns: NS) {
  if (!(typeof ns.args[0] === 'string')) {
    ns.tprint('Arg0 must be the target name!')
    ns.exit();
  }
  const target = <string>ns.args[0];
  await ns.asleep(Math.floor(Math.random() * 10000));
  while (true) {
    await ns.grow(target);
  }
}
