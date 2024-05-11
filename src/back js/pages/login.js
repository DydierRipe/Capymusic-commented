"use strict"

const database = require("../libraries/connect.js");
const bcrypt = require('bcrypt');

const main = (req) => {
    return new Promise(res => {

        // verifies if login is correct, if the user or the Email matches with the password, or if the user even exists
        database.query(`select * from users 
        where email = '${req.body.email}' or username = '${req.body.email}'`, async (e, resp) => {
            if (e) throw e;

            if (resp.length == 0) res(["N", "noRes"]);
            else {
                bcrypt.compare(req.body.password, resp[0].passwrd, function(err, respo) {
                    if (err){
                        if (e) throw e;
                    }

                    if (respo) {
                        res(["NC", resp[0]]);
                    } else {
                        // response is OutgoingMessage object that server response http request
                        res(["NI", "noRes"]);
                    }
                });
            }
        });
    });
}

const login = {}

login.main = main;

module.exports = login;
