'use server';

import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt-edge';
import { TSignInForm, TSignUpForm } from '@/types/auth';

export const getUser = async (email: TSignInForm['email']) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  return user;
};

export const createUser = async (data: TSignUpForm) => {
  const user = await prisma.user.create({
    data: {
      email: data.email,
      name: data.name,
      password: bcrypt.hashSync(data.password, 12),
    },
  });
  return user;
};
