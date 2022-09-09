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
// update cart 
function updatecart() {
    var cart_item = document.getElementsByClassName("cart-items")[0];
    var cart_rows = cart_item.getElementsByClassName("cart-row");
    var total = 0;
    for (var i = 0; i < cart_rows.length; i++) {
        var cart_row = cart_rows[i]
        var price_item = cart_row.getElementsByClassName("cart-price ")[0]
        var quantity_item = cart_row.getElementsByClassName("cart-quantity-input")[0]
        var price = parseFloat(price_item.innerText)
        var quantity = quantity_item.value // lấy giá trị trong thẻ input
        total = total + (price * quantity)
    }
    document.getElementsByClassName("cart-total-price")[0].innerText = total + '$'
}
setInterval(function () {
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
}, 1000)

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
    const addproduct = { name: currentProduct.name, price: currentProduct.price, img: currentProduct.img, id: currentProduct.id }
    listCart = [...listCart, addproduct]
    saveData(listCart);
    showData();
    updatecart();
    modal.style.display = "block";
}
function delete_cart(id) {
    const productsJSON = localStorage.getItem('products')
    const products = JSON.parse(productsJSON)
    const index = products.findIndex((item) => item.id == id);
    listCart.splice(index, 1)
    console.log(products);
    saveData(listCart);
    showData(index);
    updatecart();
    modal.style.display = "block";
}
function delete_allCart() {
    const productsJSON = localStorage.getItem('products')
    const products = JSON.parse(productsJSON)
    console.log(products);
    listCart.splice(products)
    saveData(listCart);
    showData();
    updatecart()
    modal.style.display = "block";
}
document.getElementById("thanhToan").onclick = function () {
    const productsJSON = localStorage.getItem('products');
    const products = JSON.parse(productsJSON);
    var total = document.getElementsByClassName("cart-total-price")[0].innerHTML;
    console.log(total);
    for (let i = 0; i < products.length; i++) {
        alert(` Tổng đơn của bạn là : ${total}`)
        break;

    }
    delete_allCart();
}
let showData = () => {
    let getListCart = JSON.parse(localStorage.getItem("listCart"));
    let result = ``;
    getListCart.map(item => {
        result += `
        <div class="cart-row">
            <div class="cart-item cart-column">
                <img class="cart-item-image" src="${item.img}" width="100" height="100">
                <span class="cart-item-title">${item.name}</span>
            </div>
            <span class="cart-price cart-column">${item.price}</span>
            <div class="cart-quantity cart-column">
                <input class="cart-quantity-input" type="number" value="1">
                <button class="btn btn-danger" type="button" onclick="delete_cart(${item.id})">Xóa</button>
            </div>
        </div>
            `
    })
    document.getElementById("cart-items").innerHTML = result;
}
let saveData = (data) => {
    localStorage.setItem("listCart", JSON.stringify(data))
}
window.onload = showData();