
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/common/buttons/button';
import Layout from '@/components/layout/Layout';

const NotFound = () => {
  const location = useLocation();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-32 flex flex-col items-center justify-center">
        <h1 className="text-6xl font-bold text-tamec-600 mb-4">404</h1>
        <p className="text-2xl font-semibold text-gray-800 mb-6">Page Not Found</p>
        <p className="text-gray-600 text-center mb-8 max-w-md">
          The page at <span className="font-medium">{location.pathname}</span> could not be found. It might have been moved or doesn't exist.
        </p>
        <div className="space-x-4">
          <Button className="bg-tamec-600 hover:bg-tamec-700" asChild>
            <a href="/">Return Home</a>
          </Button>
          <Button variant="outline" className="border-tamec-600 text-tamec-600" asChild>
            <a href="/contact">Contact Support</a>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
