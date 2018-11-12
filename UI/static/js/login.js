
let url = "https://a-store-manager-app-api-v2.herokuapp.com/api/v2/auth/login";
let login_button = document.getElementById('login-button');
let message_box = document.getElementById('message-box');

login_button.addEventListener('click', (event) => {
    event.preventDefault();
    // define the DOM variables to be used in the app
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    message_box.innerHTML = "";
    login_button.value = "Loading...";
    login_button.disabled = true;

    let data = {
        "email": email,
        "password": password
    };

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
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
        console.log(message);
        if(message === "Successfully logged in") {
            message_box.style.color = "green";
            message_box.innerHTML = `${message}`;
            // Save token and user role on the local storage
            localStorage.userToken = json_response.token;
            localStorage.userRole = json_response.role;
            if(userRole === 'Admin'){
                // Redirect to admin dashboard
                window.location.replace("UI/templates/admindash.html");
            }
            if(userRole === 'attendant'){
                // Redirect to attendant profile page
                window.location.replace("UI/templates/storeattendant.html");
            }
        }else {
            message_box.innerHTML = message;
            login_button.value = "Login";
            login_button.disabled = false;
        }
    })
    .catch(function(error) {
        message_box.innerHTML = "Sorry. Reload page and try again";
        console.log(error);
    });
});