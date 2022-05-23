/** @param {NS} ns */
export async function main(ns: NS) {
  const target = "joesguns";
  await ns.asleep(Math.floor(Math.random() * 1000));
  while (true) {
    await ns.grow(target);
  }
}
