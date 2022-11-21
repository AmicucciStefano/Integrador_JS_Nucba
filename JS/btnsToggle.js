/* Toggle btns */
const toggleBtn = document.querySelector(".toggle-btn")
const links = document.querySelector(".links")
const cross = document.querySelector(".cross")
const linksA = document.querySelectorAll(".links-a")

const toggleLinks = () => {
    if(links.classList.contains("show-links")) {
        links.style.animation ="slideOver 0.8s"
        links.classList.remove("show-links")
        return
    } else 
    links.classList.add("show-links")
    links.style.animation ="";
};

const disapearMenu = (e) => {
    if(!e.target.classList.contains("links-a")) return;

    links.style.animation ="slideOver 0.8s"
    links.classList.remove("show-links")
    return
}

linksA.forEach((link) => {
    link.addEventListener("click", disapearMenu)
})


toggleBtn.addEventListener("click", toggleLinks);
cross.addEventListener("click", toggleLinks);