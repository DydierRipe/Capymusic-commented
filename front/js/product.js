const image = document.querySelector(".image");
const prName = document.querySelector(".product-name");
const price = document.querySelector(".price");
const description = document.querySelector(".description");
const filter = document.querySelector(".filter-container");
const buyButton = document.querySelector(".buy-button");
const report = document.querySelector('.report-button');
const gallery = document.querySelector(".product-gallery")

const userString = localStorage.getItem("user"); // user info
const language = window.location.pathname.split('/')[1]; // not again please
setLang(language, "product");

const numberWithCommas = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


const retObj = () => {
    if (JSON.parse(userString) === null) return -1;
    else return JSON.parse(userString).email;
}

// gets and displays the current object
const getData = (updateGallery=true) => {
    filter.innerHTML = '';

    // I wanted to change the # to something more formal like /, but when I was willing to, there were already a lot of lines that used # url system
    fetch(window.location.href.split('#')[0], { 
        method: "POST",
        body: JSON.stringify({"reason": "getProductData", "id": window.location.hash.replace('#', '')}),
        headers : { "Content-type" : "application/json" }
    }).then(res => res.json())
    .then(res => {
        if (res[0] == "FE") {
            console.log("error lol");
        } else {
            let resp = res[1];
            res = res[0];

            image.src = "../media/productImages/" + window.location.hash.replace('#', '') + res[0].extension;
            
            document.title = res[0].name;

            if (res[0].owner == 'no-owner') prName.textContent = res[0].name;
            else {
                prName.textContent = res[0].name;
                const fr = document.createDocumentFragment();
                const soldMes = document.createElement("span");
                soldMes.textContent = res[0].owner == retObj()? getLangText()[1][0] : getLangText()[1][1];
                soldMes.classList.add("sold");
                fr.appendChild(soldMes);
                prName.appendChild(fr);
            }

            price.textContent = '$' + numberWithCommas(res[0].price);
            description.textContent = res[0].description;
            res[0].filters = res[0].filters.split(',');
            const fr = document.createDocumentFragment();
            res[0].filters.forEach(e => {
                const tag = document.createElement("div");
                tag.classList.add("filter-box");
                tag.textContent = e;

                fr.appendChild(tag);
            });
            filter.appendChild(fr);

            let i = 0;
            if (updateGallery) {
                // showcases other products that may like the user
                for (let element of gallery.children) {
                    const fra = document.createDocumentFragment();
                    const tit = document.createElement("h3");
                    const img = document.createElement("img");

                    element.setAttribute("data-id", resp[i].id);
                    tit.textContent = resp[i].name;
                    img.src = "../media/productImages/" + resp[i].id + resp[i].extension;
                    img.alt = "product image";
                    img.classList.add("product-image");

                    fra.appendChild(tit);
                    fra.appendChild(img);
                    element.appendChild(fra);

                    element.addEventListener("click", () => window.location.replace('/' + language + "/product#" + element.getAttribute("data-id")));
                    i++;
                }
            }

            // adds the item to the cart if not owned/reserved
            if (userString !== null) {
                if (res[0].owner == 'no-owner') {
                    buyButton.addEventListener("click", () => {
                        fetch(window.location.href.split('#')[0], { 
                            method: "POST",
                            body: JSON.stringify({"reason": "sellToUser", "id": window.location.hash.replace('#', ''), "user": JSON.parse(userString).email}),
                            headers : { "Content-type" : "application/json" }
                        }).then(res => res.json())
                        .then(res => {
                            if (res[0] == 'Sold') {
                                getData(false);
                            }
                        });
                    });
                }

                // reports system was totally rushed lol (I made it like in 3 days), it looks pretty good though
                report.addEventListener('click', () => {
                    window.onscroll = () => window.scrollTo(0, 0);
                    console.log("a");

                    const fra = document.createDocumentFragment();
                    const blackScreen = document.createElement('div');
                    const modal = document.createElement("div");
                    const modalText = document.createElement("h2");
                    const error = document.createElement("p");
                    const reportType = document.createElement("select");
                    const reason = document.createElement("input");
                    const subButton = document.createElement("div");

                    const defOpt = document.createElement("option");
                    const option = document.createElement("option");
                    const option1 = document.createElement("option");
                    const option2 = document.createElement("option");
                    const option3 = document.createElement("option");
                    const option4 = document.createElement("option");
                    const option5 = document.createElement("option");
                    const option6 = document.createElement("option");

                    blackScreen.classList.add("black-screen");
                    error.classList.add("error-messaje");
                    modal.classList.add("frames", 'modal');
                    modalText.classList.add("modal-text");
                    reportType.classList.add('report-type', "inputs");
                    reason.classList.add("text-space", 'reason', "inputs");
                    subButton.classList.add("button", "sub-button");

                    modalText.textContent = getLangText()[1][3];
                    subButton.textContent = getLangText()[1][4];
                    reason.placeholder = getLangText()[1][13]
                    error.style.textAlign = 'center';

                    defOpt.textContent = getLangText()[1][5];
                    option.textContent = getLangText()[1][6];
                    option1.textContent = getLangText()[1][7];
                    option2.textContent = getLangText()[1][8];
                    option3.textContent = getLangText()[1][9];
                    option4.textContent = getLangText()[1][10];
                    option5.textContent = getLangText()[1][11];
                    option6.textContent = getLangText()[1][12];

                    reportType.appendChild(defOpt);
                    reportType.appendChild(option);
                    reportType.appendChild(option1);
                    reportType.appendChild(option2);
                    reportType.appendChild(option3);
                    reportType.appendChild(option4);
                    reportType.appendChild(option5);
                    reportType.appendChild(option6);

                    const closeModal = () => {
                        window.onscroll = () => {};
                        blackScreen.remove();
                    }

                    blackScreen.addEventListener("click", e => {
                        if (e.target == blackScreen) {
                            closeModal();
                        }
                    });

                    subButton.addEventListener("click", () => {
                        let allow = true;
                        if (reportType.selectedIndex == 0) {
                            allow = false;
                            error.style.display = "block";
                            error.textContent = getLangText()[1][14];
                        }

                        if (reason.value.length > 44) {
                            allow = false;
                            error.style.display = "block";
                            error.textContent = getLangText()[1][15];
                        }

                        if (allow) {
                            closeModal();
                            fetch(window.location.href.split('#')[0], { 
                                method: "POST",
                                body: JSON.stringify({"reason": "sendReport", "id": window.location.hash.replace('#', ''), "issueId": reportType.selectedIndex, 'text': reason.value}),
                                headers : { "Content-type" : "application/json" }
                            }).then(res => res.json())
                            .then(res => {

                            });
                        }

                    });

                    blackScreen.appendChild(modal);
                    modal.appendChild(modalText);
                    modal.appendChild(error);
                    modal.appendChild(reportType);
                    modal.appendChild(reason);
                    modal.appendChild(subButton);
                    fra.appendChild(blackScreen);
                    document.body.appendChild(fra);
                });
            }
        }
    });
}

// detects when the # section changes
window.addEventListener("hashchange", () => getData(false));

getData();

if (userString === null) {
    const pus = document.querySelector(".logged > p");
    pus.innerHTML = getLangText()[1][2];
} else {
    const user = JSON.parse(userString);
    const pus = document.querySelector(".logged > p").lastElementChild;
    pus.innerHTML = `user: ${user.username}<br>email: ${user.email}`;
}