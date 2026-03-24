const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if (file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.tsx')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk(srcDir);
let foundIssues = false;

for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    const lines = content.split('\n');
    
    // Look for classNames
    lines.forEach((line, i) => {
        // Find things like text-slate-900 or text-gray-900 without dark:[type]
        if (line.includes('text-slate-900') || line.includes('text-gray-900') || line.includes('text-[#1a1a1a]') || line.includes('text-slate-800') || line.includes('text-gray-800')) {
            if (!line.includes('dark:text') && !line.includes('dark:')) {
                console.log(`Missing dark text in ${path.basename(file)}:${i+1} -> ${line.trim()}`);
                foundIssues = true;
            }
        }
        
        // bg-white is trickier because it might be fine (like a small accent)
        // But let's log it if it doesn't have dark:bg
        if (line.match(/bg-white(?!\/)/)) {
            if (!line.includes('dark:bg')) {
                // exclude bg-white/10 etc but include raw bg-white
                console.log(`Missing dark bg in ${path.basename(file)}:${i+1} -> ${line.trim()}`);
                foundIssues = true;
            }
        }
    });
}

if (!foundIssues) {
    console.log("No obvious missing dark classes found!");
}
