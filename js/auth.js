// Check if user is logged in for protected pages
function requireLogin() {
    if (!localStorage.getItem('currentUser')) {
        alert("You must log in to view this page.");
        window.location.href = 'login.html';
    }
}

// Register User
function registerUser(event) {
    event.preventDefault();
    const email = document.getElementById('reg-email').value;
    const pass = document.getElementById('reg-pass').value;

    if(localStorage.getItem(email)) {
        alert("User already exists!");
        return;
    }

    localStorage.setItem(email, pass);
    alert("Registration Successful! Please Login.");
    window.location.href = 'login.html';
}

// Login User
function loginUser(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const pass = document.getElementById('login-pass').value;

    if (localStorage.getItem(email) === pass) {
        localStorage.setItem('currentUser', email); // Set Session
        alert("Login Successful!");
        window.location.href = 'catalog.html';
    } else {
        alert("Invalid Email or Password");
    }
}

// Logout
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}