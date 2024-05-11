const searchBar = document.querySelector("#bar");
const productChart = document.querySelector(".product-list");
const filters = document.querySelector(".filter-text");
const filtersChart = document.querySelector(".filter-container");
const tags = document.querySelectorAll("li");

// keywords for tags
const type = ['String', 'Percussion', 'Woodwind', 'Brass', 'Electric', 'Parts','Other'], 
color = ['Black', 'Blue', 'Brown', 'Cyan', 'Gray', 'Green', 'Orange', 'Purple', 'Red', 'White', 'Yellow'];
const userString = localStorage.getItem("user"); // user info
const language = window.location.pathname.split('/')[1];
setLang(language, "search"); // changelang.js

// list of filters applied 
let currentFilters = [];

const numberWithCommas = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// keyboard shortcuts 
document.addEventListener("keyup", e => {

    // shortcut made for searching (toggles search when enter is pressed)
    if (e.key == "Enter" && searchBar.value.length != 0 && searchBar === document.activeElement) {
        window.location.replace('/' + language + "/search" + "#" + searchBar.value);
        search();
    }

    // same shortcut as in addProducts
    if ((e.key == " " || e.key == "Enter") && filters === document.activeElement) {
        addFilter(filters.value.replaceAll(" ", ""));
    }
});

// activates search, any matching item will be displayed on the page since now
const search = (limitedSearch = true) => {  
    const instruction = localStorage.getItem("tags"); // user info
    if (instruction !== null) {
        for (e of JSON.parse(instruction)) {
            addFilter(e);
        }
        localStorage.removeItem("tags");
    }
    
    productChart.innerHTML = '';
    
    fetch(window.location.href.split('#')[0], { 
        method: "POST",
        body: JSON.stringify({"search": window.location.hash.substring(1).replaceAll("%20", " "), "filters": currentFilters, "lim": limitedSearch}),
        headers : { "Content-type" : "application/json" }
    }).then(res => res.text())
    .then(res => {
        res = JSON.parse(res);
        if (res[0] == "ERROR") console.log("error");
        else if (res[0] == "NO DATA") console.log("no data");
        else {
            // displays every matching item
            for (let i = 0; i < res.length; i++) {
                
                const fragment = document.createDocumentFragment();
                const element = document.createElement("div");
                const title = document.createElement("p");
                const price = document.createElement('p');
                const img = document.createElement("img");

                element.classList.add("product");
                title.classList.add('product-title');
                price.classList.add('product-price');
                img.classList.add('product-img');

                element.setAttribute("data-id", res[i].id);
                title.textContent = res[i].name;
                price.textContent = numberWithCommas(res[i].price) + '$';
                img.src = "../media/productImages/" + res[i].id + res[i].extension;
                
                element.appendChild(title);
                element.appendChild(price);
                element.appendChild(img);
                fragment.appendChild(element);
                productChart.appendChild(fragment);

                element.addEventListener("click", () => {
                    window.location.replace('/' + language + "/product#" + element.getAttribute('data-id'));
                });
            }
        }
    });
}

// adds a filter to the list everytime it's triggered
const addFilter = (filter = "") => { 
    filter = filter.trim();

    if (!filter == '' && !currentFilters.includes(filter)) {
        filters.value = '';

        const fr = document.createDocumentFragment();
        const filt = document.createElement("div");
        filt.classList.add("filter-box");
        filt.textContent = filter;
        fr.appendChild(filt);
        filtersChart.appendChild(fr);

        currentFilters.push(filter);
        window.location.hash? search() : search(false);
        
        filt.addEventListener("click", () => {
            currentFilters = currentFilters.filter(val => {if (val == filt.textContent) return false; else return true;});
            filt.remove();
            window.location.hash? search() : search(false);
        });
    }
}

// the page will show all the items by default, that's why these blocks aren't encapsulated by functions

tags.forEach(element => {
    element.addEventListener("click", () => {
        if (element.parentElement.parentElement.classList[0] == "type") {
            addFilter(type[Array.from(element.parentElement.children).map((e) => {
                return e.textContent;
            }).indexOf(element.textContent)]);
        } else if (element.parentElement.parentElement.classList[0] == "color") {
            addFilter(color[Array.from(element.parentElement.children).map((e) => {
                return e.textContent;
            }).indexOf(element.textContent)]);
        }
    });
});

if (window.location.hash) {
    // specific search
    searchBar.value = window.location.hash.replace("#", "").replaceAll("%20", " ");
    search();
} else {
    // default search
    search(false);
}

if (userString !== null) {
    const user = JSON.parse(userString);
    const pus = document.querySelector(".logged > p").lastElementChild;
    pus.innerHTML = `user: ${user.username}<br>email: ${user.email}`;
}

