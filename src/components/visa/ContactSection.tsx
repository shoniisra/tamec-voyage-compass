
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { MessageSquare, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const ContactSection = () => {
  const { language } = useLanguage();
  
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'en' ? 'Get Personalized Assistance' : 'Obtén Asistencia Personalizada'}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {language === 'en' 
              ? 'Have questions about the visa process or ready to get started? Contact us for expert guidance tailored to your specific situation.' 
              : '¿Tienes preguntas sobre el proceso de visa o estás listo para comenzar? Contáctanos para obtener orientación experta adaptada a tu situación específica.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="p-6 border border-border">
              <h3 className="text-xl font-bold mb-4">
                {language === 'en' ? 'Send Us a Message' : 'Envíanos un Mensaje'}
              </h3>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                      {language === 'en' ? 'Full Name' : 'Nombre Completo'}
                    </label>
                    <Input 
                      id="name" 
                      placeholder={language === 'en' ? 'Your full name' : 'Tu nombre completo'} 
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      {language === 'en' ? 'Email Address' : 'Correo Electrónico'}
                    </label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder={language === 'en' ? 'Your email address' : 'Tu correo electrónico'} 
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-1">
                      {language === 'en' ? 'Phone Number' : 'Número de Teléfono'}
                    </label>
                    <Input 
                      id="phone" 
                      placeholder={language === 'en' ? 'Your phone number' : 'Tu número de teléfono'} 
                    />
                  </div>
                  <div>
                    <label htmlFor="visa-type" className="block text-sm font-medium mb-1">
                      {language === 'en' ? 'Visa Type' : 'Tipo de Visa'}
                    </label>
                    <select 
                      id="visa-type" 
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    >
                      <option value="">{language === 'en' ? 'Select a visa type' : 'Selecciona un tipo de visa'}</option>
                      <option value="tourist">{language === 'en' ? 'Tourist Visa' : 'Visa de Turismo'}</option>
                      <option value="student">{language === 'en' ? 'Student Visa' : 'Visa de Estudiante'}</option>
                      <option value="work">{language === 'en' ? 'Work Visa' : 'Visa de Trabajo'}</option>
                      <option value="business">{language === 'en' ? 'Business Visa' : 'Visa de Negocios'}</option>
                      <option value="transit">{language === 'en' ? 'Transit Visa' : 'Visa de Tránsito'}</option>
                      <option value="other">{language === 'en' ? 'Other' : 'Otro'}</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    {language === 'en' ? 'Your Message' : 'Tu Mensaje'}
                  </label>
                  <Textarea 
                    id="message" 
                    rows={5} 
                    placeholder={language === 'en' ? 'Please provide details about your visa needs or questions' : 'Por favor proporciona detalles sobre tus necesidades o preguntas de visa'} 
                  />
                </div>
                
                <Button className="w-full bg-tamec-600 hover:bg-tamec-700 text-white">
                  {language === 'en' ? 'Submit Inquiry' : 'Enviar Consulta'}
                </Button>
              </form>
            </Card>
          </div>
          
          <div>
            <div className="space-y-6">
              <Card className="p-6 border border-border">
                <div className="flex items-center mb-4">
                  <div className="p-2 rounded-full bg-tamec-50 dark:bg-tamec-900 mr-3">
                    <MessageSquare className="h-5 w-5 text-tamec-600" />
                  </div>
                  <h3 className="text-lg font-bold">
                    {language === 'en' ? 'Direct Contact' : 'Contacto Directo'}
                  </h3>
                </div>
                <div className="space-y-3">
                  <p className="text-sm">
                    <span className="font-medium">WhatsApp:</span> +1 (555) 123-4567
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">{language === 'en' ? 'Email' : 'Correo Electrónico'}:</span> visas@tamec.com
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">{language === 'en' ? 'Phone' : 'Teléfono'}:</span> +1 (555) 987-6543
                  </p>
                </div>
                <Button className="w-full mt-4" variant="outline">
                  {language === 'en' ? 'Send WhatsApp Message' : 'Enviar Mensaje de WhatsApp'}
                </Button>
              </Card>
              
              <Card className="p-6 border border-border">
                <div className="flex items-center mb-4">
                  <div className="p-2 rounded-full bg-tamec-50 dark:bg-tamec-900 mr-3">
                    <Calendar className="h-5 w-5 text-tamec-600" />
                  </div>
                  <h3 className="text-lg font-bold">
                    {language === 'en' ? 'Schedule a Consultation' : 'Agenda una Consulta'}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  {language === 'en'
                    ? 'Book a virtual or in-person consultation with one of our visa specialists.'
                    : 'Reserva una consulta virtual o presencial con uno de nuestros especialistas en visas.'}
                </p>
                <Button className="w-full">
                  {language === 'en' ? 'Book Appointment' : 'Reservar Cita'}
                </Button>
              </Card>
              
              <Card className="p-6 border border-border">
                <div className="flex items-center mb-4">
                  <div className="p-2 rounded-full bg-tamec-50 dark:bg-tamec-900 mr-3">
                    <Clock className="h-5 w-5 text-tamec-600" />
                  </div>
                  <h3 className="text-lg font-bold">
                    {language === 'en' ? 'Business Hours' : 'Horario de Atención'}
                  </h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>{language === 'en' ? 'Monday - Friday' : 'Lunes - Viernes'}:</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{language === 'en' ? 'Saturday' : 'Sábado'}:</span>
                    <span>10:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{language === 'en' ? 'Sunday' : 'Domingo'}:</span>
                    <span>{language === 'en' ? 'Closed' : 'Cerrado'}</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
