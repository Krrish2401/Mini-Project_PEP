const container = document.getElementById('productContainer');

if (!localStorage.getItem('ViewHistory')) {
    localStorage.setItem('ViewHistory', JSON.stringify([]));
}

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
                let historyArray = JSON.parse(localStorage.getItem('ViewHistory'));

                const isThere = historyArray.findIndex(item => item.id === product.id);

                if(isThere === -1){
                    historyArray.push({
                        id: product.id,
                        timestamp: new Date().getTime()
                    });
                }
                else{
                    historyArray[isThere].timestamp = new Date().getTime();
                }

                localStorage.setItem('ViewHistory', JSON.stringify(historyArray));
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

function goToHistory(){
    window.location.href=`history.html`;
}