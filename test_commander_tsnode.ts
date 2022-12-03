console.log("start to test commander in ts-node mode")
import { Command } from "commander";

const args = new Command()
    .option("-p, --path <path>", "Source file path")
    .parse(process.argv)
    .opts();

/**
 * 1. In terminal: yarn test-commander-tsnode --path 'src/dto/*.ts'
 * 2. It will print { args: { path: 'src/dto/*.ts' } }
 */
console.log({args});