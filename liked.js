const likedPostsContainer = document.getElementById('liked-posts-container');

// Load liked posts
auth.onAuthStateChanged(user => {
    if (user) {
        db.collection('users').doc(user.uid).collection('likedPosts').get().then((snapshot) => {
            likedPostsContainer.innerHTML = '';
            snapshot.forEach((doc) => {
                const postId = doc.id;
                db.collection('posts').doc(postId).get().then((postDoc) => {
                    if (postDoc.exists) {
                        const post = postDoc.data();
                        const postElement = createPostElement(postId, post);
                        likedPostsContainer.appendChild(postElement);
                    }
                });
            });
        });
    } else {
        window.location.href = 'login.html';
    }
});

// Create post element (same as in main.js)
function createPostElement(id, post) {
    // ... (same implementation as in main.js)
}

