import fs from 'fs';
import path from 'path';
import seven from 'node-7z';
import sevenBin from '7zip-bin'
import xmlJs from 'xml-js';

const vstarsArchiveName = 'vSTARS Facility - PLAM BEECHES (PAL)';
const rel7zPath = path.join(path.resolve(), `tools/${vstarsArchiveName}.gz`);
const outDir = path.join(path.resolve(), `tools/7z-extracted`);
const outFilePath = path.join(outDir, vstarsArchiveName);

function cleanup() {
    fs.rmdir(outDir, { recursive: true }, () => console.log('Removed temp directory "tools/gz-extracted".'));
}

async function main() {
    // extract vSTARS facility *.gz file
    const prom = await new Promise((resolve) => {
        const myStream = seven.extractFull(rel7zPath, outDir, { $bin: sevenBin.path7za })
            .on('error', (err) => { throw new TypeError(err); })
            .on('end', () => {
                console.log('Created temp directory "tools/gz-extracted", and extracted *.gz contents to it.');
                resolve();
            });
    });

    // parse extensionless facility file to string
    const fileContents = fs.readFileSync(outFilePath, 'utf-8');

    // remove temp directory as it is no longer needed
    // cleanup();

    // convert XML data to JS object, and isolate the Video Maps
    const xmlObj = xmlJs.xml2js(fileContents, { compact: true });
    const facilityId = xmlObj.FacilityBundle.Facility.ID._text;
    const videoMapXmlObjects = xmlObj.FacilityBundle.VideoMaps.VideoMap;
    const cadCommands = [];

    for (const videoMapXmlObject of videoMapXmlObjects) {
        const mapName = videoMapXmlObject._attributes.LongName;
        const lines = videoMapXmlObject.Elements.Element.filter((e) => e._attributes['xsi:type'] === 'Line');

        cadCommands.push(`-LAYER MAKE ${facilityId} RVM - ${mapName}\n`);

        for (const line of lines) {
            const lat1 = line._attributes.StartLat;
            const lon1 = line._attributes.StartLon;
            const lat2 = line._attributes.EndLat;
            const lon2 = line._attributes.EndLon;

            cadCommands.push(`LINE ${lon1},${lat1} ${lon2},${lat2}\n`);
        }
    }

    console.log(Object.keys(xmlObj.FacilityBundle.VideoMaps.VideoMap[0].Elements.Element[0]));
    console.log(            xmlObj.FacilityBundle.VideoMaps.VideoMap[0].Elements.Element[0]);
    console.log(`Wrote ${cadCommands.length} cad commands.`);

    const outCadScriptPath = path.join(outDir, `${facilityId} RVMs.scr`);

    fs.writeFileSync(outCadScriptPath, `${cadCommands.join('\n')}\n`, 'utf-8');

    // console.log(Object.keys(xmlObj.FacilityBundle.VideoMaps.VideoMap[0]));
    // console.log(xmlObj.FacilityBundle.VideoMaps.VideoMap[0]);
}

main();
