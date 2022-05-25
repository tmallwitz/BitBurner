ns.hackAnalyze(host: string): number;
Returns the part of the specified server’s money you will steal with a single thread hack.
Returns: number | The part of money you will steal from the target server with a single thread hack.
var hackAmount = hackAnalyze("foodnstuff");

ns.growthAnalyzeSecurity(threads: number, hostname?: string, cores?: number): number;
Returns the security increase that would occur if a grow with this many threads happened.
Returns: number | The security increase.

ns.growthAnalyze(host: string, growthAmount: number, cores?: number): number;  
This function returns the number of “growths” needed in order to increase the amount of money available on the specified server by the specified amount.
Returns: number | The amount of grow calls needed to grow the specified server by the specified amount
The specified amount is multiplicative and is in decimal form, not percentage.
Warning: The value returned by this function isn’t necessarily a whole number.
var growTimes = growthAnalyze("foodnstuff", 2);

ns.getServerGrowth(host: string): number;
Returns the server’s intrinsic “growth parameter”.
This growth parameter is a number typically between 0 and 100 that represents how quickly the server’s money grows.
This parameter affects the percentage by which the server’s money is increased when using the grow function.
A higher growth parameter will result in a higher percentage increase from grow.
Returns: number | Parameter that affects the percentage by which the server’s money is increased when using the grow function.

ns.hack(host: string, opts?: BasicHGWOptions): Promise<number>;ack  
Function that is used to try and hack servers to steal money and gain hacking experience.
The runtime for this command depends on your hacking level and the target server’s security level when this function is called.
In order to hack a server you must first gain root access to that server and also have the required hacking level.
A script can hack a server from anywhere.
It does not need to be running on the same server to hack that server.
For example, you can create a script that hacks the foodnstuff server and run that script on any server in the game.
A successful hack() on a server will raise that server’s security level by 0.002.
Returns: Promise<number> | The amount of money stolen if the hack is successful, and zero otherwise.
var earnedMoney = hack("foodnstuff");

ns.grow(host: string, opts?: BasicHGWOptions): Promise<number>;
Use your hacking skills to increase the amount of money available on a server.
The runtime for this command depends on your hacking level and the target server’s security level.
When grow completes, the money available on a target server will be increased by a certain, fixed percentage.
This percentage is determined by the target server’s growth rate (which varies between servers) and security level.
Generally, higher-level servers have higher growth rates. The getServerGrowth() function can be used to obtain a server’s growth rate.
Like hack, grow can be called on any server, regardless of where the script is running.
The grow() command requires root access to the target server, but there is no required hacking level to run the command. It also raises the security level of the target server by 0.004.
Returns: Promise<number>| The number by which the money on the server was multiplied for the growth.
let currentMoney = ns.getServerMoneyAvailable("foodnstuff");
currentMoney *= (1 + await ns.grow("foodnstuff"));

ns.weaken(host: string, opts?: BasicHGWOptions): Promise<number>;
Use your hacking skills to attack a server’s security, lowering the server’s security level.
The runtime for this command depends on your hacking level and the target server’s security level when this function is called.
This function lowers the security level of the target server by 0.05.
Like hack and grow, weaken can be called on any server, regardless of where the script is running. This command requires root access to the target server, but there is no required hacking level to run the command.  
Returns: Promise<number> | The amount by which the target server’s security level was decreased. This is equivalent to 0.05 multiplied by the number of script threads.  
let currentSecurity = ns.getServerSecurityLevel("foodnstuff");
currentSecurity -= await ns.weaken("foodnstuff");

ns.weakenAnalyze(threads: number, cores?: number): number;
Returns the security decrease that would occur if a weaken with this many threads happened.
Returns: number | The security decrease.
