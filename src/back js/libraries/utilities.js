"use strict"

const nodemailer = require("nodemailer"); // send emails
const path = require("node:path"); // use an especific path to save time
const fs = require('fs');

// Sends an email lo whoever lol
const sendEmail = (iFrom, iTo, iSubject, iHtml) => {
    // uses gmail host with port 465 (for verificated and secure host), defines the gmail externs pasword
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: 'lacanastasegura@gmail.com',
            pass: "lsmgzbqkrcviuvet"
        }
    });

    transporter.verify().then(()=>{
        console.log("ready to send in");
    });

    let options = {
        from: iFrom,
        to: iTo,
        subject: iSubject,
        html: iHtml
    }

    transporter.sendMail(options);
}

// image searcher, imager are saved in sources and then they are sent with all the info
const getImgExt = async (imgName, folder) => {
    return await new Promise(async (res) => {
        fs.readdir(folder, (err, files) => {
            if (err) {
                throw err;
            }

            const searchedFile = files.find(file => file.startsWith(imgName));
            
            if (searchedFile) {
                const ext = path.extname(searchedFile);
                res(ext);
            } else {
                res("not-found");
            }
        });
    });
}

// deletes an image
const deleteImg = async (id, folder) => {
    return await new Promise(async (res) => {
        const ext = await getImgExt(id, folder)

        fs.unlink(folder + '\\' + id + ext, err => {
            if (err) {
                res(["could not delete"]);
                throw err;
            }
            console.log(folder + id + ext);
            res("deleted");
        });
    });
}

// creates the library object to use in other files.
const utilities = {};

utilities.sendEmail = sendEmail;
utilities.getImgExt = getImgExt;
utilities.deleteImg = deleteImg;

module.exports =  utilities;
