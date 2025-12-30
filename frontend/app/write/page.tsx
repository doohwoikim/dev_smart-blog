'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

export default function WritePage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.post('http://localhost:8000/posts', {
        title,
        content,
        tags: "", // Backend handles tags
      });
      router.push('/');
    } catch (error) {
      console.error("Failed to create post:", error);
      alert("Failed to create post. Check console.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="container mx-auto p-6 flex justify-center">
        <div className="w-full max-w-2xl bg-white/40 dark:bg-black/30 backdrop-blur-xl border border-white/50 dark:border-white/10 rounded-3xl p-8 shadow-2xl">
          <h1 className="text-3xl font-extrabold mb-8 text-gray-900 dark:text-white text-center">Write New Post</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                Title
              </label>
              <input
                type="text"
                id="title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-5 py-3 bg-white/50 dark:bg-black/20 border border-white/40 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 focus:bg-white/70 dark:focus:bg-black/40 outline-none transition text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 shadow-inner"
                placeholder="Enter an engaging title..."
              />
            </div>
            <div>
              <label htmlFor="content" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                Content (Markdown)
              </label>
              <textarea
                id="content"
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={12}
                className="w-full px-5 py-3 bg-white/50 dark:bg-black/20 border border-white/40 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 focus:bg-white/70 dark:focus:bg-black/40 outline-none transition text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 shadow-inner resize-y font-mono text-sm leading-relaxed"
                placeholder="Write your markdown content here..."
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg hover:scale-[1.01] transition-all transform active:scale-[0.99] ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Publishing...' : 'Publish Post'}
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
