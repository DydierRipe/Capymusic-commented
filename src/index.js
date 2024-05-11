"use strict"

// THIS IS THE MAIN FILE, HERE EVERY CONNECTION BETWEEN FRONT-END AND BACK-END IS MANAGED. 
// THIS FILE SHOULD NEVER BE DELETED, THIS IS THE HEART OF THE PAGE, THE BRAIN THAT CONNECTS EVERYTHING.

const path = require("node:path"); // use an especific path to save time
const express = require("express"); // express library (nothing would work without this)
const fs = require('fs');
const multer = require("multer");

const index = require("./back js/pages/index.js");
const cart = require("./back js/pages/cart.js");
const login = require("./back js/pages/login.js");
const signup = require("./back js/pages/signup.js");
const search = require("./back js/pages/search.js");
const users = require("./back js/pages/users.js");
const product = require("./back js/pages/product.js");
const reports = require('./back js/pages/reports.js');
const language = require("./back js/pages/language.js");
const database = require("./back js/libraries/connect.js");

database.connect(e => {if (e) throw e;});
const app = express();

app.use(express.json()); // can interpret json
app.use(express.static(__dirname + "/front")); // front end files searching ease
app.use("/:lang/media", express.static(__dirname + '/sources'));

const upload = multer();

app.get("/usersadmin", (req, res) => {
    res.sendFile(path.join(__dirname + "/front/html/users.html"));
});

app.post("/usersadmin", async (req, res) => {
    let resMes = await users.main(req.body);

    res.send(resMes);
});

app.post('/language/:lang/:pageName', async(req, res) => {
    let resMes = await language.main(req.params.lang, req.params.pageName);
    
    res.send(resMes);
});

const langVerify = (filename, lang, fpath, res) => {
    if (!fpath.endsWith('/')) res.redirect(fpath + '/');
    else if (['en', 'es', 'de'].indexOf(lang) != -1) res.sendFile(path.join(__dirname + `/front/html/${filename}.html`));
    else res.sendFile(path.join(__dirname + "/front/html/notFound.html"));
}

app.listen(3000, () => { 
    console.log("server is working");
});

app.get('', (req, res) => res.redirect('/en/'));

app.get("/:lang/", (req, res) => {
    langVerify('index', req.params.lang, req.path, res);
});

app.post("/:lang/", async (req, res) => {
    let resMes = await index.main();
    
    res.send(resMes);
});

app.get("/:lang/login", (req, res) => {
    langVerify('login', req.params.lang, req.path, res);
});

/*
    response Types: 
        N: the user doesn't exists, try with a registered user or sign up with your account
        NC: the user exists and the password is correct, can log in
        NI: the user exists but the password is incorrect, try with other password
*/

app.post("/:lang/login", async (req, res) => {
    let resMes = await login.main(req);
    
    res.send(resMes);
});

app.get("/:lang/signup", (req, res) => {
    langVerify('signup', req.params.lang, req.path, res);
});

/*
    response Types: 
        E: the email is already registered
        FE: file error, the email can be registered (not exist in the database) but there was an error in the database writing system, try again later
        EmS: email sended
*/ 

app.post("/:lang/signup", async (req, res) => {
    let resMes = await signup.main(req.body);

    res.send(resMes);
});

app.get("/:lang/search", (req, res) => {
    langVerify('search', req.params.lang, req.path, res);
});

app.post("/:lang/search", async (req, res) => {
    let resMes = await search.main(req.body);

    res.send(resMes);
});

app.get("/:lang/creating", (req, res) => {
    langVerify('addProduct', req.params.lang, req.path, res);
});

app.post("/:lang/creating", upload.any(), async (rem, res) => {
    let req = JSON.parse(rem.body.product);

    database.query(`insert into products(name, price, description, instrumenttype, filters, seller)
    values ("${req.name}", ${req.price}, "${req.description}", ${req.instrumentType}, "${req.filters}", "${req.seller}")`, async (e, resp) => {
        if (e) throw e;

        let origName = rem.files[0].originalname;
        const savePath = path.join(__dirname, 'sources/productImages', resp.insertId + "." + origName.split(".").pop());

        fs.writeFile(savePath, rem.files[0].buffer, (err) => {
            if (err) {
                res.send(["FE"]);
                throw err;
            }
            res.send([resp.insertId]);
        });
    }); 
});

app.get("/:lang/product", (req, res) => {
    langVerify('product', req.params.lang, req.path, res);
});

app.post("/:lang/product", async (req, res) => {
    let resMes = await product.main(req.body);

    res.send(resMes);
});

app.get("/:lang/reserved", (req, res) => {
    langVerify('cart', req.params.lang, req.path, res);
});

app.post("/:lang/reserved", async (req, res) => {
    let resMes = await cart.main(req.body);
    
    res.send(resMes);
});

app.get('/:lang/reports', (req, res) => {
    langVerify('reports', req.params.lang, req.path, res);
});

app.post("/:lang/reports", async (req, res) => {
    let resMes = await reports.main(req.body);
    
    res.send(resMes);
});
