const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://prison-backend-production.up.railway.app";


document.getElementById('registerForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const role = document.getElementById('role').value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    const response = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, role })
    });

    const data = await response.json();
    alert(data.message);
});
