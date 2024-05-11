const productName = document.querySelector(".name");
const droppingZone = document.querySelector(".image-uploader");
const price = document.querySelector(".dotted-number");
const productPrice = document.querySelector(".price");
const productDescription = document.querySelector("#description");
const filters = document.querySelector(".filter-text");
const filtersChart = document.querySelector(".filter-container");
const productType = document.querySelector("#category");
const productColor = document.querySelector("#color");
const error = document.querySelectorAll(".error-messaje");
const submitButton = document.querySelector(".submit");

const formData = new FormData();
const language = window.location.pathname.split('/')[1]; // gets the name form the url (es, en, de)
setLang(language, 'addProduct'); // sets the language in the correspondient module. (more data in changelang.js)

// keywords for tags
const type = ['String', 'Percussion', 'Woodwind', 'Brass', 'Electric', 'Parts','Other'], 
color = ['Black', 'Blue', 'Brown', 'Cyan', 'Gray', 'Green', 'Orange', 'Purple', 'Red', 'White', 'Yellow'];
const acceptedExt = ['heif', 'jpg', 'jpeg', 'png'];
const product = { // product object template
    "name": "",
    "price": 0.0,
    "description": "",
    "instrumentType": -1,
    "filters": [],
    "seller": ""
}

// makes numbers easier to understand
const numberWithCommas = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// detects keyboard events
document.addEventListener("keyup", e => {

    //adds a tag when tags are being written
    if ((e.key == " " || e.key == "Enter") && filters === document.activeElement) {
        if (product.filters.length < 5) {
            addFilter(filters.value.replaceAll(" ", ""));
        } else {
            error[3].style.display = "block";
            error[3].textContent = getLangText()[1][0];
        }
    }

    // updates the price string in real time when its typed 
    if (productPrice === document.activeElement && (e.key.match(/^[0-9]+$/) || e.key == "Backspace")) {
        price.textContent = numberWithCommas(productPrice.value) + "$";
    }
});

// submit ur product once it's ready
submitButton.addEventListener("click", () => {
    let canBeSubmited = true;

    // product must have more than 5 characters
    if (productName.value < 6) {
        canBeSubmited = false;
        error[0].textContent = getLangText()[1][1];
        error[0].style.display = "block";
    } else error[0].style.display = "none";

    // product must have an image
    if (droppingZone.children[1].style.display != 'none') {
        canBeSubmited = false;
        error[1].textContent = getLangText()[1][2];
        error[1].style.display = "block";
    } else error[1].style.display = "none";
    
    // price should be greater than 50 pesos
    if (Number(price.textContent.slice(0,-1).replaceAll(",", "")) < 50) {
        canBeSubmited = false;
        error[2].textContent = getLangText()[1][3];
        error[2].style.display = "block";
    } else error[2].style.display = "none";

    if (Number(price.textContent) < 50) {
        canBeSubmited = false;
        error[2].textContent = getLangText()[1][3];
        error[2].style.display = "block";
    } else error[2].style.display = "none";
    
    // description must be detailed 
    if (productDescription.value.length < 50) {
        canBeSubmited = false;
        error[3].textContent = getLangText()[1][4];
        error[3].style.display = "block";
    } else error[3].style.display = "none";

    // product should have at least one tag
    if (product.filters.length < 1) {
        canBeSubmited = false;
        error[4].textContent = getLangText()[1][5];
        error[4].style.display = "block";
    } else error[4].style.display = "none";

    // product should be categorized
    if (productType.selectedIndex == 0 || productColor.selectedIndex == 0) {
        canBeSubmited = false;
        error[5].textContent = getLangText()[1][6];
        error[5].style.display = "block";
    } else error[5].style.display = "none";

    // once every filter has been passed, starts sending the data
    if (canBeSubmited) {
        // sets the object up
        product.name = productName.value;
        product.price = Number(price.textContent.slice(0,-1).replaceAll(",", ""));
        product.description = productDescription.value;
        product.instrumentType = productType.selectedIndex;
        product.filters.push(type[productType.selectedIndex-1]);
        if (productColor.selectedIndex != 12) {
            product.filters.push(color[productColor.selectedIndex-1]);
        }

        console.log(product);

        formData.append('product', JSON.stringify(product));

        // posts the object and waits for response
        fetch(window.location.href.split('#')[0], { 
            method: "POST",
            body: formData,
        }).then(res => res.json())
        .then(res => {
            if (res[0] == "FE") {
                console.log("error lol");
            } else {
                window.location.replace('/' + language + "/product#" + res[0]);
            }
        });
    }
});


// indicates when an image is about to be dropped in the block
droppingZone.addEventListener("dragover", e => {
    e.preventDefault();
    droppingZone.style.border = "4px #422c65 dashed";
});

// returns to the original state when an image is no more on the block
droppingZone.addEventListener("dragleave", e => {
    e.preventDefault();
    droppingZone.style.border = "4px var(--border) dashed";
});

// place the image and gets the file
droppingZone.addEventListener("drop", e => {
    e.preventDefault();

    droppingZone.style.border = "4px var(--border) dashed";
    if (droppingZone.children[1].style.display != 'none') {
        let extension = e.dataTransfer.files[0].name.split('.').pop().toLowerCase();
        if (acceptedExt.indexOf(extension) > -1) {
            getFile(e.dataTransfer.files[0]);
        }
    }
});

// gets the image file
const getFile = (file) => {
    
    let url = URL.createObjectURL(file);
    const img = document.createElement("img");
    img.src = url;
    img.style.height = "300px";
    
    // shows the image preview
    const fr = document.createDocumentFragment();
    fr.appendChild(img);
    droppingZone.lastElementChild.style.display = "none";
    droppingZone.appendChild(fr);
    droppingZone.style = "padding: 0px; width: fit-content; height: fit-content;";
    error[1].style.display = "none";

    formData.append('image', file);

    droppingZone.addEventListener("click", () => {
        img.remove();
        product.image = "";
        droppingZone.style = "";
        droppingZone.lastElementChild.style.display = "block";
    });
    
}

// adds and showcases the tags list
const addFilter = (filter = "") => { 
    filter = filter.trim();

    if (!filter == '' && !product.filters.includes(filter)) {
        filters.value = '';

        const fr = document.createDocumentFragment();
        const filt = document.createElement("div");
        filt.classList.add("filter-box");
        filt.textContent = filter;
        fr.appendChild(filt);
        filtersChart.appendChild(fr);

        product.filters.push(filter);
        
        filt.addEventListener("click", () => {
            product.filters = product.filters.filter(val => {if (val == filt.textContent) return false; else return true;});
            filt.remove();
        });
    }
}

const userString = localStorage.getItem("user"); // user info

// this is an only-users page
if (userString === null) {
    alert("you must have an account to access this page");
    window.location.replace('/' + language + '/'); 
} else {
    const user = JSON.parse(userString);
    const pus = document.querySelector(".logged > p").lastElementChild;
    pus.innerHTML = `user: ${user.username}<br>email: ${user.email}`;
    product.seller = user.email;
}