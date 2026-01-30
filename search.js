let param = new URLSearchParams(window.location.search);
// console.log(param);
let query = param.get("q");
// console.log(query);

const container = document.getElementById('results');
const heading = document.getElementById('searchQuery');

if(query){
    // heading.innerHTML = ''
    heading.textContent = `Showing results for: "${query}"`;
}
else{
    heading.textContent = "No search query provided";
    container.innerHTML = "<p> PLease enter a search item.</p>"
}

fetch("https://dummyjson.com/products")
    .then(response => response.json())
    .then(data => {
        const fp = data.products.filter(product => 
            product.title.toLowerCase().includes(query.toLowerCase())
        );

        if (fp.length === 0){
            container.innerHTML = `<p> NO product found, Try a different search maybe?!`
        }

        fp.forEach(product => {
            const title = product.title;
            const price = product.price;
            const image = product.thumbnail;

            const productCard = document.createElement('div');
            productCard.className = 'product-card';

            productCard.innerHTML = `
                <img src="${image}" alt="${title}">
                <h3>${title}</h3>
                <p class="price">Rs.${price}</p>
            `;

            container.appendChild(productCard);
        });
    })
    .catch(error => console.log('Error:', error));
