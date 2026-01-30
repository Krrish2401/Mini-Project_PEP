let param = new URLSearchParams(window.location.search);
let query = param.get("id");
console.log(query);

const details = document.getElementById("details");

fetch("https://dummyjson.com/products")
    .then(response => response.json())
    .then(data => {
        data.products.forEach(product => {
            if(product.id == query){
                const title = product.title;
                const price = product.price;
                const image = product.thumbnail;
                const avail = product.availabilityStatus;
                const desc = product.description;

                const productCard = document.createElement('div');
                productCard.className = 'product-detail-card';

                productCard.innerHTML = `
                <img src="${image}" alt="${title}">
                <h3>${title}</h3>
                <h3>${avail}</h3>
                <p class="price">$${price}</p>
                <p class="desc">${desc}</p>
            `;

                details.appendChild(productCard);
            }
            else{
                
            }
        });
    })
    .catch(error => console.log('Error:', error));