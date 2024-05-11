const itemContainer = document.querySelector('.items-container');
const pageTitle = document.querySelector('.title');
const reserved = document.querySelector(".reserved");
const bought = document.querySelector(".bought");

const userString = localStorage.getItem("user"); // user info
const language = window.location.pathname.split('/')[1]; // gets the name form the url (es, en, de)
setLang(language, "cart"); // sets the language in the correspondient module. (more data in changelang.js)

// no idea what is this for, but ig this is important
const prevDef = e => {
    if (keys[e.keyCode]) {
        e.preventDefault();
    }
}

const numberWithCommas = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// removes an item from the shopping cart
const cancelItem = (item) => {
    window.onscroll = () => window.scrollTo(0, 0);

    // creates a modal to confirmate the action 
    console.log(item);
    const fra = document.createDocumentFragment();
    const blackScreen = document.createElement('div');
    const modal = document.createElement("div");
    const modalText = document.createElement("h2");
    const subButton = document.createElement("div");

    blackScreen.classList.add("black-screen");
    modal.classList.add("frames", 'modal');
    modalText.classList.add("modal-text");
    subButton.classList.add("button", "sub-button");

    modal.style.height = "fit-content";
    modalText.textContent = getLangText()[1][17];
    subButton.textContent = getLangText()[1][18];

    blackScreen.appendChild(modal);
    modal.appendChild(modalText);
    modal.appendChild(subButton);
    fra.appendChild(blackScreen);

    document.body.appendChild(fra);

    // when it is clicked outside the modal, it gets removed
    blackScreen.addEventListener("click", e => {
        if (e.target == blackScreen) {
            window.onscroll = () => {};
            blackScreen.remove();
        }
    });


    // request to server to remove the listed element from the cart
    const cancel = () => {
        subButton.removeEventListener("click", cancel);
        fetch(window.location.href.split('#')[0], { 
            method: "POST",
            body: JSON.stringify({"reason": "cancel", "id": item.getAttribute("data-id")}),
            headers : { "Content-type" : "application/json" }
        }).then(res => res.json())
        .then(res => {
            if (res[0] == "FE") {
                console.log("error lol");
            } else {
                console.log(res[0]);
                blackScreen.remove();
                item.remove();
                window.onscroll = () => {};
            }
        });
    }
    subButton.addEventListener("click", cancel);
}

// purchasing simulation (lets be fair, It was pretty imposible to underaged to create a bank account and simulate a real purchase)
const purchaseItem = (item) => {
    window.onscroll = () => window.scrollTo(0, 0);

    // creates a modal to type the credit information
    const fra = document.createDocumentFragment();
    const blackScreen = document.createElement('div');
    const error = document.createElement("p");
    const modal = document.createElement("div");
    const modalText = document.createElement("h2");
    const subButton = document.createElement("div");
    const cardNumber = document.createElement("input");
    const expDate = document.createElement("input");
    const clientName = document.createElement("input");
    const cardType = document.createElement("select");
    const cvv = document.createElement("input");
    const adress = document.createElement("input");

    const option = document.createElement("option");
    const option1 = document.createElement("option");
    const option2 = document.createElement("option");
    const option3 = document.createElement("option");
    const option4 = document.createElement("option");
    const option5 = document.createElement("option");
    const option6 = document.createElement("option");
    const option7 = document.createElement("option");

    blackScreen.classList.add("black-screen");
    error.classList.add("error-messaje")
    modal.classList.add("frames", 'modal');
    modalText.classList.add("modal-text");
    cardNumber.classList.add("text-space", 'card-number', "inputs");
    expDate.classList.add("text-space", 'expires', "inputs");
    clientName.classList.add("text-space", 'client-name', "inputs");
    cardType.classList.add('card-type', "inputs");
    cvv.classList.add("text-space", 'cvv', "inputs");
    adress.classList.add("text-space", "adress", "inputs");
    subButton.classList.add("button", "sub-button");

    modalText.textContent = getLangText()[1][3];
    adress.type = cardNumber.type = expDate.type = clientName.type = cvv.type = "text";
    adress.placeholder = getLangText()[1][3];
    cardNumber.placeholder = getLangText()[1][4];
    expDate.placeholder = getLangText()[1][5];
    clientName.placeholder = getLangText()[1][6];
    cvv.placeholder = "CVV";
    subButton.textContent = getLangText()[1][7];
    error.textContent = getLangText()[1][8];
    error.style.textAlign = "center";

    option.textContent = getLangText()[1][9];
    option1.textContent = "Visa";
    option2.textContent = "MasterCard";
    option3.textContent = "American Exp";
    option4.textContent = "Codensa";
    option5.textContent = "PSE";
    option6.textContent = "Baloto";
    option7.textContent = "Efecty";

    cardType.appendChild(option);
    cardType.appendChild(option1);
    cardType.appendChild(option2);
    cardType.appendChild(option3);
    cardType.appendChild(option4);
    cardType.appendChild(option5);
    cardType.appendChild(option6);
    cardType.appendChild(option7);

    blackScreen.appendChild(modal);
    modal.appendChild(modalText);
    modal.appendChild(error);
    modal.appendChild(clientName);
    modal.appendChild(expDate);
    modal.appendChild(cardType);
    modal.appendChild(cvv);
    modal.appendChild(adress);
    modal.appendChild(subButton);
    fra.appendChild(blackScreen);
    document.body.appendChild(fra);

    // same than the other black screen
    blackScreen.addEventListener("click", e => {
        if (e.target == blackScreen) {
            blackScreen.remove();
            window.onscroll = () => {};
        }
    });

    // verifies the purchase elements 
    const buyer = () => {
        let valid = true;
        
        if (clientName.value.length < 4) {
            valid = false;
            error.textContent = getLangText()[1][10];
        }

        if (!expDate.value.match(/^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/)) {
            valid = false;
            error.textContent = getLangText()[1][11];
        }

        if (cardType.selectedIndex == 0) {
            valid = false;
            error.textContent = getLangText()[1][12];
        }

        if (!cvv.value.match(/^\d{3,4}$/)) {
            valid = false;
            error.textContent = getLangText()[1][13];
        }

        if (adress.value.length < 4) {
            valid = false;
            error.textContent = getLangText()[1][14];
        }

        // submits the info and request an item elimination
        if (valid) {
            subButton.removeEventListener("click", buyer);
            fetch(window.location.href.split('#')[0], { 
                method: "POST",
                body: JSON.stringify({"reason": "buy", "user": JSON.parse(userString).email, "id": item.getAttribute("data-id"), "adress": adress.value}),
                headers : { "Content-type" : "application/json" }
            }).then(res => res.json())
            .then(res => {
                if (res[0] == "FE") {
                    console.log("error lol");
                } else {
                    blackScreen.remove();
                    item.remove();
                    window.onscroll = () => {};
                }
            });
        } else {
            error.style.display = "block";
        }
    }
    subButton.addEventListener("click", buyer);
}


