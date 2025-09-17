'use client';

import { useFormStatus } from 'react-dom';
import { Button } from './button';

export function SubmitButton({ children, pendingText }: { children: React.ReactNode; pendingText?: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" aria-disabled={pending} disabled={pending}>
      {pending ? (pendingText ?? 'Please wait...') : children}
    </Button>
  );
}


