import { renderCards, containerGames, renderGames, renderAllGames } from "./render.js"
import { data } from "../index.js"
/* Funcionalidad Filtros */
const filterBtns = document.querySelectorAll(".filter-btn")
/* Selecciono todos los botones para filtrar */

/* Creo la funcion setActive para agregarle o quitarle la clase active para demostrar cual esta activo y cual no */
const setActive = (e) => {
    if(!e.target.classList.contains("filter-btn")) {
        return
    } 
    e.target.classList.toggle("active")
}

/* Funcion para filtrar los juegos por los generos seleccionados, la variable generos es un array por lo tanto filtro los datos de todos los juegos y uso el metodo every en el array de generos que paso como parametro a la funcion, luego paso como parametro "g" que representa cada uno de los generos del array y verifica que en el filtro de la lista de los juegos, que juego contiene todos los generos que se le paso */
const filterGamesByGenre = (genres) => {
    const dataFiltered = data.filter((game) => { 
        return genres.every((g) => game.Genero.includes(g)) 
    });

    if( dataFiltered.length === 0) {
        console.log("0 juegos");
        containerGames.innerHTML = "<p class='no-games'>No hay juegos con esa/s categoria/s!</p>"
        return
    }
    /* El container lo vuelvo en blanco para que no quede ningun juego de otra renderizacion */
    containerGames.innerHTML= ""
    dataFiltered.map(renderGame)
}

/* Funcion para renderizar los juegos , paso un parametro que sea un objeto, y lo desestructuro en los datos que necesito, luego renderizo en el contenedor una funcion que le paso los parametros de cada juego ya que lo voy a usar en un map o filter */
const renderGame = (game) => {
    const {id, name, img, requisitos, price } = game;
    /* llamo a rendercards una funcion que cree en el render.js que solo renderiza el juego */
    containerGames.innerHTML += renderCards(id, name, img, requisitos, price);
}

/* Variable generos */
let genres = [];

/* La funcion getGenre, verifica que en donde haga click contenga filter-btn para poder acceder al dataset de ellos, si no lo contiene corta la funcion */
const getGenre = (e) => {
    if(!e.target.classList.contains("filter-btn")) {
        return
    }else if(genres.includes(e.target.dataset.genre)){
        /* Si el array generos incluye el dataset.genero del boton clickeado, busca el index del genero clickeado y lo corta, luego llama a la funcion filterGamesbygenre para filtrar de nuevo los juegos pero sin ese genero, tambien llama a setActive para sacarle la clase active y corta */
        let index = genres.indexOf(e.target.dataset.genre)
        genres.splice(index, 1)
        filterGamesByGenre(genres)
        setActive(e)
        return 
    } else 
    /* Si no pasa nada de lo anterior en el array de generos se pushea el genero clickeado, se borra el contenedor para no mostrar todos los juegos y se llama a filtergamesbygenre para filtrar la lista de los juegos por ese genero y se le pone la clase active al boton que fue clickeado */
    genres.push(e.target.dataset.genre)
    containerGames.innerHTML ="";
    filterGamesByGenre(genres)
    setActive(e)
}

/* Para todos los botones con el foreach llama al getgenre para agarrar el genero clickeado y activar todas las funciones */
filterBtns.forEach((btn) => {
    btn.addEventListener("click", getGenre)
})