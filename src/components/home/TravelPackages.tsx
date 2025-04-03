
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Calendar, Users, Clock } from 'lucide-react';

const packages = [
  {
    id: 1,
    title: 'Beach Getaway',
    description: 'Enjoy a relaxing week at stunning beach destinations with luxury accommodations.',
    price: '999',
    duration: '7 Days',
    groupSize: '2-10',
    features: [
      'Luxury beachfront accommodations',
      'Daily breakfast and dinner',
      'Guided local tours',
      'Airport transfers',
      'Water activities included',
    ],
    popular: true,
  },
  {
    id: 2,
    title: 'City Explorer',
    description: 'Discover the culture, cuisine, and hidden gems of iconic cities around the world.',
    price: '1,299',
    duration: '5 Days',
    groupSize: '2-15',
    features: [
      'Boutique hotel stay',
      'City tours with local guides',
      'Museum and attraction passes',
      'Transportation between sites',
      'Welcome dinner experience',
    ],
    popular: false,
  },
  {
    id: 3,
    title: 'Adventure Trek',
    description: 'Challenge yourself with exciting outdoor adventures in breathtaking landscapes.',
    price: '1,499',
    duration: '10 Days',
    groupSize: '4-12',
    features: [
      'Guided hiking expeditions',
      'Camping and outdoor meals',
      'Safety equipment provided',
      'Expert adventure guides',
      'Transportation to trail starts',
    ],
    popular: false,
  },
];

const TravelPackages = () => {
  return (
    <section className="py-16 bg-[#f8f8f8]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Popular Travel Packages</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            All-inclusive packages designed to give you the perfect travel experience without the hassle.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <Card 
              key={pkg.id} 
              className={`overflow-hidden h-full flex flex-col ${pkg.popular ? 'border-tamec-600 shadow-lg' : ''}`}
            >
              {pkg.popular && (
                <div className="bg-tamec-600 text-white text-center py-2 text-sm font-medium">
                  Most Popular
                </div>
              )}
              
              <CardContent className="p-6 flex-grow flex flex-col">
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-2">{pkg.title}</h3>
                  <p className="text-gray-600">{pkg.description}</p>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-1" />
                      <span className="text-sm">{pkg.duration}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="h-4 w-4 mr-1" />
                      <span className="text-sm">{pkg.groupSize} people</span>
                    </div>
                  </div>
                  
                  <ul className="space-y-2 mb-6">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-4 w-4 text-tamec-600 mr-2 mt-1" />
                        <span className="text-gray-600 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-auto">
                  <div className="flex items-baseline justify-center mb-4">
                    <span className="text-2xl font-bold text-tamec-600">${pkg.price}</span>
                    <span className="text-gray-600 ml-1">/ person</span>
                  </div>
                  
                  <Button 
                    className={`w-full ${pkg.popular ? 'bg-tamec-600 hover:bg-tamec-700' : 'bg-gray-700 hover:bg-gray-800'}`}
                  >
                    Book This Package
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TravelPackages;
