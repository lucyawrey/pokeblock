import { parse } from "csv-parse/sync";


// Pull CSV from Google Sheets
const target = `https://docs.google.com/spreadsheets/d/1FWfVOOkkR-UtFYkn13PoNO_Y5szipLEBCEys_gZecF0/gviz/tq?tqx=out:csv&sheet=spawns`;
let rawData = "";
try {
    const res = await fetch(target, {
        method: 'get',
        headers: {
            'content-type': 'text/csv;charset=UTF-8',
        }
    });

    if (res.status === 200) {
        rawData = await res.text();
    } else {
        console.error(`Error code ${res.status}.`);
        process.exit(-1);
    }
} catch (error) {
    console.error(error)
    process.exit(-1);
}

console.log(rawData);

const data = parse(rawData, {
  columns: true,
  skip_empty_lines: true,
});
