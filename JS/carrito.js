import {destacados, containerGames} from "../JS/render.js" 

// traigo los elementos del storage en caso que haya y sino hay nada traigo un array vacio
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// a medida que voy agregando tareas, las almaceno en el localstorage
const saveLocalStorageCart = (cartList) => {
  localStorage.setItem('cart', JSON.stringify(cartList))
};

/* Carrito */
/* Botones */
const carrito = document.querySelector(".carrito")
const carritoBtn = document.querySelector(".carrito-btn")
const crossCarrito = document.querySelector(".cross-carrito")
const carritoComprar = document.querySelector(".carrito-comprar")



const toggleCarrito = () => {
    let isCartOpen = false;

    if(carrito.classList.contains("show-carrito")) {
        carrito.style.animation ="slideRightOver 0.8s"
        isCartOpen = false
        carrito.classList.remove("show-carrito")
        noScrollCart()
        return
    } else 
    carrito.classList.add("show-carrito")
    isCartOpen = true
    carrito.style.animation =""
    noScrollCart()
}

const disableBtn = (btn) => {
    if(!cart.length) {
        btn.classList.add("disabled")
        btn.classList.remove("enable")
        return;
    }
    btn.classList.remove("disabled")
    btn.classList.add("enable")
}

carritoBtn.addEventListener("click", toggleCarrito)
crossCarrito.addEventListener("click", toggleCarrito)

/* Funcionalidad */

const containerCardsProducts = document.querySelector(".container-cards-products");
const amount = document.querySelector(".amount")
const total = document.querySelector(".total")

const renderCartProduct = (cartProduct) => {
    const { id, name, img, price} = cartProduct;
    return `
    <div class="card-product">
        <div class="card-product-img">
            <img src="${img}" alt="${name}">
        </div>
        <div class="card-product-text">
            <h4>${name}</h4>
            <span>Precio: $${price}</span>
        </div>
        <div class="card-product-trash" data-id="${id}">
            <i class="trash fa-regular fa-trash-can"></i>
        </div>
    </div>
    `
}

const renderCart = () => {
    /* Si el carrito esta vacio */
    if(!cart.length) {
        amount.innerHTML = `${cart.length}`;
        containerCardsProducts.innerHTML = "<span class='no-product'>No hay productos en tu carrito</span>"
        disableBtn(carritoComprar)
        return;
    }
    /* Si el carrito tiene productos */
    containerCardsProducts.innerHTML = cart.map(renderCartProduct).join("");
    amount.innerHTML = `${cart.length}`;
}

const getAmount = (e) => {
    if(e.target.id !== "quantity") return;
    
}

const getCartTotal = () => {
    containerCardsProducts.addEventListener("mousemove", getAmount)
    const prices = cart.map((game) => game.price)
    let total = 0;
    prices.map((price) => total = total + Number(price))
    return total
}

const showTotal = () => {
    const totalPrice = getCartTotal()
    total.innerHTML = totalPrice;
} 

/* Funcion para manipular el añadido de producto */

const productData = (id, name, img, price) => {
    return { id, name, img, price };
};

const createCartProduct = (product) => {
    cart = [...cart, {...product}]
};

const addProduct =(e) => {
    if(!e.target.classList.contains("btn-buy")) return;
    const { id, name, img, price} = e.target.dataset;

    const product = productData( id, name, img, price)
    /* la constante sirve para saber si devuelve un obj, significa que el producto ya se encuentra en el carrito si devuelve undefined no se encuentra en el carrito */
    /* Tuve que hacerlo de esta manera porque con una funcion externa y llamarla dentro del if el find me devolvia undefined todo el tiempo en vez de true o false para que se ejecute el if */
    const game = cart.find((item) => item.id === product.id)
    if(game) {
        alert("¡Este producto ya se encuentra en tu carrito!");
        return;
    }

    if(window.confirm("¿Desea agregar el producto al carrito?")) {
        createCartProduct(product)
        saveLocalStorageCart(cart)
        renderCart(cart)
        disableBtn(carritoComprar)
        getCartTotal()
        showTotal()
        return
    }
};

const removeProductFromCart = (cartProduct) => {
    cart = cart.filter(product => Number(product.id) !== Number(cartProduct.id) )
    saveLocalStorageCart(cart)
    renderCart(cart)
    showTotal()
}

const handleDeleteBtn = (id) => {
    const cartProduct = cart.find(product => product.id === id);

    if(window.confirm("¿Desea eliminar el producto del carrito?")) {
        removeProductFromCart(cartProduct)
    }
    return
};

const deleteProduct = (e) => {
    if(!e.target.classList.contains("card-product-trash")) return;
    const id = e.target.dataset.id;
    handleDeleteBtn(id)
}

const emptyCart = (e) => {
    if(!e.target.classList.contains("carrito-comprar")) return;

    if(e.target.classList.contains("disabled")) return;

    if(window.confirm("¿Estas seguro que quieres comprar estos productos?")) {
        total.innerHTML = 0;
        cart = [];
        saveLocalStorageCart(cart)
        amount.innerHTML = `${cart.length}`;
        containerCardsProducts.innerHTML ="<span class='no-product'>No hay productos en tu carrito</span>";
        disableBtn(carritoComprar)
        return;
    }
};

const noScrollCart = () => {
    if(carrito.classList.contains("show-carrito")) {
        body.style.overflow = "hidden";  
    } else {
        body.style.overflow = "auto";
    }
    return
}

const init = () => {
    carritoComprar.addEventListener("click", emptyCart)
    document.addEventListener("DOMContentLoaded", renderCart)
    document.addEventListener("DOMContentLoaded", showTotal)
    disableBtn(carritoComprar)
    destacados.addEventListener("click", addProduct)
    containerGames.addEventListener("click", addProduct)
    containerCardsProducts.addEventListener("click", deleteProduct)
}

init()