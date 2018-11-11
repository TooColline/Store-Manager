
let url = "https://a-store-manager-app-api-v2.herokuapp.com/api/v2/sales";
let addSale_button = document.getElementById('addSale_button');
let message_box = document.getElementById('message-box');
let token = localStorage.userToken;

addSale_button.addEventListener('click', (event) => {
    message_box.innerHTML = "";
    addSale_button.disabled = false;
    addSale_button.value = "Adding...";
    let itemName = document.getElementById('name').value;
    let quantity = document.getElementById('quantity').value;
    if(itemName && quantity) {
        event.preventDefault();
        let data = {
            "items": [{
                "name": itemName,
                "quantity": Number(quantity)
            }]
        }
       
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