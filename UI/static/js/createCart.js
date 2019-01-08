
var cart = [];
var cartl = JSON.parse(localStorage.getItem('cartl'));
console.log(cartl);
if(cartl != null){
    cart = cartl;
}

document.getElementById("cart").innerHTML = "Cart " +cart.length;

function buildCart(productID, productName, productPrice) {
    console.log(productID);
    console.log(productName);
    console.log(productPrice);

   var newItem = {
                product_id: null,
                product_name: null,
                product_price: 0.00,
                quantity: 0,
            };
            
            newItem.product_id = productID;
            newItem.name = productName;
            newItem.price = productPrice; 
            newItem.quantity = 1;   
            
         
                    var cartItem = null;
                    for (var k = 0; k < cart.length; k++) {
                        if (cart[k].product_id == productID) {
                            cartItem = cart[k];
                            console.log("This item is already added");
                            // document.getElementById("message-box").innerHTML = "This item is already added";
                            alert("This item is already added");
                            break;
                        }
                    }

            if (cartItem == null) {
            cart.push(newItem);
            localStorage.setItem('cartl', JSON.stringify(cart));
            document.getElementById("cart").innerHTML = "Cart " +cart.length;
            }
}

