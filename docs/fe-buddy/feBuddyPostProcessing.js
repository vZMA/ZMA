// NOTE: This file uses vanilla Node.js, so no ES6 fancy business, ya hear?!?
const fs = require('fs');
const path = require('path');

// set up file paths
const sectorFilePath = path.join(path.resolve(), '../sector/ZMA.sct2');
const febOutputDirectory = path.join(path.resolve(), 'FE-BUDDY-Output');
// const febAirwayAlias = path.join(febOutputDirectory, 'ALIAS/AWY_ALIAS.txt');
// const febChartAlias = path.join(febOutputDirectory, 'ALIAS/FAA_CHART_RECALL.txt');
const febFixes = path.join(febOutputDirectory, 'ALIAS/AWY_ALIAS.txt');
const febHighAirways = path.join(febOutputDirectory, 'ALIAS/AWY_ALIAS.txt');
const febLowAirways = path.join(febOutputDirectory, 'ALIAS/AWY_ALIAS.txt');
const febNdb = path.join(febOutputDirectory, 'ALIAS/AWY_ALIAS.txt');
const febVor = path.join(febOutputDirectory, 'ALIAS/AWY_ALIAS.txt');


// read in source data
// const pofSourceFileText = fs.readFileSync(pofSourceFilePath, 'utf-8');
// const pofSourceData = JSON.parse(pofSourceFileText);

// FINISH ME PLEASE! I DON'T DO ANYTHING YET!