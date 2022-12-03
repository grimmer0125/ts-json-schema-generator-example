# ts-json-schema-generator-example

## ts-json-schema-generator usage notes 

in `src/``, there are main.dto.ts (MyNestedObject & MyObject interfaces) & main2.dto.ts (MyNestedObject2 & MyObject2 interfaces)

Target: see these four converted definitions in `json.schema`.

### ts-json-schema-generator tests (its CLI is using commander)

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


### [conclusion1: commander/npm issue] when using `ts-json-schema-generator` (w/o relative path) with the cli argument `src/*.dto.ts` in npm script. npm script will interpret as the program arguments and automatically converted to multiple file names. In this repo example, it will be `src/main.dto.ts` & `src/main2.dto.ts`. But commander will only use the first found out file as the source files. The workaround is to use the full relative path `./node_modules/.bin/ts-json-schema-generator` with cli arguments in npm script.

ref (`test_commander.js`): 
```
start to test commander in pure js mode
{
  programArgs: [
    '/Users/grimmer/.nvm/versions/node/v16.13.1/bin/node',
    '/Users/grimmer/git/ts-json-schema-generator-example/test_commander.js',
    '--path',
    'src/main.dto.ts',
    'src/main2.dto.ts',
    '-o',
    'json.schema'
  ]
}
{ args: { path: 'src/main.dto.ts', out: 'json.schema' } }
✨  Done in 0.92s.
```

The below is my environment. I guess this issue is due to the npm design and will not only happen on my environment. 
- macOS: 12.4
- shell: zsh 5.8.1
- node: v16.13.1


### [conclusion2: another npm issue] defining ts-json-schema-generator module (w/o args) as a npm script does not work in npm but work in yarn



