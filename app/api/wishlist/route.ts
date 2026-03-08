import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

const DB_NAME = 'tokentrim';
const COLLECTION = 'wishlist';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, providers, pain_point } = body;
    console.log(body);

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'A valid email is required.' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const collection = client.db(DB_NAME).collection(COLLECTION);

    const existing = await collection.findOne({
      email: { $regex: new RegExp(`^${email}$`, 'i') },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'This email is already on the wishlist!' },
        { status: 409 }
      );
    }

    const newEntry = {
      email,
      providers: providers || [],
      pain_point: pain_point || '',
      created_at: new Date(),
    };

    await collection.insertOne(newEntry);

    return NextResponse.json(
      { message: 'Successfully joined the wishlist!', data: newEntry },
      { status: 201 }
    );
  } catch (err) {
    console.error('Wishlist POST error:', err);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.', details: String(err) },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const client = await clientPromise;
    const collection = client.db(DB_NAME).collection(COLLECTION);

    const entries = await collection
      .find({})
      .sort({ created_at: -1 })
      .toArray();

    return NextResponse.json({ count: entries.length, entries });
  } catch (err) {
    console.error('Wishlist GET error:', err);
    return NextResponse.json(
      { error: 'Failed to fetch entries.', details: String(err) },
      { status: 500 }
    );
  }
}
