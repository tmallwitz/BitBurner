const facServers: { [key: string]: string } = {
  "CSEC" : "yellow",
  "avmnite-02h" : "yellow",
  "I.I.I.I" : "yellow",
  "run4theh111z" : "yellow",
  "The-Cave" : "orange",
  "w0r1d_d43m0n" : "red"
};

import {getServers} from "utils";

export async function main(ns: NS) {
  let output = "Network:";

  getServers(ns).forEach(server => {
    const name = server.name;
    const hackColor = ns.hasRootAccess(name) ? "lime" : "red";
    const nameColor = facServers[name] ? facServers[name] : "white";

    const hoverText = ["Req Level: ", ns.getServerRequiredHackingLevel(name),
      "&#10;Req Ports: ", ns.getServerNumPortsRequired(name),
      "&#10;Memory: ", ns.getServerRam(name)[0], "GB",
      "&#10;Security: ", ns.getServerSecurityLevel(name),
      "/", ns.getServerMinSecurityLevel(name),
      "&#10;Money: ", Math.round(ns.getServerMoneyAvailable(name)).toLocaleString(), " (",
      Math.round(100 * ns.getServerMoneyAvailable(name)/ns.getServerMaxMoney(name)), "%)"
    ].join("");

    let ctText = "";
    ns.ls(name, ".cct").forEach(ctName => {
      ctText += ["<a title='", ctName,
        //Comment out the next line to reduce footprint by 5 GB
        "&#10;", ns.codingcontract.getContractType(ctName, name),
        "'>©</a>"].join("");
    });

    output += ["<br>", "---".repeat(server.depth),
      `<font color=${hackColor}>■ </font>`,
      `<a class='scan-analyze-link' title='${hoverText}''

            onClick="(function()
            {
                const terminalInput = document.getElementById('terminal-input');
                terminalInput.value='home; run connect.js ${name}';
                const handler = Object.keys(terminalInput)[1];
                terminalInput[handler].onChange({target:terminalInput});
                terminalInput[handler].onKeyDown({keyCode:13,preventDefault:()=>null});
            })();"
        
            style='color:${nameColor}'>${name} ${ns.getServerMaxRam(name)}</a> `,
      `<font color='fuchisa'>${ctText}</font>`,
    ].join("");
  });

  const list = document.getElementById("terminal");
  if (list) list.insertAdjacentHTML('beforeend',output);
}
