import Link from 'next/link';
import Navbar from '@/components/Navbar';

interface Post {
  id: number;
  title: string;
  summary: string;
  tags: string;
  created_at: string;
}

// Force dynamic rendering to ensure fresh data
export const dynamic = 'force-dynamic';

async function getPosts() {
  try {
    const res = await fetch('http://127.0.0.1:8000/posts', {
      cache: 'no-store'
    });
    
    if (!res.ok) {
      return [];
    }
    
    return res.json() as Promise<Post[]>;
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return [];
  }
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <>
      <Navbar />
      <main className="container mx-auto p-6">
        <h1 className="text-4xl font-extrabold mb-8 text-gray-900 dark:text-white drop-shadow-sm text-center">Recent Posts</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link href={`/posts/${post.id}`} key={post.id} className="block group">
              <div className="bg-white/40 dark:bg-black/30 backdrop-blur-md border border-white/50 dark:border-white/10 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:bg-white/50 dark:hover:bg-black/40 transition duration-300 h-full flex flex-col transform hover:-translate-y-1">
                <h2 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-100 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition">
                  {post.title}
                </h2>
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.split(', ').map((tag, idx) => (
                    <span 
                      key={idx} 
                      className="bg-white/60 dark:bg-white/10 text-blue-800 dark:text-blue-200 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-white/40 dark:border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 flex-grow text-sm leading-relaxed font-medium">
                  {post.summary}
                </p>
                <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 font-mono">
                  {new Date(post.created_at).toLocaleDateString()}
                </div>
              </div>
            </Link>
          ))}
          {posts.length === 0 && (
            <div className="col-span-full text-center py-20 bg-white/30 dark:bg-black/20 backdrop-blur-md rounded-3xl border border-white/40 dark:border-white/10">
              <p className="text-xl text-gray-600 dark:text-gray-300 font-medium">No posts found. Write something!</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
