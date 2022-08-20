window.onload = function () {
    getData();
} 

let products = [];
let categories = [];
let filteredProducts = [];

function getData() {
    fetch('https://dummyjson.com/products').then(res => res.json()).then(function(data) {
        products = data.products.map(function(product) {
            return {
            title: product.title,
            brand: product.brand,
            description: product.description,
            price: product.price,
            thumbnail: product.thumbnail,
            category: product.category
            };
        });
        renderProducts(products);
    })
    fetch('https://dummyjson.com/products/categories').then(res => res.json()).then(data => {
        renderSelect(data);
        categories = data;
    });
}

const renderProducts = products => {
    let htmlStr = products.map(product => 
            `<div class="card col-3 text-center p-3 m-2" style="width: 18rem; max-height: 35rem">
                <img src="${product.thumbnail}" class="card-img-top">
                <div class="card-body">
                <h5 class="card-title">${product.brand} ${product.title}</h5>
                <p class="card-text">${product.description}</p>
                <p>${product.price}$</p>
                </div>
            </div>`).join('');
    document.getElementById('product-cards').innerHTML = htmlStr;
}

const renderSelect = categories => {
    let htmlStr = `<option selected value="">Uncategorized</option>`;
    htmlStr += categories.map(category => `<option value="${category}">${category}</option>`);
    document.getElementById('select').innerHTML = htmlStr;
    console.log(categories)
}

document.getElementById('select').onchange = function(e) {
    if(e.currentTarget.value.length > 0) {
        filteredProducts = products.filter(function(product) {
            return product.category.includes(e.currentTarget.value)
        })
        renderProducts(filteredProducts);
        console.log(filteredProducts);
    } else {
        renderProducts(products)
    }
}

function showElement(categories) {
    console.log(categories)
}