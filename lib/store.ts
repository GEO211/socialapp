export interface User {
    id: string;
    name: string;
    username: string;
    email: string;
    avatar: string;
  }
  
  export interface Post {
    id: string;
    userId: string;
    image: string;
    caption: string;
    timestamp: string;
    likes: string[];
    comments: Comment[];
  }
  
  export interface Comment {
    id: string;
    userId: string;
    content: string;
    timestamp: string;
  }
  
  let users: User[] = [
    {
      id: '1',
      name: 'JavaScript Mastery',
      username: '@JSMastery',
      email: 'jsmastery@example.com',
      avatar: '/placeholder.svg',
    },
    // Add more users as needed
  ];
  
  let posts: Post[] = [
    {
      id: '1',
      userId: '1',
      image: '/placeholder.svg?height=600&width=600',
      caption: 'Coding session in progress 💻 #WebDev',
      timestamp: new Date().toISOString(),
      likes: [],
      comments: [],
    },
    // Add more posts as needed
  ];
  
  export const store = {
    users,
    posts,
    addUser: (user: User) => {
      users.push(user);
    },
    addPost: (post: Post) => {
      posts.unshift(post);
    },
    addComment: (postId: string, comment: Comment) => {
      const post = posts.find(p => p.id === postId);
      if (post) {
        post.comments.push(comment);
      }
    },
    toggleLike: (postId: string, userId: string) => {
      const post = posts.find(p => p.id === postId);
      if (post) {
        const index = post.likes.indexOf(userId);
        if (index > -1) {
          post.likes.splice(index, 1);
        } else {
          post.likes.push(userId);
        }
      }
    },
  };
  
  