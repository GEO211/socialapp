import { NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const { userId } = await request.json();
  store.toggleLike(params.id, userId);
  const post = store.posts.find(p => p.id === params.id);
  return NextResponse.json(post);
}

