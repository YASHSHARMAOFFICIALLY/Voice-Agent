const fs = require('fs');

const inputFile = process.argv[2];

if (!fs.existsSync(inputFile)) {
    console.error('File not found:', inputFile);
    process.exit(1);
}

const content = fs.readFileSync(inputFile, 'utf-8');

let data;
try {
    const rawData = JSON.parse(content);
    data = Array.isArray(rawData) ? rawData[0] : rawData;
} catch (e) {
    console.error('JSON parsing failed', e);
    process.exit(1);
}

const xmlText = data.text;

// Regex to find frames: <frame id="X:Y" name="...">
const frameRegex = /<frame\s+id="([^"]+)"\s+name="([^"]+)"/g;
let match;
const frames = [];

while ((match = frameRegex.exec(xmlText)) !== null) {
    frames.push({ id: match[1], name: match[2] });
}

console.log(JSON.stringify(frames, null, 2));
