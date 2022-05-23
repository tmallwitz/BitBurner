const svObj = (name = 'home', depth = 0) => ({name: name, depth: depth});
interface Visited {
  [key: string]: number;
}
export function getServers(ns: NS): {name: string,depth:number}[] {

  const result = [];
  const visited: Visited = { 'home': 0 };
  const queue = Object.keys(visited);
  let name: string | undefined;
  while ((name = queue.pop())) {
    const depth: number = visited[name];
    result.push( svObj(name, depth));
    const scanRes = ns.scan(name);
    for (let i = scanRes.length; i >= 0; i--) {
      if (visited[scanRes[i]] === undefined) {
        queue.push(scanRes[i]);
        visited[scanRes[i]] = depth + 1;
      }
    }
  }
  return result;
}
