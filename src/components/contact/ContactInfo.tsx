
import React from 'react';
import { Mail, MapPinned, Phone, Clock } from 'lucide-react';

const ContactInfo = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
      <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
      
      <div className="space-y-6">
        <div className="flex items-start">
          <div className="bg-tamec-50 p-3 rounded-full mr-4">
            <MapPinned className="h-6 w-6 text-tamec-600" />
            
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-1">Our Location</h4>
            <p className="text-gray-600">
              123 Travel Street, Cityville<br />
              Travel State, 12345<br />
              United States
            </p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="bg-tamec-50 p-3 rounded-full mr-4">
            <Mail className="h-6 w-6 text-tamec-600" />
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-1">Email Us</h4>
            <p className="text-tamec-600 hover:underline">info@tamectravel.com</p>
            <p className="text-tamec-600 hover:underline">support@tamectravel.com</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="bg-tamec-50 p-3 rounded-full mr-4">
            <Phone className="h-6 w-6 text-tamec-600" />
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-1">Call Us</h4>
            <p className="text-gray-600">+1 (555) 123-4567</p>
            <p className="text-gray-600">+1 (555) 987-6543</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="bg-tamec-50 p-3 rounded-full mr-4">
            <Clock className="h-6 w-6 text-tamec-600" />
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-1">Office Hours</h4>
            <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
            <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
            <p className="text-gray-600">Sunday: Closed</p>
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <h4 className="font-semibold text-lg mb-3">Connect With Us</h4>
        <div className="flex space-x-4">
          <a 
            href="https://facebook.com" 
            className="bg-tamec-50 hover:bg-tamec-100 p-3 rounded-full transition-colors"
            aria-label="Facebook"
          >
            <svg className="h-5 w-5 text-tamec-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
            </svg>
          </a>
          
          <a 
            href="https://twitter.com" 
            className="bg-tamec-50 hover:bg-tamec-100 p-3 rounded-full transition-colors"
            aria-label="Twitter"
          >
            <svg className="h-5 w-5 text-tamec-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
            </svg>
          </a>
          
          <a 
            href="https://instagram.com" 
            className="bg-tamec-50 hover:bg-tamec-100 p-3 rounded-full transition-colors"
            aria-label="Instagram"
          >
            <svg className="h-5 w-5 text-tamec-600" fill="currentColor" viewBox="0 0 24 24">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
            </svg>
          </a>
          
          <a 
            href="https://linkedin.com" 
            className="bg-tamec-50 hover:bg-tamec-100 p-3 rounded-full transition-colors"
            aria-label="LinkedIn"
          >
            <svg className="h-5 w-5 text-tamec-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
