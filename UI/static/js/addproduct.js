
let url = "https://a-store-manager-app-api-v2.herokuapp.com/api/v2/products";
let addProduct_button = document.getElementById('addProduct_button');
let message_box = document.getElementById('message-box');

addProduct_button.addEventListener('click', (event) => {
    message_box.innerHTML = "";
    addProduct_button.disabled = false;
    addProduct_button.value = "Adding...";
    let itemName = document.getElementById('name').value;
    let itemPrice = document.getElementById('price').value;
    let minQuantity = document.getElementById('min_quantity').value;
    let inventory = document.getElementById('inventory').value;
    let itemCategory = document.getElementById('category').value;
    if(itemName && itemPrice && minQuantity && inventory && itemCategory) {
        event.preventDefault();
        let data = {
            "name": itemName,
            "price": Number(itemPrice),
            "min_quantity": Number(minQuantity),
            "inventory": Number(inventory),
            "category": itemCategory
    };
    // Send POST request to admin login page
    fetch(url, {
        method: 'POST',
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
        if(message === "Product has been added successfully") {
            message_box.style.color = "green";
            message_box.innerHTML = `${message}`;
            addProduct_button.value = "Add another product";
            addProduct_button.disabled = false;
        }
        else {
            message_box.innerHTML = message;
            addProduct_button.value = "Add Product";
            addProduct_button.disabled = false;
        }
    })
    .catch(function(err) {
        console.log(err);
        message_box.innerHTML = err;
    });
    } else {
        message_box.innerHTML = "Bad request. Request missing a required parameter";
        addProduct_button.value = "Add Product";
    }
}); 