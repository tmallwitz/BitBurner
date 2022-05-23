/** @param {NS} ns */
export async function main(ns: NS) {
  const target = "joesguns";
// Defines how much money a server should have before we hack it
// In this case, it is set to 75% of the server's max money
  const moneyThresh = ns.getServerMaxMoney(target) * 0.75;

// Defines the maximum security level the target server can
// have. If the target's security level is higher than this,
// we'll weaken it before doing anything else
  const securityThresh = ns.getServerMinSecurityLevel(target) + 5;

  while(true) {
    if (ns.getServerSecurityLevel(target) > securityThresh) {
      await ns.weaken(target);
    } else if (ns.getServerMoneyAvailable(target) < moneyThresh) {
      await ns.grow(target);
    } else {
      await ns.hack(target);
    }
  }
}
