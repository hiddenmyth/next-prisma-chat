'use client';

import { TSignUpForm, ZSignUpForm } from '@/types/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Controller, Form, useForm } from 'react-hook-form';

export default function SignUpPage() {
  const router = useRouter();
  const {
    control,
    formState: { isSubmitting },
  } = useForm<TSignUpForm>({
    mode: 'onChange',
    resolver: zodResolver(ZSignUpForm),
  });
  const onSubmit = async (data: TSignUpForm) => {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      router.push('/auth/signin');
    }
  };
  return (
    <div className="bg-background flex flex-col items-center justify-center gap-4 p-16 relative container m-auto">
      <Link href="/">
        <Icon icon={'solar:home-2-bold-duotone'} width={64} />
      </Link>
      <div className="flex justify-center text-4xl font-bold uppercase">Sign UP</div>
      <div className="flex flex-col gap-4 max-w-sm relative container m-auto">
        <Form
          control={control}
          onSubmit={async ({ data }) => await onSubmit(data)}
          className="flex flex-col gap-4 w-full relative container m-auto"
        >
          <Controller
            control={control}
            name="email"
            render={({ field, fieldState }) => (
              <Input
                {...field}
                label="Email"
                isInvalid={fieldState.invalid}
                errorMessage={fieldState.error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="name"
            render={({ field, fieldState }) => (
              <Input
                {...field}
                label="Name"
                isInvalid={fieldState.invalid}
                errorMessage={fieldState.error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field, fieldState }) => (
              <Input
                {...field}
                label="Password"
                type="password"
                isInvalid={fieldState.invalid}
                errorMessage={fieldState.error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="passwordConfirmation"
            render={({ field, fieldState }) => (
              <Input
                {...field}
                label="Confirm Password"
                type="password"
                isInvalid={fieldState.invalid}
                errorMessage={fieldState.error?.message}
              />
            )}
          />
          <Button type="submit" color="success" isLoading={isSubmitting}>
            Submit
          </Button>
        </Form>
      </div>
      <p>
        Already have an account?{' '}
        <Link href="/auth/signin" className="text-primary">
          Sign In
        </Link>{' '}
        here
      </p>
    </div>
  );
}
