// consume get product endpoint 

window.onload = function getProducts(e) {
    e.preventDefault();
    let message_box = document.getElementById('message-box');
    let token = localStorage.userToken;
    fetch('https://a-store-manager-app-api-v2.herokuapp.com/api/v2/products',{
        method:'GET',
        headers: {
            'Content-Type':'application/json',
            'Authorization': token,
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Request-Method': 'GET'
        }
    })
    .then((respose) => respose.json())
    .then((data) => {
        if (data.Message == 'Sorry, there are no products in the database yet'){
            message_box.innerHTML = message;
        }
        let products = data.products;
        let productsTable = document.getElementById('records-table');
        th = `
        <tr>
        <th>Item ID</th>
        <th>Item Name</th>
        <th>Item Price</th>
        <th>Min Quantity</th>
        <th>Inventory</th>
        <th>Category</th>
        <th>Edit</th>
        <th>Delete</th>
        </tr>
        `
        productsTable.innerHTML = th
        products.forEach(product => { 
            productsTable.innerHTML += '<tr>'+
                '<td>'+product.product_id+'</td>'+
                '<td name="'+product.product_id+'" contenteditable=False>'+product.name+'</td>'+
                '<td name="'+product.product_id+'" contenteditable=False>'+product.price+'</td>'+
                '<td name="'+product.product_id+'" contenteditable=False>'+product.min_quantity+'</td>'+
                '<td name="'+product.product_id+'" contenteditable=False>'+product.inventory+'</td>'+
                '<td name="'+product.product_id+'" contenteditable=False>'+product.category+'</td>'+
                '<td><a onclick="getSingleProduct('+product.product_id+')"><div id="'+product.product_id+'" class="btn btn--primary">Edit</div></a></td>'+
                '<td><a onclick="deleteProduct('+product.product_id+')"><div class="deleteButton">Delete</div></a></td>'+
                '</tr>';
        })
    })
    .catch(function(err) {
        console.log(err);
        message_box.innerHTML = err;
    });
}
 
let url = "https://a-store-manager-app-api-v2.herokuapp.com/api/v2/products";
let message_box = document.getElementById('message-box');
let token = localStorage.userToken;

function getSingleProduct(product_id) {
    let editButton = document.getElementById(product_id).innerHTML;
    if (editButton == 'Edit'){
    document.getElementById(product_id).innerHTML = "Save";
    var elms = document.getElementsByName(product_id);
    for (var i=0; i < elms.length; i++){
        elms[i].setAttribute("contenteditable", "True");
    }
    }
    else {
        document.getElementById(product_id).innerHTML = "Edit";
        var elms2 = document.getElementsByName(product_id);
        for (var i=0; i < elms2.length; i++){
            elms2[i].setAttribute("contenteditable", "false");
        }

        let productName = document.getElementsByName(product_id)[0].innerHTML;
        let productPrice = document.getElementsByName(product_id)[1].innerHTML;
        let productMinQuantity = document.getElementsByName(product_id)[2].innerHTML;
        let productInventory = document.getElementsByName(product_id)[3].innerHTML;
        let productCategory = document.getElementsByName(product_id)[4].innerHTML;

        let data = {
            "name": productName,
            "price": Number(productPrice),
            "min_quantity": Number(productMinQuantity),
            "inventory": Number(productInventory),
            "category": productCategory
        };
        fetch(`${url}/${Number(product_id)}`, {
            method: 'PUT',
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
            if(message === "Product has been modified successfully") {
                window.location.replace("modifyproducts.html");
            }
            else if (json_response.Message === "You need to login" ||
                     json_response.Message === "This token is invalid") {
                window.location.replace("../../index.html");
            }
            else {
                message_box.innerHTML = message;
            }
        })
        .catch(function(err) {
            console.log(err);
            message_box.innerHTML = err;
        });
    }
}

function deleteProduct(product_id) {
    let deleteurl = `${url}/${Number(product_id)}`;

    fetch(deleteurl, {
        method: 'DELETE',
        headers: {
            'Content-Type':'application/json',
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
        if(message === "Product has been deleted successfully") {
            window.location.replace("modifyproducts.html")
        }
        else if (json_response.Message === "You need to login" ||
                 json_response.Message === "This token is invalid") {
            window.location.replace("../../index.html");
        }
        else {
            message_box.innerHTML = message;
        }
    })
    .catch(function(err) {
        console.log(err);
        message_box.innerHTML = err;
    });
}