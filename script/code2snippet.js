const fs = require('fs');
const path = require('path');

const main = () => {
    const excludeFiles = new Set(['script', '.git', '.gitignore', 'README.md']);
    let autoIncreat = 0;
    const output = {};
    const transCode2Snippet = dir => {
        const {ext, name} = path.parse(dir);
        if (ext !== '.js') {
            return;
        }
        const content = fs.readFileSync(dir, 'utf-8');
        const body = content.split('\n');
        output[`snippet${autoIncreat}`] = {
            prefix: name,
            body,
            description: `description for ${name}`
        }
        autoIncreat++;
    }
    const searchCode = (dir) => {
        const stat = fs.statSync(dir);
        if (stat.isDirectory()) {
            const dirs = fs.readdirSync(dir);
            for (const value of dirs) {
                if (excludeFiles.has(value)) {
                    continue;
                }
                searchCode(path.join(dir, value));
            }
        } else if (stat.isFile()) {
            transCode2Snippet(dir);
        }
    }
    searchCode(path.join(__dirname, '../'));
    fs.writeFileSync(path.join(__dirname, '../snippet.json'), JSON.stringify(output, null, '\t'));
}

main();
