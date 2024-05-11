const itemContainer = document.querySelector(".item-cont");

const language = window.location.pathname.split('/')[1];
setLang(language, 'reports');

// I WONT COMMENT THIS FILE DUE TO IT WAS RUSHED, IF U WANNA CHECK IT OUT ANYWAYS, UR FREE TO DO IT, BUT I SAY THAT THIS MAY NOT HAVE THE SAME QUALITY
// AS OTHER FILES

const numberWithCommas = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const getSepReports = uEmail => {
    fetch(window.location.href.split('#')[0], { 
        method: "POST",
        body: JSON.stringify({'uEmail': uEmail, "reason": 'getSeparated'}),
        headers : { "Content-type" : "application/json" }
    }).then(res => res.json())
    .then(res => {
        if (res[0] == "no permission") window.location.replace('/' + language + '/');

        for (element of res) {
            const fr = document.createDocumentFragment();
            const item = document.createElement("div");
            const iss = document.createElement('div');
            const repId = document.createElement("h2");
            const productId = document.createElement("h2");
            const issue = document.createElement("h2");
            const reason = document.createElement("p");

            // overview of the product when hovering
            const overview = document.createElement("div");
            const imageContainer = document.createElement('div');
            const image = document.createElement("img");
            const info = document.createElement("div");
            const title = document.createElement("h2");
            const price = document.createElement("h2");
            const description = document.createElement("p");

            const buttonCont = document.createElement("div");
            const deleteRep = document.createElement("div");
            const deleteProd = document.createElement("div");
            const span = document.createElement("span");
            const span1 = document.createElement("span");

            item.classList.add("item", "frames");
            iss.classList.add("report-frame");
            reason.classList.add("reason");

            overview.classList.add("overview");
            imageContainer.classList.add('image-cont');
            image.classList.add("item-img");
            info.classList.add("product-information");
            productId.classList.add("item-id", 'dat');
            title.classList.add("item-title", 'dat');
            price.classList.add("item-price", 'dat');
            description.classList.add("item-description");

            buttonCont.classList.add("but-cont");
            deleteRep.classList.add("repo-button", "button");
            deleteProd.classList.add("del-button", "button");

            item.setAttribute("data-id", element.id);
            repId.textContent = "rep id: "+ element.id;
            issue.textContent = `<< ${element.issue_name} >>`;
            reason.textContent = element.reason;

            image.src = "../media/productImages/" + element.productId + element.extension;
            productId.textContent = "pr id: " + element.productId;
            title.textContent = element.product_name;
            price.textContent = '$' + numberWithCommas(element.price);
            description.textContent = element.description;
            span.textContent = "rep"; //getLangText()[1][langNum];
            span1.textContent = "pub"; //getLangText()[1][2];

            deleteRep.addEventListener("click", () => {
                fetch(window.location.href.split('#')[0], { 
                    method: "POST",
                    body: JSON.stringify({'uEmail': uEmail, "reason": 'deleteReport', 'id': element.id}),
                    headers : { "Content-type" : "application/json" }
                }).then(res => res.json())
                .then(res => {
                    if (res[0] == "deleted") {
                        item.remove();
                    }
                });
            });

            deleteProd.addEventListener("click", () => {
                fetch(window.location.href.split('#')[0], { 
                    method: "POST",
                    body: JSON.stringify({'uEmail': uEmail, "reason": 'deletePublication', 'id': element.productId, "rep": element.id}),
                    headers : { "Content-type" : "application/json" }
                }).then(res => res.json())
                .then(res => {
                    if (res[0] == "deleted") {
                        item.remove();   
                    }
                });
            });

            // product report
            iss.appendChild(repId);
            iss.appendChild(issue);
            iss.appendChild(reason);

            // actions
            deleteRep.appendChild(span);
            deleteProd.appendChild(span1);
            buttonCont.appendChild(deleteRep);
            buttonCont.appendChild(deleteProd);

            // product overview
            imageContainer.appendChild(image);
            info.appendChild(productId);
            info.appendChild(title);
            info.appendChild(price);
            info.appendChild(description);
            overview.appendChild(info);
            overview.appendChild(imageContainer);

            item.appendChild(overview);
            item.appendChild(iss);
            item.appendChild(buttonCont);
            fr.appendChild(item);
            itemContainer.appendChild(fr);
        }
    });
}

const userString = localStorage.getItem("user"); // user info

if (userString === null) {
    alert("you must have an account to access this page");
    window.location.replace('/' + language + '/'); 
} else {
    const user = JSON.parse(userString);
    const pus = document.querySelector(".logged > p").lastElementChild;
    pus.innerHTML = `user: ${user.username}<br>email: ${user.email}`;

    getSepReports(user.email);
}