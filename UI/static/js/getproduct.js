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
        <th>Amount</th>
        <th>Add to Cart</th>
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
                '<td><input type="number" min="1" class="form-text" placeholder="Amount" id="sale"></td>'+
                '<td><input type="submit" class="btn btn--primary" value="Add to Cart"></td>'+
                '</tr>';
        })
    })
    .catch(function(err) {
        console.log(err);
        message_box.innerHTML = err;
    });
}