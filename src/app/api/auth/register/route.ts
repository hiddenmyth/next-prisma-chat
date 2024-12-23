import { createUser } from '@/actions/auth';
import { ZSignUpForm } from '@/types/auth';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const payload = ZSignUpForm.safeParse(body);
  if (!payload.success) {
    return NextResponse.json(
      {
        status: 400,
        error: payload.error,
      },
      {
        status: 400,
      },
    );
  }
  try {
    const result = await createUser(payload.data);
    return NextResponse.json({
      status: 200,
      body: result,
    });
  } catch (error) {
    console.error(error);
    if (error instanceof PrismaClientKnownRequestError) {
      return NextResponse.json(
        {
          status: 400,
          error: error.code === 'P2002' ? 'Email already exists' : error.message,
        },
        {
          status: 400,
        },
      );
    } else if (error instanceof Error) {
      return NextResponse.json(
        {
          status: 500,
          error: error.message,
        },
        {
          status: 500,
        },
      );
    } else {
      return NextResponse.json(
        {
          status: 500,
          error: 'Unknown Error',
        },
        {
          status: 500,
        },
      );
    }
  }
}
