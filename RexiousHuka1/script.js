// Retrieve existing users from localStorage or set an empty array if none exist
const users = JSON.parse(localStorage.getItem('users')) || [];

// Handle the login form submission
document.getElementById('loginForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    
    const loginEmail = document.getElementById('loginEmail').value;
    const loginPassword = document.getElementById('loginPassword').value;

    // Check if the user exists in the stored users
    const user = users.find(user => user.email === loginEmail && user.password === loginPassword);

    if (user) {
       // alert('Login successful!');
        window.location.href = "index.html"; // Redirect to the main page
    } else {
        alert('Invalid email or password.');
    }
});

// Handle the signup form submission
document.getElementById('signupForm')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    // Check if the email already exists
    if (users.find(user => user.email === email)) {
        alert('Email already exists. Please use a different email.');
        return;
    }

    // Add the new user to the list and store it in localStorage
    users.push({ name, email, password });
    localStorage.setItem('users', JSON.stringify(users));

   // alert('Sign-up successful!');
    window.location.href = "sign-in.html"; // Redirect to the sign-in page
});

// Handle Google Sign-In
function onGoogleSignIn(googleUser) {
    const profile = googleUser.getBasicProfile();
    const email = profile.getEmail();
    const name = profile.getName();

    // Check if the user already exists
    let user = users.find(user => user.email === email);

    if (!user) {
        // Create a new user if they don't exist
        user = { name, email, password: 'google-auth' }; // No need for password
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
    }

    //alert(`Welcome ${name}! You have successfully signed in with Google.`);
    window.location.href = "index.html"; // Redirect to the main page
}
