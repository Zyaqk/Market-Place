const urlParams = new.URLSearchParams(window.location.search);
const id = urlParams.get('id');

let profile = document.getElementById('user');
let productsGrid = document.getElementById('goods');

let url = `https://my-json-server.typicode.com/Zyaqk/Market-plays`;

let userRequest = new XMLHttpRequest();

userRequest.open('GET', `${url}/users/${id}`);
userRequest.responseType = 'json'
userRequest.onload = function() {
    let user = userRequest.response;
    profile.innerHTML = `
        <h1>${user.name}</h1>
        <h2>${user.sirname}</h2>
        <img src="${user.photo_url}">
        <p>Balance: ${user.balance}</p>
    `
}

userRequest.send();

let productsRequest = new XMLHttpRequest();

productsRequest.open('GET', `${url}/products?author_id=${id}`);
productsRequest.responseType = 'json'
productsRequest.onload = function() {
    let products = productsRequest.response;
    productsGrid.innerHTML = null;
    products.forEach(p => {
        productsGrid.innerHTML += `
        <div class="goods">
            <h2 class="products-name">${p.name}</h2>
            <img class="products-photo" src="${p.photo_url}" alt="${p.name}">
            <p class="products-price"><b>Price: </b>${p.price}$</p>
            <p class="products-description"><b>Description: </b>${p.description}</p>
        </div>`
    })
}

productsRequest.send();