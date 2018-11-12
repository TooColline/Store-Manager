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
                '<td>'+product.name+'</td>'+
                '<td>'+product.price+'</td>'+
                '<td>'+product.min_quantity+'</td>'+
                '<td>'+product.inventory+'</td>'+
                '<td>'+product.category+'</td>'+
                '<td><a onclick="getSingleProduct('+product.product_id+')"><div class="btn btn--primary">Edit</div></a></td>'+
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

// function getSingleProduct(product_id) {
//     let getSingleProductURL = `${url}/${Number(product_id)}`;

//     fetch(getSingleProductURL, {
//         method: 'PUT',
//         headers: {
//             'Content-Type':'application/json',
//             'Authorization': token
//         }
//     })
//     .then((response)=> {
//         if(response.status < 500){
//             return response.json()
//         }
//         else{
//             message_box.innerHTML = response;
//         }
//     })
// }

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