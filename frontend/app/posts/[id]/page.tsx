import ReactMarkdown from 'react-markdown';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import DeletePostButton from '@/components/DeletePostButton';

// Force dynamic since we fetch fresh data
export const dynamic = 'force-dynamic';

interface Post {
  id: number;
  title: string;
  content: string;
  tags: string;
  created_at: string;
}

// Params type for dynamic route
interface Props {
  params: Promise<{ id: string }>;
}

async function getPost(id: string) {
  try {
    const res = await fetch(`http://127.0.0.1:8000/posts/${id}`, {
      cache: 'no-store'
    });
    
    if (!res.ok) {
      return null;
    }
    
    return res.json() as Promise<Post>;
  } catch (error) {
    return null;
  }
}

export default async function PostDetail({ params }: Props) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    return (
      <>
        <Navbar />
        <main className="container mx-auto p-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Post Not Found</h1>
          <Link href="/" className="text-blue-600 hover:underline">
            Back to Home
          </Link>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="container mx-auto p-6 flex justify-center">
        <div className="w-full max-w-4xl bg-white/40 dark:bg-black/30 backdrop-blur-xl border border-white/50 dark:border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="flex justify-between items-center mb-8">
            <Link href="/" className="px-4 py-2 bg-white/30 dark:bg-white/5 hover:bg-white/50 rounded-lg text-sm text-gray-700 dark:text-gray-300 font-medium transition backdrop-blur-sm border border-white/20">
              &larr; Back to Home
            </Link>
            <div className="flex gap-3 items-center">
              <Link 
                href={`/edit/${post.id}`}
                className="px-4 py-2 bg-blue-100/50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-lg font-semibold text-sm transition backdrop-blur-sm border border-white/10"
              >
                Edit
              </Link>
              <DeletePostButton id={post.id} />
            </div>
          </div>
          
          <article>
            <header className="mb-10 border-b border-gray-200/50 dark:border-white/10 pb-8">
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight tracking-tight drop-shadow-sm">{post.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <span className="text-gray-600 dark:text-gray-400 font-medium flex items-center gap-1">
                  📅 {new Date(post.created_at).toLocaleDateString()}
                </span>
                <div className="flex flex-wrap gap-2">
                  {post.tags.split(', ').map((tag, idx) => (
                    <span 
                      key={idx} 
                      className="bg-white/60 dark:bg-white/10 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-xs font-bold border border-white/40 dark:border-white/5 shadow-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </header>
            
            <div className="prose prose-lg md:prose-xl prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-gray-800 dark:prose-headings:text-gray-100 prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-code:bg-white/50 dark:prose-code:bg-white/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-pre:bg-gray-900/90 dark:prose-pre:bg-black/50 prose-pre:backdrop-blur-md prose-img:rounded-xl prose-img:shadow-lg">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>
          </article>
        </div>
      </main>
    </>
  );
}
