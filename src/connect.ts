export async function main(ns: NS) {
  const target = ns.args[0];
  const paths:  { [key: string]: string }  = { "home": "" };
  const queue = Object.keys(paths);
  let name;
  let output: string;
  let pathToTarget: string[] = [];
  while ((name = queue.shift())) {
    const path = paths[name];
    const scanRes = ns.scan(name);
    for (const newSv of scanRes) {
      if (paths[newSv] === undefined) {
        queue.push(newSv);
        paths[newSv] = `${path},${newSv}`;
        if (newSv == target)
          pathToTarget = paths[newSv].substr(1).split(",");

      }
    }
  }
  output = "home; ";

  pathToTarget.forEach(server=> output += " connect " + server + ";");

  const terminalInput = <HTMLInputElement>document.getElementById("terminal-input");
  if (terminalInput) {
    terminalInput.value = output;
    const handler = Object.keys(terminalInput)[1];
    // @ts-ignore
    terminalInput[handler].onChange({target: terminalInput});
    // @ts-ignore
    terminalInput[handler].onKeyDown({keyCode: 13, preventDefault: () => null});
  }
}

export function autocomplete(data: any, args: string[]) {
  return [...data.servers];
}
