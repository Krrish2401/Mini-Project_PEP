const historyContainer = document.getElementById('history-container');

const historyData = JSON.parse(localStorage.getItem('ViewHistory')) || [];

if (historyData.length === 0) {
    historyContainer.innerHTML = '<p class="no-history">No viewing history yet. Browse products to see them here!</p>';
} else {
    historyData.sort((a, b) => b.timestamp - a.timestamp);

    fetch("https://dummyjson.com/products")
        .then(response => response.json())
        .then(data => {
            historyData.forEach(historyItem => {
                const product = data.products.find(p => p.id === historyItem.id);
                
                if (product) {
                    const title = product.title;
                    const price = product.price;
                    const image = product.thumbnail;
                    const viewedDate = new Date(historyItem.timestamp).toLocaleString();

                    const productCard = document.createElement('div');
                    productCard.className = 'product-card';

                    productCard.innerHTML = `
                        <img src="${image}" alt="${title}">
                        <h3>${title}</h3>
                        <p class="price">$${price}</p>
                        <p class="viewed-date">Viewed: ${viewedDate}</p>
                    `;

                    historyContainer.appendChild(productCard);

                    productCard.addEventListener('click', () => {
                        window.location.href = `product.html?id=${product.id}`;
                    });
                }
            });
        })
        .catch(error => {
            console.error('Error fetching products:', error);
            historyContainer.innerHTML = '<p class="error">Error loading history. Please try again later.</p>';
        });
}

function clearHistory() {
    if (confirm('Are you sure you want to clear your viewing history?')) {
        localStorage.setItem('ViewHistory', JSON.stringify([]));
        location.reload();
    }
}