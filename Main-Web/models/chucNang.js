var product = new Product();
// Modal
var modal = document.getElementById("myModal");
var btn = document.getElementById("cart");
var close = document.getElementsByClassName("close")[0];
var close_footer = document.getElementsByClassName("close-footer")[0];
var order = document.getElementsByClassName("order")[0];
btn.onclick = function () {
    modal.style.display = "block";
}
close.onclick = function () {
    modal.style.display = "none";
}
close_footer.onclick = function () {
    modal.style.display = "none";
}
order.onclick = function () {
    alert("Cảm ơn bạn đã thanh toán đơn hàng")
}
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
// xóa cart
var remove_cart = document.getElementsByClassName("btn-danger");

for (var i = 0; i < remove_cart.length; i++) {
    var button = remove_cart[i]
    button.addEventListener("click", function () {
        var button_remove = event.target
        button_remove.parentElement.parentElement.remove()
        updatecart();
    })
}
// update cart 
function updatecart() {
    var cart_item = document.getElementsByClassName("cart-items")[0];
    var cart_rows = cart_item.getElementsByClassName("cart-row");
    var total = 0;
    for (var i = 0; i < cart_rows.length; i++) {
        var cart_row = cart_rows[i]
        var price_item = cart_row.getElementsByClassName("cart-price")[0]
        var quantity_item = cart_row.getElementsByClassName("cart-quantity-input")[0]
        var price = parseFloat(price_item.innerText)
        var quantity = quantity_item.value // lấy giá trị trong thẻ input
        total = total + (price * quantity)
    }
    document.getElementsByClassName("cart-total-price")[0].innerText = total + "$";
}
// thay đổi số lượng sản phẩm
var quantity_input = document.getElementsByClassName("cart-quantity-input");
for (var i = 0; i < quantity_input.length; i++) {
    var input = quantity_input[i];
    input.addEventListener("change", function (event) {
        var input = event.target
        if (isNaN(input.value) || input.value <= 0) {
            input.value = 1;
        }
        updatecart()
    })
}
// var add_cart = document.getElementsByClassName("btn-cart").onclick = function () {
//     var img = document.getElementsByClassName("img-prd")[0].src;
//     var name = document.getElementsByClassName("content-product-h3")[0].innerText;
//     var price = document.getElementsByClassName("gia")[0].innerText;
//     addItemToCart(name, price, img)
//     // addItemToCart(name, price, img)
//     // Khi thêm sản phẩm vào giỏ hàng thì sẽ hiển thị modal
//     modal.style.display = "block";
//     updatecart()
// }
var service = new Service();

function add_cart() {
    var img = document.getElementsByClassName("img-prd")[0].src;
    var name = document.getElementsByClassName("content-product-h3")[0].innerText;
    var price = document.getElementsByClassName("gia")[0].innerText;
    var product = new Product("", img, name, price);
    service
        .addProductApi(product)
        .then(function () {
            addItemToCart();
        })
        .catch(function (error) {
            console.log(error);
        })
}
function addItemToCart(name, price, img) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartRowContents = `
  <div class="cart-item cart-column">
      <img class="cart-item-image" src="${img}" width="100" height="100">
      <span class="cart-item-title">${name}</span>
  </div>
  <span class="cart-price cart-column">${price}</span>
  <div class="cart-quantity cart-column">
      <input class="cart-quantity-input" type="number" value="1">
      <button class="btn btn-danger" type="button">Xóa</button>
  </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', function () {
        var button_remove = event.target
        button_remove.parentElement.parentElement.remove()
        updatecart()
    })
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', function (event) {
        var input = event.target
        if (isNaN(input.value) || input.value <= 0) {
            input.value = 1;
        }
        updatecart()
    })
}
// var cart_title = cartItems.getElementsByClassName('cart-item-title')
    // // for (var i = 0; i < cart_title.length; i++) {
    // //     if (cart_title[i].innerText == name) {
    // //         alert('Sản Phẩm Đã Có Trong Giỏ Hàng')
    // //         return
    // //     }
    // // }