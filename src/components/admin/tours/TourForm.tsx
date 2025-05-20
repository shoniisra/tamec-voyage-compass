
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tour } from '@/modules/tours/types';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

interface TourFormProps {
  initialData?: Tour;
  onSubmit: (data: Tour) => void;
  isSubmitting: boolean;
}

const TourForm: React.FC<TourFormProps> = ({ initialData, onSubmit, isSubmitting }) => {
  const { language } = useLanguage();
  const [tab, setTab] = useState("general");
  
  // Initialize form with default values or initial data
  const form = useForm<Tour>({
    defaultValues: initialData || {
      titulo: '',
      descripcion: '',
      dias_duracion: 1,
      incluye_boleto_aereo: false,
      active: true,
      // Direct properties that were moved from componentes
      incluye_vuelo: false,
      incluye_hotel: false,
      incluye_transporte: false,
      incluye_hospedaje: false,
      incluye_comida: false,
      incluye_actividades: false,
      incluye_maleta_10: false,
      incluye_maleta_23: false,
      incluye_articulo_personal: false,
    },
  });

  // Handle form submission
  const handleSubmit = (values: Tour) => {
    try {
      onSubmit(values);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(language === 'en' ? "Error saving tour" : "Error al guardar el tour");
    }
  };

  // Update form if initialData changes
  useEffect(() => {
    if (initialData) {
      Object.keys(initialData).forEach((key) => {
        // @ts-ignore - dynamic property access
        if (initialData[key] !== undefined) {
          // @ts-ignore - dynamic property access
          form.setValue(key, initialData[key]);
        }
      });
    }
  }, [initialData, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="general">
              {language === 'en' ? 'General Information' : 'Información General'}
            </TabsTrigger>
            <TabsTrigger value="details">
              {language === 'en' ? 'Details' : 'Detalles'}
            </TabsTrigger>
            <TabsTrigger value="included">
              {language === 'en' ? 'Included Items' : 'Incluidos'}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            {/* General Information Tab */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === 'en' ? 'Tour Basic Information' : 'Información Básica del Tour'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Title */}
                <FormField
                  control={form.control}
                  name="titulo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{language === 'en' ? 'Title' : 'Título'}</FormLabel>
                      <FormControl>
                        <Input placeholder={language === 'en' ? 'Tour title' : 'Título del tour'} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Description */}
                <FormField
                  control={form.control}
                  name="descripcion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{language === 'en' ? 'Description' : 'Descripción'}</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder={language === 'en' ? 'Tour description' : 'Descripción del tour'} 
                          {...field} 
                          value={field.value || ''}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Duration */}
                <FormField
                  control={form.control}
                  name="dias_duracion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{language === 'en' ? 'Duration (days)' : 'Duración (días)'}</FormLabel>
                      <FormControl>
                        <Input type="number" min={1} {...field} onChange={e => field.onChange(parseInt(e.target.value) || 1)} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Status */}
                <FormField
                  control={form.control}
                  name="active"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          {language === 'en' ? 'Active' : 'Activo'}
                        </FormLabel>
                        <FormDescription>
                          {language === 'en' 
                            ? 'Enable this tour to be visible on the website' 
                            : 'Habilitar este tour para que sea visible en el sitio web'}
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="details">
            {/* More details tab content... */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === 'en' ? 'Tour Details' : 'Detalles del Tour'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Additional form fields can be added here */}
                <p className="text-muted-foreground">
                  {language === 'en' 
                    ? 'Additional tour details will be added here.' 
                    : 'Detalles adicionales del tour se añadirán aquí.'}
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="included">
            {/* Included components tab */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === 'en' ? 'Included Components' : 'Componentes Incluidos'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Flight */}
                  <FormField
                    control={form.control}
                    name="incluye_vuelo"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            {language === 'en' ? 'Flight' : 'Vuelo'}
                          </FormLabel>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  {/* Hotel */}
                  <FormField
                    control={form.control}
                    name="incluye_hotel"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            {language === 'en' ? 'Hotel' : 'Hotel'}
                          </FormLabel>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  {/* Transportation */}
                  <FormField
                    control={form.control}
                    name="incluye_transporte"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            {language === 'en' ? 'Transportation' : 'Transporte'}
                          </FormLabel>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  {/* Accommodation */}
                  <FormField
                    control={form.control}
                    name="incluye_hospedaje"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            {language === 'en' ? 'Accommodation' : 'Hospedaje'}
                          </FormLabel>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  {/* Food */}
                  <FormField
                    control={form.control}
                    name="incluye_comida"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            {language === 'en' ? 'Food' : 'Comida'}
                          </FormLabel>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  {/* Activities */}
                  <FormField
                    control={form.control}
                    name="incluye_actividades"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            {language === 'en' ? 'Activities' : 'Actividades'}
                          </FormLabel>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  {/* 10kg Luggage */}
                  <FormField
                    control={form.control}
                    name="incluye_maleta_10"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            {language === 'en' ? '10kg Luggage' : 'Maleta 10kg'}
                          </FormLabel>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  {/* 23kg Luggage */}
                  <FormField
                    control={form.control}
                    name="incluye_maleta_23"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            {language === 'en' ? '23kg Luggage' : 'Maleta 23kg'}
                          </FormLabel>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  {/* Personal Item */}
                  <FormField
                    control={form.control}
                    name="incluye_articulo_personal"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            {language === 'en' ? 'Personal Item' : 'Artículo Personal'}
                          </FormLabel>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* Form actions */}
        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <span>{language === 'en' ? 'Saving...' : 'Guardando...'}</span>
            ) : (
              <span>{language === 'en' ? 'Save Tour' : 'Guardar Tour'}</span>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TourForm;
