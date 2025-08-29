'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { type GoogleFormData, googleFormSchema } from '@/lib/validations/google-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export function GoogleForm() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<GoogleFormData>({
    resolver: zodResolver(googleFormSchema),
    defaultValues: {
      name: '',
      place: '',
      hobi: '',
    },
  });

  const onSubmit = async (data: GoogleFormData) => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Submission failed');
      }

      toast.success('Form submitted successfully!');
      form.reset();
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error(error instanceof Error ? error.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-foreground">Submit Your Information</h1>
        <p className="text-muted-foreground mt-2">Please fill out all the required fields</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your name"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="place"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Place *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your place"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="hobi"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hobi *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your hobi"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Submit Form'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
