function gainFromLevelUpgrade(Level: number, Ram: number, Cores: number) {
  return (1*1.5) * Math.pow(1.035,Ram-1) * ((Cores+5)/6);
}
function gainFromRamUpgrade(Level: number, Ram: number, Cores: number) {
  return (Level*1.5) * (Math.pow(1.035,(2*Ram)-1) - Math.pow(1.035,Ram-1)) * ((Cores+5)/6);
}
function gainFromCoreUpgrade(Level: number, Ram: number, Cores: number) {
  return (Level*1.5) * Math.pow(1.035,Ram-1) * (1/6);
}

export async function upgradeHackNet(ns: NS) {
  const hn = ns.hacknet;
  const multi = ns.getHacknetMultipliers();
  const nodes = hn.numNodes();
  let lowestROI = 60*60*12; // ROI over 24 h, no upgrades please
  let server= -1;
  let what = '?';

  for (let i = 0; i   < nodes; i++) {
    const node = hn.getNodeStats(i);
    const lvlROI = Math.round(hn.getLevelUpgradeCost(i, 1) / (multi.production * gainFromLevelUpgrade(node.level, node.ram, node.cores)));
    if (lvlROI < lowestROI) {
      lowestROI = lvlROI;
      server = i;
      what = 'level';
    }
    const ramROI = Math.round(hn.getRamUpgradeCost(i, 1) / (multi.production * gainFromRamUpgrade(node.level, node.ram, node.cores)));
    if (ramROI < lowestROI) {
      lowestROI = ramROI;
      server = i;
      what = 'ram';
    }
    const coreROI = Math.round(hn.getCoreUpgradeCost(i,1) / (multi.production * gainFromCoreUpgrade(node.level, node.ram, node.cores)));
    if (coreROI < lowestROI) {
      lowestROI = coreROI;
      server = i;
      what = 'core';
    }
  }
  const serverROI = Math.round(hn.getPurchaseNodeCost() / (multi.production * gainFromLevelUpgrade(1, 1, 1)));
  if (serverROI < lowestROI) {
    lowestROI = serverROI;
    server = -1;
    what = 'server';
  }

  if (what === 'server') {
    hn.purchaseNode();
  } else if (what === 'level') {
    hn.upgradeLevel(server,1)
  } else if (what === 'ram') {
    hn.upgradeRam(server,1)
  } else if (what === 'core') {
    hn.upgradeCore(server,1)
  }
}

/** @param {NS} ns */
export async function main(ns: NS) : Promise<void> {
  await upgradeHackNet(ns);
}
