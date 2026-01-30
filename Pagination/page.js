let cp = 1;
let ip = 8;
let allProducts = [];

let container = document.getElementById("list");
let pb = document.getElementById("prevB");
let nb = document.getElementById("nextB");
// let container = document.getElementById("list");

fetch("https://dummyjson.com/products")
.then(res => res.json())
.then(data => {
    allProducts = data.products;
    if(allProducts.length == 0){
        container.innerHTML = "<p>No products Available</p>";
        pb.disabled = true;
        nb.disabled = true;
        return
    }

    renderPage();
})
.catch(error => console.error(error));


function renderPage(){
    container.innerHTML = '';

    let start = (cp-1)*ip;
    let end = start + ip;

    let items = allProducts.slice(start, end);

    items.forEach(product => {
        let card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
        <img src ="${product.thumbnail}">
        <h3>${product.title}</h3>
        <p>${product.price}<p>
        `

        container.appendChild(card);

        card.addEventListener("click", ()=>{
            window.location.href = `http://localhost:5500/product.html?id=${product.id}`
        })
    })
    const totalPages = Math.ceil(allProducts.length / ip);

    pb.disabled = cp === 1;
    nb.disabled = cp === totalPages;
}

pb.addEventListener("click", ()=>{
    if(cp > 1){
        cp--;
        renderPage();
    }
})

nb.addEventListener("click", ()=>{
    const totalPages = Math.ceil(allProducts.length / ip);
    if(cp < totalPages){
        cp++;
        renderPage();
    }
})