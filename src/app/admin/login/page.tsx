'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { setAuth } from '@/utils/auth';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (password === process.env.NEXT_PUBLIC_ADMIN_AUTH) {
        // Use the auth utility to set both localStorage and cookie
        setAuth(password);
        toast.success('Login successful');
        
        // Force a router refresh and then redirect
        router.refresh(); // This is important for Next.js to recognize the auth change
        setTimeout(() => {
          router.push('/admin');
        }, 100);
      } else {
        toast.error('Invalid password');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A1929] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated Background Gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-gradient-to-br from-primary/30 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/4 -left-1/4 w-[800px] h-[800px] bg-gradient-to-tr from-accent/20 to-transparent rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Content Container */}
      <div className="w-full max-w-md px-6 relative z-10">
        {/* Logo */}
        <div className="mb-12 text-center">
          <div className="relative w-24 h-24 mx-auto mb-6 drop-shadow-2xl">
            <Image
              src="/images/logo.png"
              alt="Mocky Digital Logo"
              fill
              className="object-contain animate-float"
              priority
            />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
            Admin Portal
          </h1>
          <p className="text-gray-400">
            Enter your credentials to continue
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/10 transform transition-all hover:scale-[1.01]">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative group">
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white
                    placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent
                    transition-all duration-200 group-hover:border-white/20"
                  placeholder="Enter admin password"
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <i className="fas fa-lock text-gray-500 group-hover:text-gray-400 transition-colors"></i>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center px-6 py-3 border border-transparent text-base
                font-medium rounded-lg text-white bg-primary hover:bg-primary/90 focus:outline-none 
                focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed
                transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Authenticating...
                </div>
              ) : (
                'Access Dashboard'
              )}
            </button>
          </form>
        </div>

        {/* Back Link */}
        <div className="mt-8 text-center">
          <a
            href="/"
            className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors duration-200"
          >
            <i className="fas fa-arrow-left mr-2 transform group-hover:-translate-x-1 transition-transform"></i>
            Return to website
          </a>
        </div>
      </div>
    </div>
  );
} 