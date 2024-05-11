"use strict"

const database = require("../libraries/connect.js");
const utilities = require("../libraries/utilities.js");
const path = require("node:path"); // use an especific path to save time

const main = (req) => {
    return new Promise(res => {
        database.query(`SELECT permissionlevel from users where email = '${req.uEmail}'`, (e, respo) => {
            if (e) throw e;
            if (respo[0].permissionlevel == 0) res(["no permission"]);

            else if (req.reason == "getSeparated") {
                database.query(`SELECT * FROM reported`, async (err, resp) => {
                    if (err) throw err;
                    
                    for (let element of resp) {
                        element.extension = await utilities.getImgExt(element.productId, path.join(__dirname + "../../../sources/productImages"));
                    }

                    res(resp);
                });
            } else if (req.reason == 'deleteReport') {
                database.query(`DELETE FROM reports where id = ${req.id}`, err => {
                    if (err) throw err;
                    res(["deleted"]);
                });
            } else if (req.reason == 'deletePublication') {
                database.query(`DELETE FROM reports where id = ${req.id}`, err => {
                    if (err) throw err;
                    database.query(`DELETE FROM products where id = ${req.productId}`, er => {
                        if (er) throw er;

                        res(["deleted"]);
                    });
                });
            }
        });
    });
}

const login = {}

login.main = main;

module.exports = login;