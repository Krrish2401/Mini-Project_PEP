let param = new URLSearchParams(window.location.search);
// console.log(param);
let query = param.get("q");
// console.log(query);

const container = document.getElementById('results');
const heading = document.querySelector('h4');

fetch("https://dummyjson.com/products")
    .then(response => response.json())
    .then(data => {
        const filteredProducts = data.products.filter(product => 
            product.title.toLowerCase().includes(query.toLowerCase())
        );

        filteredProducts.forEach(product => {
            const title = product.title;
            const price = product.price;
            const image = product.thumbnail;

            const productCard = document.createElement('div');
            productCard.className = 'product-card';

            productCard.innerHTML = `
                <img src="${image}" alt="${title}">
                <h3>${title}</h3>
                <p class="price">$${price}</p>
            `;

            container.appendChild(productCard);
        });
    })
    .catch(error => console.log('Error:', error));