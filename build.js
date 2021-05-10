const fs = require("fs");
const path = require("path");

// ========================================

clearDistFolder();

/*
 Read all pages from pages/ and copy them into dist/
*/
console.log("\n == Generating Pages ==")
var pages = fs.readdirSync("pages").filter(p => /\.html$/.test(p));
pages.forEach(generatePage);

/*
 Copy static assets into dist/
*/
console.log("\n == Copying static files ==")
copyToDirectory("script.js", "dist/");
copyToDirectory("style.css", "dist/");
copyToDirectory("images/", "dist/");

console.log("\n == Done == ");

// ========================================

function clearDistFolder() {
    fs.rmdirSync("dist", {recursive: true});
    fs.mkdirSync("dist");
}

// ----------------------------

function generatePage(pageName) {
    let pageFileContent = fs.readFileSync(path.join("pages", pageName), "utf8");
    let sidmallHtml = fs.readFileSync("sidmall.html", "utf8");

    let [jsonData, pageHtml] = parsePageContent( pageFileContent, pageName );

    let outputHtml = sidmallHtml
        .replace(/#title#/, htmlEscape(jsonData.title))
        .replace(/#meta#/, attributeEscape(jsonData.meta))
        .replace(/#content#/, pageHtml)

    let targetPath = path.join("dist",pageName);
    fs.writeFileSync(targetPath, outputHtml);
    console.log(`Generated \x1b[32m'${targetPath}'\x1b[0m`);
}

function parsePageContent(pageFileContent, pageName) {
    let defaultJson = {
        title: pageName,
        meta: ''
    };

    let delimiterPos = pageFileContent.indexOf("#---#");
    if(delimiterPos === -1) {
        console.warn("\x1b[31mCould not parse json data for '"+pageName+"'. Missing delimiter: #---#\x1b[0m");
        return [defaultJson, pageFileContent];
    }

    try {
        let jsonData = JSON.parse(pageFileContent.substring(0,delimiterPos));

        jsonData.title = jsonData.title || defaultJson.title;
        jsonData.meta = jsonData.meta || defaultJson.meta;

        return [jsonData, pageFileContent.substring(delimiterPos + '#---#'.length)];
    } catch(e) {
        console.warn("\x1b[31mCould not parse json data for '"+pageName+"'. Delimiter #---# found, but JSON had invalid format.\x1b[0m");
        return [defaultJson, pageFileContent];
    }
}

function htmlEscape(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/>/g,"&gt;")
        .replace(/</g,"&lt;")
}

function attributeEscape(str) {
    return str.replace(/"/g,"&quot;")
}

// ---------------------------

function copyToDirectory(filePath, targetDir) {
    let stat = fs.lstatSync(filePath);
    let name = path.basename(filePath);
    let targetPath = path.join(targetDir, name);

    if(stat.isFile()) {
        fs.copyFileSync(filePath, targetPath);
        console.log(`Copied '${filePath}' to \x1b[36m'${targetPath}'\x1b[0m`)
    } else if(stat.isDirectory()) {
        fs.mkdirSync(targetPath);
        fs.readdirSync(filePath).forEach(name => copyToDirectory(path.join(filePath, name), targetPath));
    }
}