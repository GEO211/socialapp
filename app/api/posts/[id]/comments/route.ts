import { NextResponse } from 'next/server';
import { store, Comment } from '@/lib/store';

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const comment: Comment = await request.json();
  store.addComment(params.id, comment);
  const post = store.posts.find(p => p.id === params.id);
  return NextResponse.json(post);
}

