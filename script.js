const container = document.getElementById('productContainer');

const vh = [];
localStorage.setItem( 'ViewHistory',vh);

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

            productCard.addEventListener("click", ()=>{
                historyArray = localStorage.getItem('ViewHistory');
                if(!historyArray.includes(product.id)){
                    historyArray.push(product.id);
                }
                console.log('hist',historyArray);
                window.location.href = `product.html?id=${product.id}`
            })
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