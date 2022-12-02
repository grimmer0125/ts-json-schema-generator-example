## ts-json-schema-generator-example

use `npm start` to generate json.schema. It use `ts-json-schema-generator --path src/**/*.dto.ts --no-type-check --type \"*\" -o json.schema`

Source: subtract.dto.ts and sum.dto.ts
Target: see these two in `json.schema`.
Result: there is only SubtractDto in `json.schema`.