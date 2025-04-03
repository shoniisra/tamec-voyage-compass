
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const NewsletterSection = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally handle the newsletter subscription
    toast.success('Thank you for subscribing to our newsletter!');
  };
  
  return (
    <section className="py-16 bg-gray-50 hero-pattern">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Join Our Travel Community</h2>
          <p className="text-gray-600 mb-8">
            Subscribe to our newsletter and get exclusive travel tips, special offers, and inspiration for your next adventure.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3 max-w-lg mx-auto">
            <Input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-grow"
              required
            />
            <Button type="submit" className="bg-tamec-600 hover:bg-tamec-700">
              Subscribe
            </Button>
          </form>
          
          <p className="text-gray-500 text-xs mt-4">
            By subscribing, you agree to our privacy policy and consent to receive updates from our company.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
