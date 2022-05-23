/** @param {NS} ns */
export async function main(ns: NS):Promise<void>  {
  const ram = Math.pow(2, 13);
  const ramCost = ns.getPurchasedServerCost(ram);

  const servername = `CopperWeb-${Date.now()}-`;
  let i = 1;
  while (ns.getPlayer().money > ramCost) {
    ns.purchaseServer(`${servername}${i}`,ram);
    i++;
  }
}
