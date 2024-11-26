'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Post } from '@/lib/store';

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  posts: Post[];
  setPosts: (posts: Post[]) => void;
  refetchPosts: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  const refetchPosts = async () => {
    const res = await fetch('/api/posts');
    const newPosts = await res.json();
    setPosts(newPosts);
  };

  useEffect(() => {
    refetchPosts();
  }, []);

  return (
    <AppContext.Provider value={{ user, setUser, posts, setPosts, refetchPosts }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

