
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { TourFilterParams } from '@/modules/tours/types/tour';
import { 
  Form, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl 
} from '@/components/ui/form';
import { useDestinos } from '@/modules/tours/hooks/use-destinos';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

interface ToursFilterProps {
  onSubmit: (data: TourFilterParams) => void;
  initialValues?: TourFilterParams;
}

const ToursFilter: React.FC<ToursFilterProps> = ({ 
  onSubmit, 
  initialValues = {} 
}) => {
  const { language } = useLanguage();
  const { destinos } = useDestinos();
  
  const form = useForm<TourFilterParams>({
    defaultValues: {
      search: initialValues.search || '',
      destino_id: initialValues.destino_id || '',
      active: initialValues.active || ''
    }
  });

  const handleSubmit = (data: TourFilterParams) => {
    // Remove empty values
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== '')
    );
    onSubmit(filteredData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {language === 'en' ? 'Search' : 'Buscar'}
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder={language === 'en' ? 'Search by name...' : 'Buscar por nombre...'} 
                  {...field} 
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="destino_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {language === 'en' ? 'Destination' : 'Destino'}
              </FormLabel>
              <Select 
                value={field.value}
                onValueChange={field.onChange}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={language === 'en' ? 'All destinations' : 'Todos los destinos'} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="">
                    {language === 'en' ? 'All destinations' : 'Todos los destinos'}
                  </SelectItem>
                  {destinos.map((destino) => (
                    <SelectItem key={destino.id} value={destino.id.toString()}>
                      {destino.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="active"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {language === 'en' ? 'Status' : 'Estado'}
              </FormLabel>
              <Select 
                value={field.value}
                onValueChange={field.onChange}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={language === 'en' ? 'All statuses' : 'Todos los estados'} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="">
                    {language === 'en' ? 'All statuses' : 'Todos los estados'}
                  </SelectItem>
                  <SelectItem value="true">
                    {language === 'en' ? 'Active' : 'Activo'}
                  </SelectItem>
                  <SelectItem value="false">
                    {language === 'en' ? 'Inactive' : 'Inactivo'}
                  </SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit">
            {language === 'en' ? 'Apply Filters' : 'Aplicar Filtros'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ToursFilter;
