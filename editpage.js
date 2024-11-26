const editProfileForm = document.getElementById('edit-profile-form');

// Load user data
auth.onAuthStateChanged(user => {
    if (user) {
        db.collection('users').doc(user.uid).get().then((doc) => {
            if (doc.exists) {
                const userData = doc.data();
                document.getElementById('name').value = userData.name || '';
                document.getElementById('username').value = userData.username || '';
                document.getElementById('email').value = userData.email || '';
                document.getElementById('bio').value = userData.bio || '';
            }
        });
    } else {
        window.location.href = 'login.html';
    }
});

// Update profile
editProfileForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (user) {
        const name = document.getElementById('name').value;
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const bio = document.getElementById('bio').value;
        const avatarFile = document.getElementById('avatar').files[0];

        let updatePromise;
        if (avatarFile) {
            const storageRef = storage.ref('avatars/' + user.uid);
            updatePromise = storageRef.put(avatarFile).then(() => {
                return storageRef.getDownloadURL();
            }).then((url) => {
                return db.collection('users').doc(user.uid).update({
                    name: name,
                    username: username,
                    email: email,
                    bio: bio,
                    avatar: url
                });
            });
        } else {
            updatePromise = db.collection('users').doc(user.uid).update({
                name: name,
                username: username,
                email: email,
                bio: bio
            });
        }

        updatePromise.then(() => {
            console.log('Profile updated successfully');
            window.location.href = 'main.html';
        }).catch((error) => {
            console.error('Error updating profile:', error);
        });
    }
});

