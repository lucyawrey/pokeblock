import {parse} from "csv-parse/sync";

const input = `
"key_1","key_2"
"value 1","value 2"
`;

const data = parse(input, {
  columns: true,
  skip_empty_lines: true,
});

console.log(data);