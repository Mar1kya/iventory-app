import Link from 'next/link';
 
export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-2">
      <h2 className="text-3xl font-semibold">404 Not Found</h2>
      <p className='text-lg'>The requested page could not be found.</p>
      <Link
        href=".."
        className="mt-4 rounded-md bg-black px-4 py-2 text-sm text-white transition-colors hover:bg-gray-800"
      >
        Go Back
      </Link>
    </main>
  );
}