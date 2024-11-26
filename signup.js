const signupForm = document.getElementById('signup-form');

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = e.target.querySelector('input[placeholder="Name"]').value;
    const username = e.target.querySelector('input[placeholder="Username"]').value;
    const email = e.target.querySelector('input[type="email"]').value;
    const password = e.target.querySelector('input[type="password"]').value;

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            return db.collection('users').doc(user.uid).set({
                name: name,
                username: username,
                email: email,
                bio: '',
                followers: 0,
                following: 0
            });
        })
        .then(() => {
            console.log('User created successfully');
            window.location.href = 'main.html';
        })
        .catch((error) => {
            console.error('Error creating user:', error);
        });
});

