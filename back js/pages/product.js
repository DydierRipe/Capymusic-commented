"use strict"

const database = require("../libraries/connect.js");
const utilities = require("../libraries/utilities.js");
const path = require("node:path"); // use an especific path to save time

const main = (req) => {
    return new Promise(res => {
        if (req.reason == 'getProductData') {
            if (req.id == '') req.id = '1';
            database.query(`select name, price, description, filters, owner from products where id = ${req.id}`, async (e, resp) => {
                if (e) {
                    console.log(e)
                    throw e;
                }
                
                if (resp.length == 0) res(["FE"]);
                else {
                    resp[0].extension = await utilities.getImgExt(req.id, path.join(__dirname + "../../../sources/productImages"));

                    database.query(`select id, name from products limit 4`, async (e, respo) => {
                        if (e) throw e;
                        else if (resp.length == 0) res(["watafac re loco"]);
                        else {
                            for (let element of respo) {
                                element.extension = await utilities.getImgExt(element.id, path.join(__dirname + "../../../sources/productImages"));
                            }
                            
                            let result = [resp, respo];
            
                            res(result);
                        }
                    });
                }
            });
        } else if (req.reason == 'sellToUser') {
            if (req.id == '') req.id = '1';
            database.query(`update products set owner = '${req.user}' where id = ${req.id}`, (e) => {
                if (e) {
                    console.log(e);
                    throw e;
                }
                
                res(["Sold"]);
            });
        } else if (req.reason == 'sendReport') {
            console.log('a');
            database.query(`insert into reports (reason, issueId, productId) VALUES ("${req.text}", ${req.issueId}, ${req.id});`, (e) => {
                if (e) {
                    console.log(e);
                    throw e;
                }
                
                res(["reported"]);
            });
        }
    });
}

const product = {}

product.main = main;

module.exports = product;