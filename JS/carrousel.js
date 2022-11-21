/* Carrousel */

import { data } from "../index.js"

/* Render carrousel imagenes */
const carrousel = document.querySelector(".carrousel")

const renderImagesCarrousel = () => {
    const games = data.filter((game) => game.carrousel)
    carrousel.innerHTML =  games.map(renderImages).join("")
}

const renderImages = (game) => {
    const {name, description, carrousel} = game;
    let string =""
    return string += 
    `
    <div class="slide" style="background-image:url(${carrousel})">
    
        <h3 class="title">${name}</h3>
        <p class="description">${description}</p>
        <div class="background-opacity"></div>
    </div>
    `
}

renderImagesCarrousel()

/* Carrousel funcionalidad */

const slides = document.querySelectorAll(".slide")
const right = document.querySelector(".arrowright")
const left = document.querySelector(".arrowleft")

slides.forEach(function(slide, index) {
    slide.style.left = `${index * 100}%`
})
let counter = 0;

right.addEventListener("click", function(){
    counter++
    carousel()
})

left.addEventListener("click", function(){
    counter--
    carousel()
})

const carousel = () => {
    counter === slides.length ? counter = 0 :
    counter < 0 ? counter = slides.length - 1 : "";
    slides.forEach(function(slide){
        slide.style.transform = `translateX(-${counter * 100}%)`
    })
    return
}
