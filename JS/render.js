/* Render Destacados */

import { data } from "../index.js"

export const destacados = document.querySelector(".destacados")

export const renderCards = ( id, name, img, requisitos, price) => {
    return `
    <div class="div-game">
        <div class="game-img" style= "background-image:url(${img})">
            <span>${requisitos}</span>
        </div>
        <div class="game-name">
            <h3><a href="#">${name}</a></h3>
            <div class="container-price">
                <p class="game-price">$${price}</p>
                <p class="btn-buy" data-name="${name}" data-id="${id}" data-img=${img} data-price=${price}>Comprar</p>
            </div>
        </div>
    </div>
    ` 
}

const renderFilteredGames = (game) => {
    const {id, name, img, requisitos, price } = game;
    destacados.innerHTML += renderCards( id, name, img, requisitos, price)
}

const renderDestacados = () => {
    let filteredGames = data.filter((game) => game.destacado);
    filteredGames.map(renderFilteredGames)
}

/* Render todos los juegos */
export const containerGames = document.querySelector(".container-games")

export const renderAllGames = (game) => {
    const {id, name, img, requisitos, price } = game;
    containerGames.innerHTML += renderCards( id, name, img, requisitos, price)
}

export const renderGames = () => {
    data.map(renderAllGames)
}

const init = () => {
    renderDestacados()
    renderGames()
}

init()