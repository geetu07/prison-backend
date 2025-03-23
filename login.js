document.addEventListener("DOMContentLoaded", function() {
    console.log("Login script loaded!");

    const loginForm = document.getElementById('loginForm');
    if (!loginForm) {
        console.error("❌ Form not found! Check if `id='loginForm'` is present in `login.html`.");
        return;
    }

    loginForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');

        if (!usernameInput || !passwordInput) {
            console.error("❌ Username or Password input not found. Check `id='username'` and `id='password'` in HTML.");
            return;
        }

        const username = usernameInput.value;
        const password = passwordInput.value;

        console.log("Username:", username, "Password:", password); // ✅ Debugging

        const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            alert('✅ Login successful!');
            window.location.href = 'index.html';  // Redirect to index.html
        } else {
            alert('❌ Login failed: ' + data.message);
        }
    });
});
