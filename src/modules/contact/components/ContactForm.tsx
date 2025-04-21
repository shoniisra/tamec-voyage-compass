
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { ContactFormData } from '../types';

const ContactForm = () => {
  const { t } = useLanguage();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>();
  
  const onSubmit = async (data: ContactFormData) => {
    try {
      const { error } = await supabase
        .from('leads')
        .insert({
          name: data.name,
          email: data.email,
          phone: data.phone,
          message: data.message,
          status: 'New',
          source: 'Website Contact Form'
        });

      if (error) {
        console.error('Error submitting form:', error);
        if (error.code === '23505') {
          toast.error(t('contact.form.emailExists'));
        } else {
          toast.error(t('contact.form.submitError'));
        }
        return;
      }

      toast.success(t('contact.form.success'));
      reset();
    } catch (err) {
      console.error('Error submitting form:', err);
      toast.error(t('contact.form.submitError'));
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">{t('contact.form.fullName')}</Label>
          <Input 
            id="name" 
            placeholder={t('contact.form.namePlaceholder')}
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">{t('contact.form.email')}</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder={t('contact.form.emailPlaceholder')}
            {...register('email', { 
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="phone">{t('contact.form.phone')}</Label>
        <Input 
          id="phone" 
          placeholder={t('contact.form.phonePlaceholder')}
          {...register('phone')}
        />
        {errors.phone && (
          <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="message">{t('contact.form.message')}</Label>
        <Textarea 
          id="message" 
          placeholder={t('contact.form.messagePlaceholder')}
          rows={5}
          {...register('message', { required: 'Message is required' })}
        />
        {errors.message && (
          <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
        )}
      </div>
      
      <Button type="submit" className="bg-tamec-600 hover:bg-tamec-700 w-full sm:w-auto">
        {t('contact.form.submit')}
      </Button>
    </form>
  );
};

export default ContactForm;
