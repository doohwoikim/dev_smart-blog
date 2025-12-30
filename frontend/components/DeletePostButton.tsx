'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function DeletePostButton({ id }: { id: number }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    setIsDeleting(true);
    try {
      await axios.delete(`http://localhost:8000/posts/${id}`);
      router.push('/');
      router.refresh(); // Refresh list on home page
    } catch (error) {
      console.error('Failed to delete post:', error);
      alert('Failed to delete post');
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="px-4 py-2 bg-red-100/50 dark:bg-red-900/30 text-red-600 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-lg font-semibold text-sm transition backdrop-blur-sm border border-red-500/10 hover:border-red-500/30 disabled:opacity-50"
    >
      {isDeleting ? 'Deleting...' : 'Delete Post'}
    </button>
  );
}
