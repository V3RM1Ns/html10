$(document).ready(function() {
    let basketCount = 0;
    let products = [];

    function loadBasket() {
        const savedBasket = JSON.parse(localStorage.getItem("basket")) || [];
        products = savedBasket;

        basketCount = products.length;
        $('#basket-count').text(basketCount);
    }
    function saveBasket() {
        localStorage.setItem("basket", JSON.stringify(products));
    }

    loadBasket();

    toastr.options = {
        "closeButton": true,
        "progressBar": true,
        "positionClass": "toast-bottom-right",
        "timeOut": "2000"
    };

    $('.btn-primary').click(function() {
        const card = $(this).closest('.card');
        const productId = card.attr('id');
        const productName = card.find('.card-title').text();
        const productPrice = card.find('.card-text').text();
        const productImg = card.find('img').attr('src');

      
        const existingProductIndex = products.findIndex(product => product.id === productId);
        
        if (existingProductIndex !== -1) {
          
            products[existingProductIndex].count++;
        } else {
      
            products.push({
                id: productId,
                title: productName,
                price: productPrice,
                imgSrc: productImg,
                count: 1
            });
            basketCount++;
        }

        $('#basket-count').text(basketCount);
        saveBasket();

        toastr.success(`${productName} added to cart!`);

        $(this).removeClass('btn-primary').addClass('btn-success');
        setTimeout(() => {
            $(this).removeClass('btn-success').addClass('btn-primary');
        }, 1000);
    });

    $('#basket-icon').click(function() {
        if (products.length === 0) {
            Swal.fire({
                title: 'Empty Cart',
                text: 'Your cart is empty',
                icon: 'info',
                confirmButtonText: 'OK'
            });
            return;
        }

        let productList = '';
        products.forEach(product => {
            productList += `${product.title} x${product.count} - ${product.price}<br>`;
        });

        Swal.fire({
            title: 'Your Cart',
            html: productList,
            icon: 'success',
            showCancelButton: true,
            confirmButtonText: 'Go to Basket',
            cancelButtonText: 'Close'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = 'basket.html';
            }
        });
    });
});