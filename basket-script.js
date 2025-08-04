const basketItems = document.getElementById("basket-items");
const basket = JSON.parse(localStorage.getItem("basket")) || [];

function renderBasket() {
    basketItems.innerHTML = "";

    if (basket.length === 0) {
        basketItems.innerHTML = "<li class='list-group-item text-center text-muted'>Your basket is empty.</li>";
        
        return;
    }

    basket.forEach((item, index) => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex align-items-center justify-content-between basket-item";
        li.innerHTML = `
            <div class="d-flex align-items-center gap-3">
                <img src="${item.imgSrc}" class="item-img" alt="${item.title}">
                <div>
                
                    <h6 class="mb-1">${item.title}</h6>
                    <p class="text-success mb-0">${item.price}</p>
                </div>
            </div>
            <button class="btn btn-sm btn-outline-danger" onclick="removeItem(${index})">Remove</button>
        `;
        basketItems.appendChild(li);
    });
}

function removeItem(index) {
    basket.splice(index, 1);
    localStorage.setItem("basket", JSON.stringify(basket));
    renderBasket();
}

function clearBasket() {
    localStorage.removeItem("basket");
    renderBasket();
}

renderBasket();
