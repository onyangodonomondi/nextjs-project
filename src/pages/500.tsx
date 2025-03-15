import Link from 'next/link';

export default function Custom500() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-primary mb-4">500</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Server Error</h2>
        <p className="text-gray-600 mb-8">
          We're sorry, something went wrong on our server. 
          Our team has been notified and is working to fix the issue.
        </p>
        <Link href="/" className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors">
          Return Home
        </Link>
      </div>
    </div>
  );
} 