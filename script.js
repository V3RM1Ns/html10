$(document).ready(function() {
    let basketCount = 0;
    let products = [];

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

        products.push({
            id: productId,
            name: productName,
            price: productPrice
        });

        basketCount++;
        $('#basket-count').text(basketCount);

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
            productList += `${product.name} - ${product.price}<br>`;
        });

        Swal.fire({
            title: 'Your Cart',
            html: productList,
            icon: 'success',
            showCancelButton: true,
            confirmButtonText: 'Purchase',
            cancelButtonText: 'Close'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Thank You!',
                    text: 'Your order has been received.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                products = [];
                basketCount = 0;
                $('#basket-count').text('0');
            }
        });
    });
});