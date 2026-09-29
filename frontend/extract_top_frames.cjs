const fs = require('fs');

const inputFile = process.argv[2];
const content = JSON.parse(fs.readFileSync(inputFile, 'utf-8'));
const xmlFull = Array.isArray(content) ? content[0].text : content.text;

// A frame starts with <frame ...> and ends with </frame> or <frame ... />
// We need to track depth.
// This is a simplified parser, but should work for this Figma XML dump.

const regex = /<(\/?)frame([^>]*)>/g;
let match;
let depth = 0;
const topFrames = [];

while ((match = regex.exec(xmlFull)) !== null) {
    const isClosing = match[1] === '/';
    const tagContent = match[2];

    // Check if it's self-closing (ends with /)
    const isSelfClosing = tagContent.trim().endsWith('/');

    if (!isClosing && !isSelfClosing) {
        // Opening tag
        depth++;
        if (depth === 1) {
            // Extract id and name
            const idMatch = tagContent.match(/id="([^"]+)"/);
            const nameMatch = tagContent.match(/name="([^"]+)"/);
            if (idMatch && nameMatch) {
                topFrames.push({ id: idMatch[1], name: nameMatch[1] });
            }
        }
    } else if (isClosing || isSelfClosing) {
        // Closing tag (or self-closing tag - which doesn't increase depth)
        // If it's self-closing, it doesn't have an opening tag, so it doesn't affect depth IF it's not a pair.
        // Actually, Figma XML format: <frame ... /> for empty, <frame ...>...</frame> for non-empty.

        if (!isSelfClosing) {
            depth--;
        }
    }
}

console.log(JSON.stringify(topFrames, null, 2));
