function validateForm() {
    document.getElementById('message').innerHTML = ''
    var firstName = document.getElementById('signupFirstName').value;
    var lastName = document.getElementById('signupLastName').value;
    var email = document.getElementById('signupEmail').value;
    var userName = document.getElementById('signupUserName').value;
    var password = document.getElementById('signupPassword').value;
    var confirmPassword = document.getElementById('signupConfirmPassword').value;

    // Simple validation
    if (firstName === '' || lastName === '' || email === '' || userName === '' || password === '' || confirmPassword === '') {
        document.getElementById('message').innerHTML = 'All fields are required.';
        return;
    } else if (password !== confirmPassword) {
        document.getElementById('message').innerHTML = 'Password should be same.';
        return;
    } else {
        signup({ firstName, lastName, email, userName, password, confirmPassword })
    }
}

function signup(userData) {
    // Make an API call to register user (replace the URL with your backend endpoint if port is changed)
    fetch('http://localhost:3300/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Response from server:', data);
            if (data.message) {
                document.getElementById('message').innerHTML = data.message;
                if (data.success) {
                    alert("Signup Successfull. Click Login to continue")
                    document.getElementById('message').style.color = "green";
                } else {
                    document.getElementById('message').style.color = "red";
                }
            }
        })
        .catch(error => {
            console.error('Error making POST request:', error.message);
        });
}

function login() {
    var loginUserName = document.getElementById('loginUserName').value;
    var loginPassword = document.getElementById('LoginPassword').value;

    // Make an API call to register user (replace the URL with your backend endpoint)
    fetch('http://localhost:3300/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ loginUserName, loginPassword }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Response from server:', data);
            if (data.success) {
                alert(data.message)
            } else {
                document.getElementById('message').innerHTML = data.message;
                document.getElementById('message').style.color = "red";
            }

        })
        .catch(error => {
            console.error('Error making POST request:', error.message);
        });
}

function switchToLogin() {
    document.getElementById('message').innerHTML = ''
    document.getElementById('signupForm').style.display = "none"
    document.getElementById('LoginForm').style.display = "block"
}

function switchToSignup() {
    document.getElementById('message').innerHTML = ''
    document.getElementById('signupForm').style.display = "block"
    document.getElementById('LoginForm').style.display = "none"
}