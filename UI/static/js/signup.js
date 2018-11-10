
let url = "https://a-store-manager-app-api-v2.herokuapp.com/api/v2/auth/signup";
let signup_button = document.getElementById('signup_button');
let message_box = document.getElementById('message-box');
let token = localStorage.userToken;

signup_button.addEventListener('click', (event) => {
    message_box.innerHTML = "";
    signup_button.disabled = false;
    signup_button.value = "Signing up...";
    let signupEmail = document.getElementById('signup-email').value;
    let signupPassword = document.getElementById('signup-password').value;
    let signupRole = document.getElementById('signup-role').value;
    if(signupEmail && signupPassword && signupRole) {
        event.preventDefault();
        let data = {
            "email": signupEmail,
            "password": signupPassword,
            "role": signupRole
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
        if(message === "User account created successfully") {
            message_box.style.color = "green";
            message_box.innerHTML = `${message}`;
            signup_button.value = "Add attendant";
            signup_button.disabled = false;
        }
        else {
            message_box.innerHTML = message;
            signup_button.value = "Add attendant";
            signup_button.disabled = false;
        }
    })
    .catch(function(err) {
        console.log(err);
        message_box.innerHTML = err;
    });
    } else {
        message_box.innerHTML = "Your credentials are missing either your email, password or role";
        signup_button.value = "Add attendant";
    }
}); 