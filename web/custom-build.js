const fs = require('fs');
const path = require("path")

const files = ['index.html', 'bundle.js', 'main.css'];
const directories = ['product'];

const copy = (filename, destination) => fs.copyFile(
    path.join(__dirname, 'out', filename),
    path.join(__dirname, `out/${destination}`, filename),
    (e) => {
        if (e) {
            throw e
        }
    }
);

directories.forEach(dir => {
    fs.mkdir(path.join(__dirname, `out/`, dir), (error) => {
        files.forEach(file => {
            copy(file, dir);
        })
    })
})

///for meta tag of no indexing
if (process.argv.filter(e => e === '--prod').length > 0) {
    const htmlFile = fs.readFileSync('./out/index.html', 'utf8');
    const modifiedHtmlFile = htmlFile.split('<meta name="robots" content="noindex, nofollow">').join('');
    fs.writeFileSync('./out/index.html', modifiedHtmlFile);
}