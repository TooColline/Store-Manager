let logouturl = "https://a-store-manager-app-api-v2.herokuapp.com/api/v2/auth/logout";
let logoutButton = document.getElementById("logoutButton");

logoutButton.addEventListener('click', (event) => {
    event.preventDefault();

    fetch(logouturl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
    .then((response)=> {
        if(response.status < 500){
            return response.json()
        }
    })
    .then(function(json_response) {
        let message = json_response.message;
        if(message === "Logged out successfully") {
            window.location.replace("../../index.html");
        }else {
            console.log("Sorry, something is not right on our end.");
        }    
    })
    .catch(function(error) {
        console.log("Sorry. Reload page and try again");
        console.log(error);
    });
});