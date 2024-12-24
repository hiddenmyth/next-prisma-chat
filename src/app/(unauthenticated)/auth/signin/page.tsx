'use client';

import Image from 'next/image';
import { Icon } from '@iconify/react/dist/iconify.js';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import authConfig from '@/auth.config';
import { Spinner } from '@nextui-org/spinner';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import { useForm, Controller, Form } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TSignInForm, ZSignInForm } from '@/types/auth';
import { useEffect, useMemo } from 'react';
import { Alert } from '@nextui-org/alert';
import { Divider } from '@nextui-org/divider';

export default function SignInPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo =
    searchParams && searchParams.has('redirect')
      ? searchParams.get('redirect')
      : undefined;

  const {
    control,
    formState: { isSubmitting },
  } = useForm<TSignInForm>({
    mode: 'onChange',
    resolver: zodResolver(ZSignInForm),
  });

  const onSubmit = async (data: TSignInForm) => {
    return await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirectTo: redirectTo ?? '/dashboard',
    });
  };

  const errorMessage = useMemo(() => {
    if (searchParams && searchParams.has('error')) {
      const error = searchParams.get('error');
      if (error === 'CredentialsSignin') {
        return 'Invalid credentials';
      } else if (error === 'OAuthAccountNotLinked') {
        return 'Account not linked';
      }
    }
  }, [searchParams]);

  useEffect(() => {
    if (session && status === 'authenticated') router.push(redirectTo ?? '/dashboard');
  }, [searchParams, session, status, router, redirectTo]);

  if (status === 'loading') return <Spinner />;
  return (
    <div className="bg-background flex flex-col items-center justify-center gap-4 p-16 relative container m-auto">
      <Link href="/">
        <Icon icon={'solar:home-2-bold-duotone'} width={64} />
      </Link>
      <div className="flex justify-center text-4xl font-bold uppercase">Sign In</div>
      <div className="flex flex-col gap-4 max-w-sm relative container m-auto">
        {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
        <Form
          control={control}
          className="flex flex-col gap-4 w-full relative container m-auto"
          onSubmit={async ({ data }) => await onSubmit(data)}
        >
          <Controller
            control={control}
            name="email"
            render={({ field, fieldState }) => (
              <Input
                {...field}
                label="Email"
                errorMessage={fieldState.error?.message}
                isInvalid={fieldState.invalid}
                suppressHydrationWarning
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
                errorMessage={fieldState.error?.message}
                isInvalid={fieldState.invalid}
                suppressHydrationWarning
              />
            )}
          />
          <Button type="submit" color="success" isLoading={isSubmitting}>
            Submit
          </Button>
        </Form>
        <div className="w-full flex gap-2 items-center justify-center">
          <Divider className="flex-1" />
          <span className="text-sm">Or Sign In With</span>
          <Divider className="flex-1" />
        </div>
        {authConfig.providers.map((provider) =>
          provider.id !== 'credentials' ? (
            <Button
              onClick={async () => {
                signIn(provider.id, {
                  redirectTo: redirectTo ?? '/dashboard',
                });
              }}
              key={provider.id}
              variant="faded"
              color="default"
            >
              <Image
                src={`https://authjs.dev/img/providers/${provider.id}.svg`}
                width={30}
                height={30}
                alt={provider.id}
              />
              {provider.name}
            </Button>
          ) : null,
        )}
      </div>
      <p>
        Don&apos;t have an account?{' '}
        <Link href="/auth/signup" className="text-primary">
          Sign Up
        </Link>{' '}
        here
      </p>
    </div>
  );
}
