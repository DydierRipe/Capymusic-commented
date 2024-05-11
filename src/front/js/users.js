"use strict"

const userString = localStorage.getItem("user"); // user info
const userTable = document.querySelector(".users-table");
const saveButton = document.querySelector(".save-button");

// this page is for staff only, this is called CRUD and here users are controlled

// page only in english
const notPermission = () => {
    console.log("you cant")
    const fragment = document.createDocumentFragment();
    const title = document.createElement("h1");
    title.innerText = "You can't allow to this page";
    title.style = "text-align: center;";
    fragment.appendChild(title);
    document.body.appendChild(fragment);
    window.location.replace('/en/')
}

// each action is saved in the array changes, it's then sent to the server to apply the real changes
const crud = {
    "changes": [],

    "saveChanges": (objectList, primary, ...exceptions) => {
        exceptions.push(objectList.length - 1)
        let labels = Array.from(userTable.children).slice(0, 4);

        let proto = {"change": "modify", "changed": []};
        for (let i = 0; i < objectList.length; i++) {
            if (primary == i) {
                proto.key = objectList[i].innerText;
                
            } else if (exceptions.indexOf(i) == -1) {
                console.log(labels[i].innerText, objectList[i].value)
                proto.changed.push([labels[i].innerText, objectList[i].value]);
                const newElement = document.createElement("div");
                newElement.textContent = objectList[i].value;
                newElement.classList = objectList[i].classList;
                objectList[i].replaceWith(newElement);
            } else {
                objectList[i].firstElementChild.textContent = "Modify";
            }
        }
        crud.changes.push(proto);
    },

    // deletes user
    "delete": (index) => {
        let deleting = Array.from(userTable.children).slice(index * 4 + 4, index * 4 + 8);
        
        crud.changes.push({"change": "delete", "subject": deleting[0].innerText});
        for (let element of deleting) {
            element.remove();
        }

        let i = 1;
        for (let element of Array.from(userTable.children).slice(4)) {
            if (i%4 == 0) {
                element.lastElementChild.dataset.index = `${Number(element.lastElementChild.dataset.index) - 1}`;
                element.firstElementChild.dataset.index = `${Number(element.firstElementChild.dataset.index) - 1}`;
            }
            i++;
        }
        
    },

    // modifies user properties (ethic sense only allows to change some things ab this)
    "modify": (index) => {
        let modifying = Array.from(userTable.children).slice(index * 4 + 4, index * 4 + 8);

        if (modifying[modifying.length - 1].firstElementChild.textContent == "Save") {
            let accepted = true;
            if (filter.username(modifying[1])[0] == "rejected") {
                accepted = false;
            }
            if (modifying[2].value.length != 1) {
                accepted = false;
            }
            if (accepted) {
                crud.saveChanges(modifying, 0);
            }
        } else {
            for (let element of modifying) {
                if (element.classList[1] == undefined) {
                    const newElement = document.createElement("input");
                    newElement.value = element.textContent;
                    newElement.type = "text";
                    newElement.style = "width: 95%"
                    newElement.classList = element.classList;
                    element.replaceWith(newElement);
                } else if (element.classList[1] !== "email") {
                    element.firstElementChild.textContent = "Save";
                }
            }
        }
    },

    // sends crud changes to the server
    "save": () => {
        console.log(crud.changes);
        fetch("/usersAdmin", { 
            method: "POST",
            body: JSON.stringify({"reason": "save", "user": crud.changes}),
            headers : { "Content-type" : "application/json" }
        }).then(res => res.text())
        .then(res => {
            res = JSON.parse(res);
        });
    }

    // create wasn't created because there is already a page that set an user up. 
    // it'd be also unfair to register someone who is unaware of having an account here
}


// gets every user in database. only enabled for special staff btw
if (userString === null) {
    notPermission();
} else {

    fetch("/usersAdmin", { 
        method: "POST",
        body: JSON.stringify({"reason": "permission", "user": JSON.parse(userString)}),
        headers : { "Content-type" : "application/json" }
    }).then(res => res.text())
    .then(res => {
        res = JSON.parse(res);
        let i = 0;

        console.log(res);
        if (res[0] == "No Permission") {
            notPermission();
        }

        res.forEach(e => {
            const fragment = document.createDocumentFragment();
            const email = document.createElement("div");
            const username = document.createElement("div");
            const level = document.createElement("div");
            const actions = document.createElement("div");
            const deleteUser = document.createElement("div");
            const modify = document.createElement("div");

            email.textContent = e.email;
            username.textContent = e.username;
            level.textContent = e.permissionlevel;
            modify.textContent = "Modify";
            deleteUser.textContent = "Delete";

            email.classList.add("user", "email");
            username.classList.add("user");
            level.classList.add("user");
            actions.classList.add("user", "actions");
            modify.style = "padding-top: 20px; height: 70px; background-color: #fb0077;";
            deleteUser.style = "padding-top: 20px; height: 70px; background-color: #fb0077; border-left: 2px #ab003d solid;";
            modify.setAttribute("data-index", i);
            deleteUser.setAttribute("data-index", i);

            deleteUser.addEventListener("click", () => {
                crud.delete(deleteUser.dataset.index);
            });
            modify.addEventListener("click", () => {
                crud.modify(modify.dataset.index);
            });

            actions.appendChild(modify);
            actions.appendChild(deleteUser);
            fragment.appendChild(email);
            fragment.appendChild(username);
            fragment.appendChild(level);
            fragment.appendChild(actions);
            userTable.appendChild(fragment);
            i++;
        });

        saveButton.addEventListener("click", () => {
            crud.save();
        });
    });
}