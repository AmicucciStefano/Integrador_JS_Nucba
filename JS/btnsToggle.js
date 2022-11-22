/* Toggle btns */
const toggleBtn = document.querySelector(".toggle-btn")
const links = document.querySelector(".links")
const cross = document.querySelector(".cross")
const linksA = document.querySelectorAll(".links-a")
const body = document.querySelector("body");

const toggleLinks = () => {
    if(links.classList.contains("show-links")) {
        links.style.animation ="slideOver 0.8s"
        links.classList.remove("show-links")
        noScrollMenu()
        return
    } else 
    links.classList.add("show-links")
    links.style.animation ="";
    noScrollMenu()
};

const noScrollMenu = () => {
    if(links.classList.contains("show-links")) {
        body.style.overflow = "hidden";
    } else {
        body.style.overflow = "auto";
    }
    return
}

const disapearMenu = (e) => {
    if(!e.target.classList.contains("links-a")) return;

    links.style.animation ="slideOver 0.8s"
    links.classList.remove("show-links")
    noScrollMenu()
    return
}

linksA.forEach((link) => {
    link.addEventListener("click", disapearMenu)
})

/* Slide to top */
const slideToTop = document.querySelector(".slide-to-top");


const slideUp = (e) => {
    if(!e.target.classList.contains("slide-to-top")) return;
    window.scrollTo(0, 0);
    return;
};




const init = () => {
    toggleBtn.addEventListener("click", toggleLinks);
    cross.addEventListener("click", toggleLinks);
    slideToTop.addEventListener("click", slideUp)
}

init()