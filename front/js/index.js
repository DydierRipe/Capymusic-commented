"use strict"

const promotions = document.querySelector(".promotions");
const recAdded = document.querySelector(".promo-left");
const guitar = document.querySelector(".promo-center");
const etwNew = document.querySelector(".promo-right");
const gallery = document.querySelector(".product-gallery");
const image = document.querySelectorAll(".image-thing");
const header = document.querySelector('header');
const arrowDown = document.querySelector(".arrow-container");

const language = window.location.pathname.split('/')[1]; // yeah, I think that it would be good if u saw at least AddProduct.js for more info ab dis
setLang(language, 'index'); // changelang.js for more information

let oneOrTo = false;

// main image switch interval, in this case, they were two
setInterval(() => {
    image[0].style.transition = image[1].style.transition = 'transform 1.5s ease';
    image[0].style.transform = 'translateX(-110vw)';
    image[1].style.transform = 'translateX(5vw)';
    if (oneOrTo) oneOrTo = false;
    else oneOrTo = true;

    setTimeout(() => {
        image[0].firstElementChild.src = "media/images/" + (oneOrTo? langText[2][1] : langText[2][0]);
        image[1].firstElementChild.src = "media/images/" + (oneOrTo? langText[2][0] : langText[2][1]);
        image[0].style.transition = image[1].style.transition = '';
        image[0].style.transform = '';
        image[1].style.transform = '';
    }, 1500);
}, 5000);

// sets the fist observer behaviour and the same with the 2nd. it's something esthetic 
const observer1 = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
        entries[0].target.style.opacity = '1';
        entries[0].target.style.transform = 'translateY(0px)';
    } else {
        entries[0].target.style.opacity = '0';
        entries[0].target.style.transform = 'translateY(100px)';
    }
});

const observer2 = new IntersectionObserver(entries => {    
    if (entries[0].isIntersecting) {
        let i = 0;
        const func = () => {
            entries[0].target.children[i].classList.add("translated");
            
            i++;
            if (i > 3) {
                clearInterval(interval);
            }
        };
        const interval = setInterval(func, 200);
    }
});

observer1.observe(promotions);
observer2.observe(gallery);

// decreases main image size as the user scrolls down
document.addEventListener("scroll", () => {
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    const scroll = document.documentElement.scrollTop;
    
    for (const el of image) {
        el.style.width = `${Math.abs((scroll * 90 / vh) - 90)}vw`;
        el.style.height = `${Math.abs((scroll * 90 / vh) - 90)}vh`;
    }

    if (scroll > vh) {
        header.style.opacity = 1;
        arrowDown.style.opacity = 0;
    } else if (scroll > 434) {
        header.style.opacity = (scroll - 434) / (vh - 434);
        arrowDown.style.opacity = ((vh + 434) /(scroll + 434)) - 1;
    } else {
        header.style.opacity = 0;
        arrowDown.style.opacity = 1;
    }
});

// yeah, I don't remember adding an arrow to scroll down. KUDOS past Dydier ig.
arrowDown.addEventListener('click', () => {
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    window.scrollBy(0, vh - 100);
});

// yeah, this is some kind of guiding-the-user-through-the-other-pages
recAdded.addEventListener("click", () => {
    window.location.replace('/' + language + "/search");
});

guitar.addEventListener("click", () => {
    localStorage.setItem("tags", JSON.stringify(["String"]));

    window.location.replace('/' + language + "/search");
});

etwNew.addEventListener("click", () => {
    localStorage.setItem("tags", JSON.stringify(["odd"]));

    window.location.replace('/' + language + "/search");
});

const userString = localStorage.getItem("user"); // user info

for (let i = 0; i < promotions.children.length; i++) {
    promotions.children[i].addEventListener("mouseover", () => {
        promotions.children[1].style = "transform: scale(100%);";
    });
    
    promotions.children[i].addEventListener("mouseout", () => {
        promotions.children[1].style = "transform: scale(120%);";
    });
}

// yeah, this only shows the user info if logged
if (userString === null) {
    const pus = document.querySelector(".logged > p");
    pus.innerHTML = "Not logged";
} else {
    const user = JSON.parse(userString);
    const pus = document.querySelector(".logged > p").lastElementChild;
    pus.innerHTML = `user: ${user.username}<br>email: ${user.email}`;
}

// gets "random" items to showcase the popular products 
fetch("", { 
    method: "POST",
}).then(res => res.json())
.then(res => {
    if (res[0] == "watafac re loco") console.log("no data");
    else {
        let i = 0;
        for (let element of gallery.children) {
            const fr = document.createDocumentFragment();
            const tit = document.createElement("h3");
            const img = document.createElement("img");

            element.setAttribute("data-id", res[i].id);
            tit.textContent = res[i].name;
            img.src = "media/productImages/" + res[i].id + res[i].extension;
            img.alt = "product image";
            img.classList.add("product-image");

            fr.appendChild(tit);
            fr.appendChild(img);
            element.appendChild(fr);

            element.addEventListener("click", () => window.location.replace('/' + language + "/product#" + element.getAttribute("data-id")));
            i++;
        }
    }
});
