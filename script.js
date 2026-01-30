const container = document.getElementById('productContainer');

fetch("https://dummyjson.com/products")
    .then(response => response.json())
    .then(data => {
        data.products.forEach(product => {
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


const si = document.getElementsByClassName("searchInput")[0];

function getResults(){
    const query = si.value.trim();
    if(!query) return;

    window.location.href = `search.html?q=${encodeURIComponent(query)}`;
    si.value = "";
}

si.addEventListener('keydown', function(event){
    if (event.key === "Enter"){
        getResults();
    }
})