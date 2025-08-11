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
            <div class="d-flex align-items-center gap-2">
                <div class="d-flex align-items-center gap-2">
                    <button class="btn btn-sm btn-outline-secondary" onclick="decreaseCount(${index})">-</button>
                    <span class="fw-bold px-2">${item.count}</span>
                    <button class="btn btn-sm btn-outline-secondary" onclick="increaseCount(${index})">+</button>
                </div>
                <button class="btn btn-sm btn-outline-danger ms-2" onclick="removeItem(${index})">Remove</button>
            </div>
        `;
        basketItems.appendChild(li);
    });
}

function increaseCount(index) {
    basket[index].count++;
    localStorage.setItem("basket", JSON.stringify(basket));
    renderBasket();
}

function decreaseCount(index) {
    if (basket[index].count > 1) {
        basket[index].count--;
    } else {
        basket.splice(index, 1);
    }
    localStorage.setItem("basket", JSON.stringify(basket));
    renderBasket();
}

function removeItem(index) {
    basket.splice(index, 1);
    localStorage.setItem("basket", JSON.stringify(basket));
    renderBasket();
}

function clearBasket() {
    basket.length = 0;
    localStorage.setItem("basket", JSON.stringify(basket));
    renderBasket();
}
renderBasket();
