"use strict"

const database = require("../libraries/connect.js");
const utilities = require("../libraries/utilities.js");
const path = require("node:path"); // use an especific path to save time

// gets the products to showcase in the main page
const main = () => {
    return new Promise(res => {
        database.query(`select id, name from products limit 4`, async (e, resp) => {
            if (e) throw e;
            else if (resp.length == 0) res(["watafac re loco"]);
            else {
                for (let element of resp) {
                    element.extension = await utilities.getImgExt(element.id, path.join(__dirname + "../../../sources/productImages"));
                }

                res(resp);
            }
        });
    });
}

const index = {}

index.main = main;

module.exports = index;