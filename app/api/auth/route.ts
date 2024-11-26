import { NextResponse } from 'next/server';
import { store, User } from '@/lib/store';

export async function POST(request: Request) {
  const { email, password } = await request.json();
  const user = store.users.find(u => u.email === email);
  
  if (user) {
    // In a real app, you'd check the password here
    return NextResponse.json({ user });
  } else {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
}

