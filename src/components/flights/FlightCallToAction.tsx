
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from 'lucide-react';

const FlightCallToAction = () => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    destination: '',
    dates: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send this data to your backend or email service
    alert(language === 'en' 
      ? 'Thank you! We will contact you shortly about your flight request.' 
      : '¡Gracias! Nos pondremos en contacto contigo pronto acerca de tu solicitud de vuelo.');
    
    setFormData({
      name: '',
      email: '',
      destination: '',
      dates: '',
      message: ''
    });
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="bg-tamec-600 text-white rounded-lg overflow-hidden shadow-xl">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-4">
                {language === 'en' ? 'Ready to Fly?' : '¿Listo para volar?'}
              </h2>
              <p className="mb-6 text-tamec-50">
                {language === 'en'
                  ? 'Fill out the form and we\'ll help you find the perfect flight for your needs.'
                  : 'Completa el formulario y te ayudaremos a encontrar el vuelo perfecto para tus necesidades.'}
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    type="text"
                    name="name"
                    placeholder={language === 'en' ? 'Your Name' : 'Tu Nombre'}
                    className="bg-white/10 border-tamec-400 placeholder:text-tamec-100 text-white"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    name="email"
                    placeholder={language === 'en' ? 'Your Email' : 'Tu Correo Electrónico'}
                    className="bg-white/10 border-tamec-400 placeholder:text-tamec-100 text-white"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Input
                    type="text"
                    name="destination"
                    placeholder={language === 'en' ? 'Destination' : 'Destino'}
                    className="bg-white/10 border-tamec-400 placeholder:text-tamec-100 text-white"
                    value={formData.destination}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="relative">
                  <Input
                    type="text"
                    name="dates"
                    placeholder={language === 'en' ? 'Tentative Dates' : 'Fechas Tentativas'}
                    className="bg-white/10 border-tamec-400 placeholder:text-tamec-100 text-white pl-10"
                    value={formData.dates}
                    onChange={handleChange}
                  />
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-tamec-100" />
                </div>
                <div>
                  <Textarea
                    name="message"
                    placeholder={language === 'en' ? 'Additional Details (preferences, special requests, etc.)' : 'Detalles Adicionales (preferencias, solicitudes especiales, etc.)'}
                    className="bg-white/10 border-tamec-400 placeholder:text-tamec-100 text-white"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                  />
                </div>
                <div>
                  <Button 
                    type="submit" 
                    className="w-full bg-white text-tamec-600 hover:bg-tamec-50"
                  >
                    {language === 'en' ? 'Request Your Flight' : 'Solicita tu Vuelo'}
                  </Button>
                </div>
              </form>
            </div>
            
            <div className="md:w-1/2 bg-tamec-700 flex items-center justify-center relative overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1500&q=80" 
                alt="Flying"
                className="w-full h-full object-cover opacity-50"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-tamec-700/80 to-transparent"></div>
              <div className="absolute left-8 md:left-12 max-w-xs text-white">
                <blockquote className="italic text-lg mb-4">
                  {language === 'en'
                    ? '"The team found me a flight that was $300 cheaper than what I found online, with better layover times!"'
                    : '"¡El equipo me encontró un vuelo que era $300 más barato que lo que encontré en línea, con mejores tiempos de escala!"'}
                </blockquote>
                <p className="font-semibold">
                  {language === 'en' ? '- Carlos R.' : '- Carlos R.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlightCallToAction;
