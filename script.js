let cp = 1;
let ip = 8;
let allProducts = [];

const container = document.getElementById('productContainer');
const pb = document.getElementById('prevBtn');
const nb = document.getElementById('nextBtn');

fetch("https://dummyjson.com/products")
    .then(response => response.json())
    .then(data => {
        allProducts = data.products;
        if(allProducts.length == 0){
            container.innerHTML = `<p>OOPS! No product found!`;
            pb.disabled = true;
            nb.disabled = true;
            return;
        }

        renderPage()
    })
    .catch(error => console.log('Error:', error));


function renderPage() {
    container.innerHTML = '';

    let start = (cp - 1) * ip;
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

        card.addEventListener("click", () => {
            window.location.href = `http://localhost:5500/product.html?id=${product.id}`
        })
    })
    const totalPages = Math.ceil(allProducts.length / ip);

    pb.disabled = cp === 1;
    nb.disabled = cp === totalPages;
}

pb.addEventListener("click", () => {
    if (cp > 1) {
        cp--;
        renderPage();
    }
})

nb.addEventListener("click", () => {
    const totalPages = Math.ceil(allProducts.length / ip);
    if (cp < totalPages) {
        cp++;
        renderPage();
    }
})

const si = document.getElementsByClassName("searchInput")[0];

function getResults(){
    const query = si.value.trim();
    if(!query) return;

    window.location.href = `search.html?q=${encodeURIComponent(query)}`;
    si.value = "";
}