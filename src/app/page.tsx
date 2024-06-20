'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation'

import { useAuth } from 'contexts/AuthContext';

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/sign-in');
    } else if (user) {
      if (user.is_staff_user) {
        router.push('/admin/default');
      } else if (user.is_learner) {
        router.push('/course');
      }
    }
  }, [isAuthenticated, user, router]);

  return null;
}