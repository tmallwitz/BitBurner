/** @param {NS} ns */
export async function main(ns: NS):Promise<void>  {

  // for (let i=1; i<=20; i++) {
  //   const ram = Math.pow(2, i);
  //   const ramCost = ns.getPurchasedServerCost(ram);
  //   ns.tprint(`${i} ram: ${ns.nFormat(ram* 1000 * 1000 * 1000,'0.00b')} => ` + ns.nFormat(ramCost,'0.000a'));
  // }
  // ns.exit();
  const ram = Math.pow(2, 16);
  const ramCost = ns.getPurchasedServerCost(ram);
  const servername = `CopperWeb-${Date.now()}-`;
  ns.purchaseServer(`${servername}${1}`,ram);
  ns.exit();
  let i = 1;
  while (ns.getPlayer().money > ramCost) {
    ns.purchaseServer(`${servername}${i}`,ram);
    i++;
  }
}
