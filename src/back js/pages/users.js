"use strict"
const database = require("../libraries/connect.js");

const main = async (req) => {
    return await new Promise(async (res) => {
        if (req.reason == "permission") {
            database.query(`select permissionlevel from users where email = "${req.user.email}"`, (e, resp) => {
                if (e || resp.length == 0) {
                    res(["FE"]);
                    throw e; 
                }

                if (resp[0].permissionlevel != 2) {
                    res(["No Permission"]);
                } else {
                    database.query(`select email, username, permissionlevel from users`, (e, respo) => {
                        if (e) throw e;
                        res(respo);
                    });
                    
                }
            });
        } else if (req.reason == "save") {
            
            req.user.forEach(element => {
                if (element.change == "delete") {
                    database.query(`delete from users where email = "${element.subject}"`, e => {
                        if (e) {
                            res(["ERROR"]);
                            throw e;
                        }
                        res(["Sus"]);
                    });
                } else if (element.change == "modify") {
                    database.query(`update users
                    set username = "${element.changed[0][1]}", permissionlevel = "${element.changed[1][1]}"
                    where email = "${element.key}";
                    `, e => {
                        if (e) {
                            res(["ERROR"]);
                            throw e;
                        }
                        res(["Sus"]);
                    });
                }
            });
        }
    });
}

const users = {}

users.main = main;

module.exports = users;

