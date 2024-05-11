"use strict"

// i won't explain it, this things are the elements of the sign up page
const chart = document.querySelector(".sign-chart");
const button = document.querySelector(".sign-chart__button-sign");
const username = document.querySelector(".username");
const email = document.querySelector(".email");
const password = document.querySelector(".password");
const verification = document.querySelector(".verification");
const backButton = document.querySelector(".verification-chart__button-verify__back")
const verifyButton = document.querySelector(".verification-chart__button-verify__verify");
const creating = document.querySelector(".creating");
const verifying = document.querySelector(".verifying");

const language = window.location.pathname.split('/')[1];
setLang(language, "signup");
const reqGroup = [username, email, password]; // user text spaces
const user = {}; // user info
let bCanDeleteFormWaiting = false, bNotThisTimeC = false, bNotThisTimeV = false; // some boobleans that evade some bugs

// OK THIS IS SURPRISING, THIS PAGE WAS ACTUALLY ALREADY COMMENTED LOL

// if a user is already logged redirect
if (localStorage.getItem("user") !== null) {
    window.location.replace('/' + language);
}

// actives when the back button is pressed (in verification)
const deleteWaiting = () => {
    if (bCanDeleteFormWaiting) {
        fetch(window.location.href.split('#')[0], {
            method: "POST",
            body: JSON.stringify({"reason":"Exit","email":user.email,"username":user.username,"password":user.password}),
            headers : { "Content-type" : "application/json" }
        })
        .then(res => res.text())
        .then(res => {
            if (res === "FE") {
                console.log("there was a File error");
            } else if (res === "FNE") {
                console.log("the file not exist"); // imposible error? :00000
            } else if (res === "CE") {
                chart.style.animation = ".4s ease forwards enlarge"; // restore verification box

                creating.style.animation = ".4s ease forwards goRightCreate"; // returns to his place the creating box
                creating.style.display = "block";
                bNotThisTimeC = true; // evades that the animation end launches

                verifying.style.animation = ".4s ease forwards goRightVer"; // pulls out the verifying box of the chart

                bCanDeleteFormWaiting = false; // evades server errors
            }
        });
    }
}

const functionVerify = () => {
    if (!bCanDeleteFormWaiting) {
        let spaceValid = true, canBeSendToServer = true;
        // verify if the elements are void
        reqGroup.forEach(element => {
            if (element.value == "") {
                element.previousElementSibling.textContent = getLangText()[1][0];
                element.previousElementSibling.style.display = "block";
                spaceValid = false;
            } else {
                element.previousElementSibling.style.display = "none";
            }
        });

        // verify if the passed data are valid
        if (spaceValid) {
            email.value = email.value.replace(" ", ""); // if the user input an accidental space

            const UNResult = filter.username(username);
            const EMResult = filter.email(email);

            if (UNResult[0] === "rejected") {

                if (UNResult[1] == "length") {
                    username.previousElementSibling.textContent = getLangText()[1][1];
                    username.previousElementSibling.style.display = "block";
                } else {
                    username.previousElementSibling.textContent = getLangText()[1][2];
                    username.previousElementSibling.style.display = "block";
                }

                canBeSendToServer = false;
            }

            if (EMResult === "rejected") {
                canBeSendToServer = false;
                email.previousElementSibling.textContent = getLangText()[1][3];
                email.previousElementSibling.style.display = "block";
            }

            if (password.value.length <= 8) { // the password is responsability of each person, we only will verify if the password is longer than 8 characters
                canBeSendToServer = false;
                password.previousElementSibling.textContent = getLangText()[1][4]; 
                password.previousElementSibling.style.display = "block";
            }

            if(canBeSendToServer) {
                // defines user values
                user.email = email.value;
                user.username = username.value;
                user.password = password.value;

                fetch(window.location.href.split('#')[0], {
                    method: "POST",
                    body: JSON.stringify({"reason":"Existence","email":user.email,"username":user.username,"password":user.password}),
                    headers : { "Content-type" : "application/json" }
                }).then(res => res.text())
                .then(res => {
                    console.log(res)
                    if (res === "EE") {
                        email.previousElementSibling.textContent = getLangText()[1][5];
                        email.previousElementSibling.style.display = "block";
                    } else if (res === "EU") {
                        username.previousElementSibling.textContent = getLangText()[1][6];
                        username.previousElementSibling.style.display = "block";
                    } else if (res === "FE") {
                        username.previousElementSibling.textContent = getLangText()[1][7];
                        username.previousElementSibling.style.display = "block";
                    } else if (res === "EmS") {
                        chart.style.animation = ".4s ease forwards reduce"; // reduce chart

                        verifying.style.animation = ".4s ease forwards goLeftVer"; // pulls in the verifying chart into the main chart
                        verifying.style.display = "block";
                        bNotThisTimeV = true;

                        creating.style.animation = ".4s ease forwards goLeftCreate"; // pulls out that thing, ya know
                        // I am lots of monts later and I am still knowing
                        
                        bCanDeleteFormWaiting = true; // now can be deleted
                    } else {
                        console.log("what");
                    }
                });
            }
        }
    }
}

