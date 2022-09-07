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
// function updatecart() {
//     var cart_item = document.getElementsByClassName("cart-items")[0];
//     var cart_rows = cart_item.getElementsByClassName("cart-row");
//     var total = 0;
//     for (var i = 0; i < cart_rows.length; i++) {
//         var cart_row = cart_rows[i]
//         var price_item = cart_row.getElementsByClassName("cart-price")[0]
//         var quantity_item = cart_row.getElementsByClassName("cart-quantity-input")[0]
//         var price = parseFloat(price_item.innerText)
//         var quantity = quantity_item.value // lấy giá trị trong thẻ input
//         total = total + (price * quantity)
//     }
//     document.getElementsByClassName("cart-total-price")[0].innerText = total + "$";
// }
function update_Cart() {
    var total = 0;
    let price = document.getElementById("price").value * 1;
    let amount = document.getElementById("amount").value;
    console.log(price, amount);
    total = total + (price * amount)
    document.getElementsByClassName("cart-total-price")[0].innerText = total + "$"
}
// update_Cart();
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
class Cart {
    constructor(id, name, price, screen, backCamera, frontCamera, img, desc) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.screen = screen;
        this.backCamera = backCamera;
        this.frontCamera = frontCamera;
        this.img = img;
        this.desc = desc;
    }
}
let listCart = [];

function add_cart(id) {
    const productsJSON = localStorage.getItem('products')
    const products = JSON.parse(productsJSON)
    const index = products.findIndex((item) => item.id == id);
    let currentProduct = null;
    if (index !== -1) {
        currentProduct = products[index]
    }
    // var cart_title = document.querySelector("#btn-cart").innerHTML;
    // console.log(cart_title);
    // for (let i = 0; i < listCart.length; i++) {
    //     if (cart_title[i] == currentProduct.id) {
    //         alert('Sản Phẩm Đã Có Trong Giỏ Hàng')
    //         return
    //     }
    // }
    const addproduct = { name: currentProduct.name, price: currentProduct.price, img: currentProduct.img, id: currentProduct.id }
    listCart = [...listCart, addproduct]
    saveData(listCart);
    showData();
    modal.style.display = "block";
}
function delete_cart(id) {
    const productsJSON = localStorage.getItem('products')
    const products = JSON.parse(productsJSON)
    const index = products.findIndex((item) => item.id == id);
    let currentProduct = null;
    if (index !== -1) {
        currentProduct = products[index]
    }
    const deleteProduct = { name: currentProduct.name, price: currentProduct.price, img: currentProduct.img, id: currentProduct.id }
    listCart.splice(deleteProduct, 1)
    saveData(listCart);
    showData(index);
    modal.style.display = "block";
}
function delete_allCart(id) {
    const productsJSON = localStorage.getItem('products')
    const products = JSON.parse(productsJSON)
    const index = products.findIndex((item) => item.id == id);
    let currentProduct = null;
    if (index !== -1) {
        currentProduct = products[index]
    }
    const deleteProduct = { name: currentProduct.name, price: currentProduct.price, img: currentProduct.img, id: currentProduct.id }
    listCart.splice(deleteProduct)
    saveData(listCart);
    showData(index);
    modal.style.display = "block";
}
let showData = () => {
    let getListCart = JSON.parse(localStorage.getItem("listCart"));
    let result = ``;
    getListCart.map(item => {
        result += `
            <tr>
            <td>
            <img class="cart-item-image" src="${item.img}" width="100" height="100">
            ${item.name}
            </td>
            <td id="price">${item.price}</td>
            <td>
            <div class="d-flex">
            <button class="btn-qty" onclick="qty_change1(${item.id})">
            <i class="fa fa-chevron-left"></i>
            </button>
            <p id="qty" style="padding:2px 5px;padding-top:16px">1</p>
            <button class="btn-qty" onclick="qty_change2(${item.id})">
            <i class="fa fa-chevron-right"></i>
            </button>
            <button class="btn btn-danger" type="button" onclick="delete_cart(${item.id})">Xóa</button>
            </div>
            
            </td>   
        <button class="btn btn-danger" type="button" onclick="delete_allCart(${item.id})">Xóa toàn bộ</button>
        </tr>
            `
    })
    document.getElementById("cart-items").innerHTML = result;
}

function qty_change1(id) {
    let number = document.getElementById("qty").innerHTML;
    document.getElementById("qty").innerHTML = number - 1;
}
function qty_change2(id) {
    let number = document.getElementById("qty").innerHTML;
    document.getElementById("qty").innerHTML = number + 1;
}
let saveData = (data) => {
    localStorage.setItem("listCart", JSON.stringify(data))
}

window.onload = showData();

// function addItemToCart(name, price, img) {
//     var cartRow = document.createElement('div')
//     cartRow.classList.add('cart-row')
//     var cartItems = document.getElementsByClassName('cart-items')[0]
//     var cartRowContents = `
//   <div class="cart-item cart-column">
//       <img class="cart-item-image" src="${img}" width="100" height="100">
//       <span class="cart-item-title">${name}</span>
//   </div>
//   <span class="cart-price cart-column">${price}</span>
//   <div class="cart-quantity cart-column">
//       <input class="cart-quantity-input" type="number" value="1">
//       <button class="btn btn-danger" type="button">Xóa</button>
//   </div>`
//     cartRow.innerHTML = cartRowContents
//     cartItems.append(cartRow)
//     cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', function () {
//         var button_remove = event.target
//         button_remove.parentElement.parentElement.remove()
//         updatecart()
//     })
//     cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', function (event) {
//         var input = event.target
//         if (isNaN(input.value) || input.value <= 0) {
//             input.value = 1;
//         }
//         updatecart()
//     })
// }
