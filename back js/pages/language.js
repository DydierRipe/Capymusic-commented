"use strict"

const xlsx = require('node-xlsx');
const path = require("node:path"); // use an especific path to save time

const split = (arr, value) => {
    const arr1 = [];
    const arr2 = [];
    let found = false;

    for (let element of arr) {
        if (element == value) {
            found = true;
            continue;
        }

        if (!found) arr1.push(element);
        else arr2.push(element);
    }

    return [arr1, arr2];
}

const main = (lang, pageName) => {
    return new Promise(res => {
        let files = xlsx.parse(path.join(__dirname, `../../sources/translation/index.xlsx`));
        let file;

        files.forEach(e => {
            if (e.name == pageName) {
                file = e.data;
            }
        });

        if (!file) res(['NOTFOUND']);
        
        if (lang == 'en') lang = 0;
        else if (lang == 'es') lang = 1;
        else if (lang == 'de') lang = 2;

        file = file.map(arr => {
            return arr[lang];
        });

        file = split(file,'div');
        file.push(split(file[1],'links')[1]);
        file.push(split(file[2], 'jstext')[1]);
        file.push(split(file[3], 'pageContent')[1]);

        res(file);
    });
}

const language = {}

language.main = main;

module.exports = language;