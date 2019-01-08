// consume get product endpoint 
let message_box = document.getElementById('message-box');

window.onload = function getProducts(e) {
    e.preventDefault();
    
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
        <th>Add to Cart</th>
        </tr>
        ` 
        productsTable.innerHTML = th
        products.forEach(product => { 
            var pname = product.name;
            productsTable.innerHTML += '<tr>'+
                '<td>'+product.product_id+'</td>'+
                '<td>'+product.name+'</td>'+
                '<td>'+product.price+'</td>'+
                '<td>'+product.min_quantity+'</td>'+
                '<td>'+product.inventory+'</td>'+
                '<td>'+product.category+'</td>'+
                '<td><a onClick="buildCart('+product.product_id+',\''+pname+'\','+product.price+')" class="btn btn--primary">Add to Cart</div></a></td>'+
                '</tr>';
        })
        // console.log(products.length);
        // document.getElementById('tproducts').innerHTML = products.length;
    })
    .catch(function(err) {
        console.log(err);
        message_box.innerHTML = err;
    });
}