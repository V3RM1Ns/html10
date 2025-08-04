const basket = JSON.parse(localStorage.getItem("basket")) || [];
const basketSub = document.getElementById("basket-count");
const basketIcon = document.getElementById("basket-icon");

basketSub.innerText = basket.length;

document.querySelectorAll(".btn-primary").forEach(button => {
    button.addEventListener("click", (e) => {
        const card = e.target.closest(".card");
        const id = card.id;
        const title = card.querySelector(".card-title").innerText;
        const price = card.querySelector(".card-text").innerText;
        const imgSrc = card.querySelector("img").src;

        basket.push({ id, title, price, imgSrc });

        localStorage.setItem("basket", JSON.stringify(basket));
        basketSub.innerText = basket.length;
    });
});

basketIcon.addEventListener("click", () => {
    window.location.href = "basket.html";
});
