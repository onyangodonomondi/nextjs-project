import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Custom404() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the app router not-found page after a delay
    const timeout = setTimeout(() => {
      router.push('/not-found');
    }, 3000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you are looking for doesn't exist or has been moved.
          Redirecting you to our custom error page...
        </p>
        <Link href="/" className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors">
          Return Home
        </Link>
      </div>
    </div>
  );
} 