// guess what! this is an users-only page
if (userString === null) {
    alert("you must have an account to access this page");
    window.location.replace('/' + language + "/");
} else {
    const user = JSON.parse(userString);
    const pus = document.querySelector(".logged > p").lastElementChild;
    pus.innerHTML = `user: ${user.username}<br>email: ${user.email}`;
}

// gets the cart items in order to list them
const getItems = (deleteButton, table, callb, langNum) => {
    fetch(window.location.href.split('#')[0], { 
        method: "POST",
        body: JSON.stringify({"reason": "getReserved", "user": JSON.parse(userString).email, "table": table}),
        headers : { "Content-type" : "application/json" }
    }).then(res => res.json())
    .then(res => {
        pageTitle.textContent = getLangText()[1][15] + JSON.parse(userString).username;
        if (res[0] == "FE") {
            console.log("error lol");
        } else {
            if (res[0] == "no-products") itemContainer.textContent = getLangText()[1][0];
            else {
                // creates each element (yeah, I forgot the generation limit)
                for (element of res) {
                    // creating elements must be this long, because it creates real elements, when "html code" is added via code,
                    // although it'll work well, the DOM will see them as text elements and u may have some problems using those elements later 
                    const fr = document.createDocumentFragment();
                    const item = document.createElement("div");
                    const imageContainer = document.createElement('div');
                    const image = document.createElement("img");
                    const info = document.createElement("div");
                    const title = document.createElement("h2");
                    const price = document.createElement("h2");
                    const description = document.createElement("p");
                    const buttonCont = document.createElement("div");
                    const purchase = document.createElement("div");
                    const deleteB = document.createElement("div");
                    const span = document.createElement("span");
                    const span1 = document.createElement("span");

                    item.classList.add("item", "frames");
                    imageContainer.classList.add('image-cont');
                    image.classList.add("item-img");
                    info.classList.add("product-information");
                    title.classList.add("item-title");
                    price.classList.add("item-price");
                    description.classList.add("item-description");
                    buttonCont.classList.add("but-cont");
                    purchase.classList.add("buy-button", "button");
                    deleteB.classList.add("del-button", "button");

                    item.setAttribute("data-id", element.id);
                    image.src = "../media/productImages/" + element.id + element.extension;
                    title.textContent = element.name;
                    price.textContent = '$' + numberWithCommas(element.price);
                    description.textContent = element.description;
                    span.textContent = getLangText()[1][langNum];
                    span1.textContent = getLangText()[1][2];

                    purchase.addEventListener("click", callb.bind(null, item));

                    deleteB.addEventListener("click", () => {
                        fetch(window.location.href.split('#')[0], { 
                            method: "POST",
                            body: JSON.stringify({"reason": "delete", "user": JSON.parse(userString).email, "id": item.getAttribute("data-id")}),
                            headers : { "Content-type" : "application/json" }
                        }).then(res => res.json())
                        .then(res => {
                            if (res[0] == "FE") {
                                console.log("error lol");
                            } else {
                                item.remove();
                            }
                        });
                    });

                    imageContainer.appendChild(image);
                    item.appendChild(imageContainer);
                    item.appendChild(info);
                    info.appendChild(title);
                    info.appendChild(price);
                    info.appendChild(description);
                    info.appendChild(buttonCont);
                    buttonCont.appendChild(purchase);
                    purchase.appendChild(span);
                    if (deleteButton) {
                        buttonCont.appendChild(deleteB);
                        deleteB.appendChild(span1);
                    }
                    fr.appendChild(item);
                    itemContainer.appendChild(fr);
                }
            }
        }
    });
}

getItems(true, "products", purchaseItem, 1);

// bought elements tab
bought.addEventListener("click", () => {
    if (!bought.classList.contains("selected")) {
        bought.classList.add("selected");
        reserved.classList.remove("selected");
        itemContainer.innerHTML = '';
        getItems(false, "solditems", cancelItem, 16);
    }
});

// reserved elements tab
reserved.addEventListener("click", () => {
    if (!reserved.classList.contains("selected")) {
        reserved.classList.add("selected");
        bought.classList.remove("selected");
        itemContainer.innerHTML = '';
        getItems(true, "products", purchaseItem, 1);
    }
});
