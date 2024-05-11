"use strict"

const utilities = require("../libraries/utilities.js");
const bcrypt = require('bcrypt');
const database = require("../libraries/connect.js");

const main = async (req) => {
    return await new Promise(async (res) => {
        if (req.reason == "Existence") {
            database.query(`select email, username 
            from users 
            where email = '${req.email}' or username = '${req.username}' 
            UNION 
            SELECT email, username 
            from waitlist 
            where email = '${req.email}' or username = '${req.username}'`, (e, resp) => {
                if (e) {
                    res("FE");
                    throw e;
                } 

                if (resp.length == 0) {
                    let code = Math.floor(Math.random()*(999999 - 100001) + 100001); // generate the verification code
                    
                    database.query(`insert into waitlist values('${req.email}','${req.username}','${req.password}','${code}')`, er => {
                        if (er) {
                            res("FE");
                            throw er;
                        } else {
                            utilities.sendEmail(
                                'Verificate your acount <lacanastasegura@gmail.com>',
                                req.email,
                                'Hi, Confirm your Capymusic acount',
                                `<h1 style="text-align: center;">Confirm your acount</h1><br>
                                <p style="text-align: center; font-size: 20px;">Hi ${req.username}, we wrote this messaje for welcome you to our page, then we attach your verification code</p><br>
                                <h2 style="text-align: center;">Your Verification Code: ${code}</h2>`
                            );
                            
                            res("EmS");
                        }
                    });
                } else if (resp[0].username == req.username) res("EU");
                else res("EE");
            });
        } else if (req.reason === "Confirm") {
            /*
            FE: File Error
            CM: Code Matches
            CNM: Code Not Matches
            */

            database.query(`select * from waitlist where email = '${req.email}'`, async (e, resp) => {
                if (e) {
                    res("FE"); 
                    throw e;
                }
                
                if (req.value == resp[0].verifyCode) {

                    database.query(`delete from waitlist where email = '${resp[0].email}'`, er => {
                        if (er) {
                            res("FE");
                            throw er;
                        };
                    });

                    const salt = await bcrypt.genSalt(10);
                    const hashedPassword = await bcrypt.hash(resp[0].passwrd, salt);
                    
                    database.query(`insert into users(email, username, passwrd) values("${resp[0].email}","${resp[0].username}","${hashedPassword}")`, er => {
                        if (er) {
                            res("FE");
                            throw er;
                        };
                        res("CM");
                    });
                } else {
                    res("CNM");
                }
            });
        } else if (req.reason === "Exit") {
            console.log("tried to exit");
            database.query(`delete from waitlist where email = '${req.email}'`, e => {
                if (e) {
                    res("FE");
                    throw e;
                };
                res("CE");
            });
        }
    });
}

const signup = {}

signup.main = main;

module.exports = signup;
