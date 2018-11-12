// consume get sales endpoint 
window.onload = function getSales(e) {
    e.preventDefault();
    let message_box = document.getElementById('message-box');
    
    fetch('https://a-store-manager-app-api-v2.herokuapp.com/api/v2/sales',{
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
        if (data.Message == 'Sorry, there are no sales made yet'){
            message_box.innerHTML = message;
        }
        let sales = data.sales;
        let salesTable = document.getElementById('sales-records');
        th = `
        <tr>
        <th>Sale ID</th>
        <th>Date Ordered</th>
        <th>Amount</th>
        <th>Sold By</th>
        </tr>
        `
        salesTable.innerHTML = th
        sales.forEach(product => { 
            salesTable.innerHTML += '<tr>'+
                '<td>'+product.sale_id+'</td>'+
                '<td>'+product.date_ordered+'</td>'+
                '<td>'+product.amount+'</td>'+
                '<td>'+product.sold_by+'</td>'+
                '</tr>';
        })
    })
    .catch(function(err) {
        console.log(err);
        message_box.innerHTML = err;
    });
}