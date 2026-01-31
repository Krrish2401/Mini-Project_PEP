let param = new URLSearchParams(window.location.search);
let query = param.get("q");

const container = document.getElementById('results');
const queryDisplay = document.getElementById('search-query');

// Display the search query
queryDisplay.textContent = `Showing results for: "${query}"`;

fetch("https://dummyjson.com/products")
    .then(response => response.json())
    .then(data => {
        const fp = data.products.filter(product => 
            product.title.toLowerCase().includes(query.toLowerCase())
        );

        if (fp.length === 0) {
            container.innerHTML = '<p class="no-history">No products found matching your search.</p>';
            return;
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
                <p class="price">$${price}</p>
            `;

            container.appendChild(productCard);

            // Add click event to navigate to product detail
            productCard.addEventListener('click', () => {
                // Update view history
                let historyArray = JSON.parse(localStorage.getItem('ViewHistory')) || [];
                const isThere = historyArray.findIndex(item => item.id === product.id);

                if(isThere === -1){
                    historyArray.push({
                        id: product.id,
                        timestamp: new Date().getTime()
                    });
                } else {
                    historyArray[isThere].timestamp = new Date().getTime();
                }

                localStorage.setItem('ViewHistory', JSON.stringify(historyArray));
                window.location.href = `product.html?id=${product.id}`;
            });
        });
    })
    .catch(error => {
        console.error('Error:', error);
        container.innerHTML = '<p class="error">Error loading search results. Please try again later.</p>';
    });
