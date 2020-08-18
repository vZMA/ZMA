// NOTE: This file uses vanilla Node.js, so no ES6 fancy business, ya hear?!?
const fs = require('fs');
const path = require('path');

// set up file paths
const inputPofPath = path.join(path.resolve(), 'docs/pof/rawPof.pof');
const pofOutputDirectory = path.join(path.resolve(), 'docs/pof/generated');
const sourcePofOutputPath = path.join(pofOutputDirectory, 'generatedPofSource.json');

function indent(level) {
    return '                                    '.substr(0, level * 4); // max level 9!
}

function parsePofToSourceFormat(inputPofPath) {
    const inputFileText = fs.readFileSync(inputPofPath, 'utf-8');
    const json = {};
    const inputFileLines = inputFileText.split('\n');
    
    for (const line of inputFileLines) {
        if (line.trim().length === 0 || line.trim()[0][0] === ';') { // empty or commented-out line
            continue;
        }
    
        const elements = line.split(':');
        const [networkCallsign, verbalCallsign, frequency, sectorId, artsPositionSymbol, callsignPrefix, callsignSuffix] = elements;
        const squawkRange = [elements[9], elements[10]];
        const facilityCallsign = `${callsignPrefix}_${callsignSuffix}`;
    
        // add new facility to json
        if (!(facilityCallsign in json)) {
            json[facilityCallsign] = {
                defaultHandoffPrefixForExternalFacilities: "",
                customHandoffPrefixes: {},
                squawkRange,
                sectors: {}
            }
        }
    
        if (sectorId in json[facilityCallsign].sectors) {
            console.warn(`Facility ${facilityCallsign}, Sector ${sectorId} appears in source multiple times! Using first appearance.`);
    
            continue;
        }
    
        // add sector to facility
        json[facilityCallsign].sectors[sectorId] = {
            artsPositionSymbol,
            callsignPrefixes: [callsignPrefix],
            callsignSuffixes: [callsignSuffix],
            frequency: parseFloat(frequency),
            networkCallsigns: [networkCallsign],
            verbalCallsign
        };
    }

    return json;
}

function writeToFile(sourceObject, outputFilePath) {
    const textToWrite = JSON.stringify(sourceObject);

    fs.writeFileSync(outputFilePath, textToWrite, 'utf-8');
}

// generate output file
const source = parsePofToSourceFormat(inputPofPath);

writeToFile(source, sourcePofOutputPath);
