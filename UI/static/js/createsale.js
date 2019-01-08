// consume create sale order endpoint
let url = "https://a-store-manager-app-api-v2.herokuapp.com/api/v2/sales";
let addSale_button = document.getElementById('addSale_button');
let message_box = document.getElementById('message-box');


addSale_button.addEventListener('click', (event) => {
    message_box.innerHTML = "";
    addSale_button.disabled = false;
    addSale_button.value = "Adding...";
    if(products) {
        event.preventDefault();
        let data = products;
        let data2 = {
            "items": [{
                "name": "itemName",
                "quantity": 454
            }]
        }
        
        console.log(data);
        console.log(data2);
       
    // Send POST request
    fetch(url, {
        method: 'POST',
        // body: JSON.stringify({"name":itemName, "quantity":Number(quantity)}),
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
    .then((response)=> {
        if(response.status < 500){
            return response.json()
        }
        else{
            message_box.innerHTML = response;
        }
    })
    .then(function(json_response) {
        let message = json_response.message;
        if(message === "Sale order made successfully") {
            message_box.style.color = "green";
            message_box.innerHTML = `${message}`;
            addSale_button.value = "Add another sale";
            addSale_button.disabled = false;
        }
        else {
            message_box.innerHTML = message;
            addSale_button.value = "Add Sale";
            addSale_button.disabled = false;
        }
    })
    .catch(function(err) {
        console.log(err);
        message_box.innerHTML = err;
    });
    } else {
        message_box.innerHTML = "Bad request. Request missing a required parameter";
        addSale_button.value = "Add Sale";
    }
}); 


var products = JSON.parse(localStorage.getItem("cartl"));
let productsTable = document.getElementById('records-table');
th = `
<tr>
<th>Item ID</th>
<th>Item Name</th>
<th>Item Price</th>
<th>Quantity</th>
<th>Total</th>
<th>Action</th>
</tr>
`
productsTable.innerHTML = th
var gTotal = 0;
products.forEach(product => { 

    gTotal += product.price * product.quantity;
    


    productsTable.innerHTML += '<tr>'+
        '<td>'+product.product_id+'</td>'+
        '<td>'+product.name+'</td>'+
        '<td id="'+product.product_id+'P">'+product.price+'</td>'+
        '<td><input type= number id= "'+product.product_id+'Q" value="'+product.quantity+'"  min="1" onchange="qntytotal('+product.product_id+','+product.price+')"></td>'+
        '<td id="'+product.product_id+'" onchange="allTotal()">'+product.price+'</td>'+
        '<td><a onClick="removeFromCart('+product.product_id+')" class="btn btn--primary">Delete</div></a></td>'+
        '</tr>';

        qntytotalOnload(product.product_id, product.price);

})
document.getElementById('total').innerHTML = "Total: " +gTotal;

function qntytotalOnload(pID, pPrice){
    var qntyVariable = document.getElementById(pID+'Q').value;
    var totalQ = qntyVariable * pPrice;
    document.getElementById(pID).innerHTML = totalQ;

}

function qntytotal(productId, productPrice){
                    var priceVariable = document.getElementById(productId+'Q').value;
                    var total = priceVariable * productPrice;
                    document.getElementById(productId).innerHTML = total;


                    for (var k in products) {
                        if (products[k].product_id == productId) {
                            products[k].quantity = priceVariable;
                           break; //Stop this loop, we found it!
                        }
                      }
                      localStorage.setItem('cartl', JSON.stringify(products));

                    let fTotal = 0;
                    for (var i = 1; i < products.length + 1; i++) {
                        var tValue = document.getElementById("records-table").rows[i].cells.item(4).innerHTML;
                        fTotal += Number(tValue);
                        document.getElementById('total').innerHTML = "Total: " +fTotal;
                        console.log(fTotal);
                      }
                      
                    }


function test() {
    localStorage.removeItem('cartl');
    
}

function removeFromCart(productID) {

    for (var i = products.length - 1; i >= 0; --i) {
        if (products[i].product_id == productID) {
            products.splice(i,1);
        }
    }
    localStorage.setItem('cartl', JSON.stringify(products));

    window.location.replace("cart.html");
}
function toObject(arr) {
    var rv = {};
    for (var i = 0; i < arr.length; ++i)
      rv[i] = arr[i];
    return rv;
  }