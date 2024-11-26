// Check auth state
auth.onAuthStateChanged(user => {
    if (user) {
        // User is signed in
        console.log('User is signed in:', user);
        document.querySelector('.username').textContent = user.displayName || user.email;
    } else {
        // User is signed out
        console.log('User is signed out');
        window.location.href = 'login.html';
    }
});

// Sign out function
function signOut() {
    auth.signOut().then(() => {
        console.log('User signed out');
        window.location.href = 'login.html';
    }).catch((error) => {
        console.error('Sign out error:', error);
    });
}