const functionVerifyNumber = () => {
    if (bCanDeleteFormWaiting) {
        let value = verification.value;

        if (verification.type !== "number") { // if the user wants to play with the html of the page
            verification.parentElement.parentElement.firstElementChild.textContent = getLangText()[1][8];
            verification.parentElement.parentElement.firstElementChild.style.display = "block";
        } else {
            verification.parentElement.parentElement.firstElementChild.style.display = "none";
            verification.value.replace("e", "");

            if (value.length < 6 || value.length > 6) { // only can have 6 digits
                verification.parentElement.parentElement.firstElementChild.textContent = getLangText()[1][9];
                verification.parentElement.parentElement.firstElementChild.style.display = "block";
            } else {
                verification.parentElement.parentElement.firstElementChild.style.display = "none";
                value = JSON.parse(value);
                fetch(window.location.href.split('#')[0], {
                    method: "POST",
                    body: JSON.stringify({"reason":"Confirm","email":user.email.toLowerCase(),"username":user.username,"password":user.password,"value":value}),
                    headers : { "Content-type" : "application/json" }
                }).then(res => res.text())
                .then(res => {
                    if (res === "CM") {
                        console.log("account registered");

                        delete user.password;

                        localStorage.setItem("user", JSON.stringify(user));

                        window.location.replace('/' + language);
                    } else if (res === "CNM")
                    {
                        verification.parentElement.parentElement.firstElementChild.textContent = getLangText()[1][10];
                        verification.parentElement.parentElement.firstElementChild.style.display = "block";
                    } else if(res === "FE") {
                        verification.parentElement.parentElement.firstElementChild.textContent = getLangText()[1][11];
                        verification.parentElement.parentElement.firstElementChild.style.display = "block";
                    } else {
                        verification.parentElement.parentElement.firstElementChild.textContent = getLangText()[1][12];
                        verification.parentElement.parentElement.firstElementChild.style.display = "block";
                    }
                });
            }
        }
    }
}

creating.addEventListener("animationend", () => {
    if (!bNotThisTimeC) {
        if (creating.style.display !== "none") creating.style.display = "none";
    } else {
        bNotThisTimeC = false;
    }
});

verifying.addEventListener("animationend", () => {
    if (!bNotThisTimeV) {
        if (verifying.style.display !== "none") verifying.style.display = "none";
    } else {
        bNotThisTimeV = false; 
    }
});

// prevents that the user input values higger than 6 characters
verification.addEventListener("input", () => {
    if (verification.value.length > 6) {
        verification.value = verification.value.slice(0,6); 
    }
});

button.addEventListener("click", () => {
    functionVerify();
});

backButton.addEventListener("click", () => {
    deleteWaiting();
});

verifyButton.addEventListener("click", ()=> {
    functionVerifyNumber();
});

document.addEventListener("keypress", e => {
    if (e.code == "Enter") {
        functionVerify();
        functionVerifyNumber();
    }
});
