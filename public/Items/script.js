//Go Back
function OpenProduct(i) {
   var cardManufacturer = document.querySelectorAll(
      `.product-popup-manufacturer[data-item='${i}']`
   );
   const manufacturer = cardManufacturer[0].innerHTML;

   const man = document.getElementsByClassName('product-manufacturer');
   man[0].innerHTML = manufacturer;

   var cardTitle = document.querySelectorAll(
      `.product-title[data-item='${i}']`
   );

   const title = cardTitle[0].innerHTML;

   const el = document.getElementsByClassName('product-popup-title');

   el[0].innerHTML = title;

   var i = $('.product-image[item-data="' + i + '"] img');
   var lbi = $('.lightbox-blanket .product-image img');

   $(lbi).attr('src', $(i).attr('src'));
   $('.lightbox-blanket').toggle();

   $('#product-quantity-input').val('0');
   CalcPrice(0);
}
function GoBack() {
   $('.lightbox-blanket').toggle();
}

//Calculate new total when the quantity changes.
function CalcPrice(qty) {
   var price = $('.product-price').attr('price-data');
   var total = parseFloat(price * qty).toFixed(2);
   $('.product-checkout-total-amount').text(total);
}

//Reduce quantity by 1 if clicked
$(document).on('click', '.product-quantity-subtract', function (e) {
   var value = $('#product-quantity-input').val();
   //console.log(value);
   var newValue = parseInt(value) - 1;
   if (newValue < 0) newValue = 0;
   $('#product-quantity-input').val(newValue);
   CalcPrice(newValue);
});

//Increase quantity by 1 if clicked
$(document).on('click', '.product-quantity-add', function (e) {
   var value = $('#product-quantity-input').val();
   //console.log(value);
   var newValue = parseInt(value) + 1;
   $('#product-quantity-input').val(newValue);
   CalcPrice(newValue);
});

$(document).on('blur', '#product-quantity-input', function (e) {
   var value = $('#product-quantity-input').val();
   //console.log(value);
   CalcPrice(value);
});

function AddToCart(e) {
   e.preventDefault();
   var qty = $('#product-quantity-input').val();
   if (qty === '0') {
      return;
   }
   var toast =
      '<div class="toast toast-success">Added ' + qty + ' to cart.</div>';
   $('body').append(toast);
   setTimeout(function () {
      $('.toast').addClass('toast-transition');
   }, 100);
   setTimeout(function () {
      $('.toast').remove();
   }, 3500);
}
