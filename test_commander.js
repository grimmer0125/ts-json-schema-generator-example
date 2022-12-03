console.log("start to test commander in pure js mode")

const programArgs = process.argv;
console.log({programArgs});

const { Command } = require("commander");

const args = new Command()
    .option("-p, --path <path>", "Source file path")
    .option("-o, --out <file>", "Set the output file (default: stdout)")
    .parse(process.argv)
    .opts();

console.log({args});    