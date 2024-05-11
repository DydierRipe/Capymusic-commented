"use strict"

const xlsx = require('node-xlsx');
const path = require("node:path"); // use an especific path to save time

// splits the whole array according to some parameters
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

// gets and returns the language arrays to the client, according to language and page. translations are saved in an Excel to make them easy to compare
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
        
        // each language has a sheet and each sheet has three colums which corresponds to alanguage
        if (lang == 'en') lang = 0;
        else if (lang == 'es') lang = 1;
        else if (lang == 'de') lang = 2;

        file = file.map(arr => {
            return arr[lang];
        });

        // then they are divided according to how they will be used
        // fist division is used for deafult html text
        file = split(file,'div'); // placeholder textboxes messages
        file.push(split(file[1],'links')[1]); // images links
        file.push(split(file[2], 'jstext')[1]); // text that is used in js files
        file.push(split(file[3], 'pageContent')[1]); // I think these were for error messages

        res(file);
    });
}

const language = {}

language.main = main;

module.exports = language;