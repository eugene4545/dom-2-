(function(){
    const cartInfo = document.getElementById("cart-info");
    const cart = document.getElementById("cart");
    cartInfo.addEventListener("click", function() {
        cart.classList.toggle("show-cart");
    })
})();

if(document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded", ready);
} else{
    ready();
}




function ready(){
    var addToCartButtons = document.getElementsByClassName("ADD-TO-CART");
    for(var i =0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i];
        button.addEventListener("click", addToCartClicked);
    }


    var quantityInputs = document.getElementsByClassName("cart-quantity-input");
    for (var i = 0; i < quantityInputs.length; i++) {
    input.addEventListener("change", quantityChanged);
    }
   // remove an item
    var removeCartItemButtons = document.getElementsByClassName("btn-danger");
    for(var i =0; i < removeCartItemButtons.length; i++){
        var button = removeCartItemButtons[i];
        button.addEventListener("click", removeCartItem);
    }
    // end
    
document.getElementsByClassName("btn-purchase")[0]
    .addEventListener("click", purchaseClicked);
    }

// 2nd part
    function removeCartItem(event) {
        var buttonClicked = event.target;
        buttonClicked.parentElement.parentElement.remove();
        updateCartTotal();
        updateItemsTotal();
    }

    function quantityChanged(event) {
        var input = event.target;
        if(isNaN(input.value) || input.value <= 0){
            input.value = 1;
        }
        updateCartTotal();
        updateItemsTotal();
    }

    function addToCartClicked(event) {
        var button = event.target
        var product = button.parentElement.parentElement;
        var title = product.getElementsByClassName("product_title")[0].innerText;
        var price = product.getElementsByClassName("product_price")[0].innerText;
        var ImageSrc = product.getElementsByClassName("product_image")[0].src;
        addItemToCart(title, price, ImageSrc);
        updateCartTotal();
        updateItemsTotal();

    }

    function addItemToCart(title, price, ImageSrc) {
        var cartRow = document.createElement ("div");
        cartRow.classList.add("cart-row");
        var cartItems = document.getElementsByClassName("cart-items")[0];
        var cartItemsTitles = cartItems.getElementsByClassName("cart-total-title");
        for (var i = 0; i < cartItemsTitles.length; i++) {
            if(cartItemsTitles[i].innerText == title) {
                alert("Item is already added");
                return;
            }
        }

        var cartRowContents =`
        <div class= "cart-item cart-column">
            <img class= "cart-item-image" src="${ImageSrc}">
            <span class= "cart-items-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`;
        cartRow.innerHTML =cartRowContents;
        cartItems.append(cartRow);
        cartRow.getElementsByClassName("btn-danger")[0].addEventListener("click", removeCartItem);
        cartRow.getElementsByClassName("cart-quantity-input")[0].addEventListener("change", quantityChanged);
    }   


    function updateCartTotal(){
        var cartItemContainer = document.getElementsByClassName("cart-items")[0];
        var cartRows = cartItemContainer.getElementsByClassName("cart-row");
    var total = 0;
    for (var i =0; i < cartRows.length; i++){
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName("cart-price")[0];
        var quantityElement = cartRow.getElementsByClassName("cart-quantity-input")[0];
        var price = parseFloat(priceElement.innerText.replace("$", ""));
        var quantity = quantityElement.value;
        total = total + price * quantity;
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName("cart-total-price")[0].innerText =
    "$" + total;
    
}

    function updateItemsTotal(){
        var cartItemContainer = document.getElementsByClassName("cart-items")[0];
        var cartRows = cartItemContainer.getElementsByClassName("cart-row");
        var total = 0;
        for (let i = 0; i < cartRows.length; i++){
            var cartRow = cartRows[i]
            var quantityElement = cartRow.getElementsByClassName
            ("cart-quantity-input")[0];
            var quantity = quantityElement.value;
            var total =total + parseInt(quantity);

        }
        document.getElementById("item-count").innerText = total;
    }