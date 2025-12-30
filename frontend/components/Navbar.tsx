import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/10 dark:bg-black/20 backdrop-blur-lg border-b border-white/20 dark:border-white/10 shadow-sm">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link href="/" className="text-2xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 hover:opacity-80 transition drop-shadow-sm">
          Lumina
        </Link>
        <div className="space-x-4">
          <Link href="/" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition font-medium">
            Home
          </Link>
          <Link href="/write" className="bg-white/20 hover:bg-white/30 text-blue-600 dark:text-blue-300 dark:bg-white/10 dark:hover:bg-white/20 px-4 py-2 rounded-full border border-white/30 backdrop-blur-md transition shadow-sm font-semibold">
            Write
          </Link>
        </div>
      </div>
    </nav>
  );
}
