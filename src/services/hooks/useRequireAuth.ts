'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function useRequireAuth(redirectTo = '/auth/login') {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const token = localStorage.getItem('token');
    if (!token) {
      router.push(redirectTo); 
    }
  }, [router, redirectTo]);
}

export function useRedirectIfAuthenticated(redirectTo = '/tasks/my-tasks') {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const token = localStorage.getItem('token');
    if (token) {
      router.push(redirectTo);
    }
  }, [router, redirectTo]);
}
