console.log("start to test commander in pure js mode")
const { Command } = require("commander");

const args = new Command()
    .option("-p, --path <path>", "Source file path")
    .parse(process.argv)
    .opts();

console.log({args});    