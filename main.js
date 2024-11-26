// DOM Elements
const postsContainer = document.getElementById('posts-container');
const createPostBtn = document.getElementById('create-post-btn');
const createPostModal = document.getElementById('create-post-modal');
const createPostForm = document.getElementById('create-post-form');
const topCreatorsList = document.getElementById('top-creators-list');

// Event Listeners
createPostBtn.addEventListener('click', () => createPostModal.style.display = 'block');
createPostForm.addEventListener('submit', createPost);
window.addEventListener('click', (event) => {
    if (event.target == createPostModal) {
        createPostModal.style.display = 'none';
    }
});

// Load posts
function loadPosts() {
    db.collection('posts').orderBy('timestamp', 'desc').get().then((snapshot) => {
        postsContainer.innerHTML = '';
        snapshot.forEach((doc) => {
            const post = doc.data();
            const postElement = createPostElement(doc.id, post);
            postsContainer.appendChild(postElement);
        });
    });
}

// Create post element
function createPostElement(id, post) {
    const postDiv = document.createElement('div');
    postDiv.className = 'post';
    postDiv.innerHTML = `
        <div class="post-header">
            <img src="${post.userAvatar || 'default-avatar.png'}" alt="${post.username}">
            <span>${post.username}</span>
        </div>
        <div class="post-image">
            <img src="${post.imageUrl}" alt="Post image">
        </div>
        <div class="post-actions">
            <button class="like-btn" data-id="${id}">❤️ ${post.likes}</button>
            <button class="comment-btn" data-id="${id}">💬 Comment</button>
        </div>
        <div class="post-caption">${post.caption}</div>
        <div class="comments-section">
            ${post.comments.map(comment => `
                <div class="comment">
                    <strong>${comment.username}:</strong> ${comment.text}
                </div>
            `).join('')}
            <form class="comment-form" data-id="${id}">
                <input type="text" placeholder="Add a comment..." required>
                <button type="submit">Post</button>
            </form>
        </div>
    `;

    // Add event listeners for like and comment
    postDiv.querySelector('.like-btn').addEventListener('click', () => likePost(id));
    postDiv.querySelector('.comment-form').addEventListener('submit', (e) => {
        e.preventDefault();
        addComment(id, e.target.querySelector('input').value);
    });

    return postDiv;
}

// Create post
function createPost(e) {
    e.preventDefault();
    const file = e.target.querySelector('input[type="file"]').files[0];
    const caption = e.target.querySelector('textarea').value;

    if (file && caption) {
        const storageRef = storage.ref('posts/' + file.name);
        storageRef.put(file).then(() => {
            return storageRef.getDownloadURL();
        }).then((url) => {
            return db.collection('posts').add({
                username: auth.currentUser.displayName || auth.currentUser.email,
                userAvatar: auth.currentUser.photoURL,
                imageUrl: url,
                caption: caption,
                likes: 0,
                comments: [],
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
        }).then(() => {
            createPostModal.style.display = 'none';
            createPostForm.reset();
            loadPosts();
        }).catch((error) => {
            console.error('Error creating post:', error);
        });
    }
}

// Like post
function likePost(id) {
    db.collection('posts').doc(id).update({
        likes: firebase.firestore.FieldValue.increment(1)
    }).then(() => {
        loadPosts();
    }).catch((error) => {
        console.error('Error liking post:', error);
    });
}

// Add comment
function addComment(id, text) {
    db.collection('posts').doc(id).update({
        comments: firebase.firestore.FieldValue.arrayUnion({
            username: auth.currentUser.displayName || auth.currentUser.email,
            text: text
        })
    }).then(() => {
        loadPosts();
    }).catch((error) => {
        console.error('Error adding comment:', error);
    });
}

// Load top creators
function loadTopCreators() {
    db.collection('users').orderBy('followers', 'desc').limit(5).get().then((snapshot) => {
        topCreatorsList.innerHTML = '';
        snapshot.forEach((doc) => {
            const user = doc.data();
            const li = document.createElement('li');
            li.innerHTML = `
                <img src="${user.avatar || 'default-avatar.png'}" alt="${user.username}">
                <span>${user.username}</span>
                <button class="follow-btn" data-id="${doc.id}">Follow</button>
            `;
            topCreatorsList.appendChild(li);
});
    });
}

// Initialize
loadPosts();
loadTopCreators();

