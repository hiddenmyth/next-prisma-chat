'use client';

import React, { useState } from 'react';
import DashboardPageWrapper from '@/components/layout/dashboard/DashboardPageWrapper';
import { Button } from '@nextui-org/button';
import { Input, Textarea } from '@nextui-org/input';
import { useRouter } from 'next/navigation';

const Draft: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { title, content };
      await fetch('/api/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      router.push('/dashboard/p/drafts');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DashboardPageWrapper>
      <form onSubmit={submitData} className="w-full flex flex-col gap-4">
        <h1>New Draft</h1>
        <Input
          autoFocus
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          type="text"
          value={title}
        />
        <Textarea
          cols={50}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          rows={8}
          value={content}
        />
        <Button type="submit" color="success" isDisabled={!content || !title}>
          Submit
        </Button>
        <Button type="reset" onClick={() => router.push('/')}>
          Cancel
        </Button>
      </form>
    </DashboardPageWrapper>
  );
};

export default Draft;
