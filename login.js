const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    const password = e.target.querySelector('input[type="password"]').value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log('User logged in successfully');
            window.location.href = 'main.html';
        })
        .catch((error) => {
            console.error('Error logging in:', error);
        });
});

