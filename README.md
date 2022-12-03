# ts-json-schema-generator-example

ts-json-schema-generator: https://github.com/vega/ts-json-schema-generator

## ts-json-schema-generator usage notes 

in `src/`, there are main.dto.ts (MyNestedObject & MyObject interfaces) & main2.dto.ts (MyNestedObject2 & MyObject2 interfaces)

Target: see these four converted definitions in `json.schema`.

### ts-json-schema-generator tests (its CLI is using [commander](https://www.npmjs.com/package/commander))

x: not work. o: work

yarn: 
1. x: (npm script) `"gen-json-schema": "ts-json-schema-generator --path src/*.dto.ts -o json.schema"`. **Only `main.dto.ts` is searched. So only two definitions are generated**.
2. o: 
  - (npm script) `"gen-json-schema2": "ts-json-schema-generator"`
  - (gen_jsonschema_from_ts.sh) `yarn gen-json-schema2 --path 'src/*.dto.ts' -o json10.schema` # both are found out

npm
1. x: (npm script, adopted by my another project) `"gen-json-schema": "ts-json-schema-generator --path src/*.dto.ts -o json.schema"`. only `main.dto.ts` 
2. x: (npm script) `npm run gen-json-schema2 --path 'src/*.dto.ts' -o json.schema`. cli's commander `args.path: undefined`. **yarn works in this case.**
3. o: (npm script) `./node_modules/.bin/ts-json-schema-generator --path 'src/*.dto.ts' -o json.schema`
4. o: 
  - (npm script) `"gen-json-schema3": "./node_modules/.bin/ts-json-schema-generator --path 'src/*.dto.ts' -o json.schema"`
  - `npm run gen-json-schema3`
5. o: [Programmatic Usage](https://github.com/vega/ts-json-schema-generator#programmatic-usage) (program_usage.js)

### commander tests 

x: 
1. (npm script) "test-commander-js": "node test_commander.js --path src/*.dto.ts",
2. Execute `yarn test-commander-js`, then get the incomplete result `{ args: { path: 'src/main.dto.ts' } }`. 

o:
- (npm script) `"test-commander-js2": "node test_commander.js"`
- (test_commander.sh) `yarn test-commander-js2 --path 'src/*.dto.ts'`

### conclusion: 1. commander has some issue when directly being used in npm script (at least in my environment) 2. defining ts-json-schema-generator module (w/o args) as a npm script does not work in npm but work in yarn

my environment :
- macOS: 12.4
- shell: zsh 5.8.1
- node: v16.13.1


