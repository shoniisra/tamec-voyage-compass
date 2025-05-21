
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { Tour } from '@/modules/tours/types/tour';
import { supabase } from '@/integrations/supabase/client';
import { CalendarIcon } from 'lucide-react';
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface TourBasicInfoFormProps {
  tourData: Partial<Tour>;
  onChange: (field: string, value: any) => void;
  errors: { [key: string]: string };
}

interface Aerolinea {
  id: number;
  nombre: string;
}

interface TerminosCondiciones {
  id: number;
  titulo: string;
}

const TourBasicInfoForm: React.FC<TourBasicInfoFormProps> = ({ tourData, onChange, errors }) => {
  const { language } = useLanguage();
  const [aerolineas, setAerolineas] = React.useState<Aerolinea[]>([]);
  const [terminos, setTerminos] = React.useState<TerminosCondiciones[]>([]);
  
  React.useEffect(() => {
    // Fetch aerolineas
    const fetchAerolineas = async () => {
      const { data, error } = await supabase
        .from('aerolineas')
        .select('id, nombre')
        .order('nombre');
      
      if (error) {
        console.error('Error loading airlines:', error);
      } else {
        setAerolineas(data || []);
      }
    };
    
    // Fetch terminos y condiciones
    const fetchTerminos = async () => {
      const { data, error } = await supabase
        .from('terminos_condiciones')
        .select('id, titulo')
        .order('titulo');
      
      if (error) {
        console.error('Error loading terms & conditions:', error);
      } else {
        setTerminos(data || []);
      }
    };
    
    fetchAerolineas();
    fetchTerminos();
  }, []);
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="titulo" className={errors.titulo ? "text-destructive" : ""}>
            {language === 'en' ? 'Title' : 'Título'} <span className="text-destructive">*</span>
          </Label>
          <Input
            id="titulo"
            value={tourData.titulo || ''}
            onChange={(e) => onChange('titulo', e.target.value)}
            className={errors.titulo ? "border-destructive" : ""}
          />
          {errors.titulo && (
            <p className="text-sm font-medium text-destructive">{errors.titulo}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            value={tourData.slug || ''}
            onChange={(e) => onChange('slug', e.target.value)}
            placeholder={language === 'en' ? 'Auto-generated from title' : 'Generado automáticamente del título'}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="descripcion">
          {language === 'en' ? 'Description' : 'Descripción'}
        </Label>
        <Textarea
          id="descripcion"
          value={tourData.descripcion || ''}
          onChange={(e) => onChange('descripcion', e.target.value)}
          rows={5}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="dias_duracion">
            {language === 'en' ? 'Duration (days)' : 'Duración (días)'}
          </Label>
          <Input
            id="dias_duracion"
            type="number"
            min={1}
            value={tourData.dias_duracion || 1}
            onChange={(e) => onChange('dias_duracion', parseInt(e.target.value))}
          />
        </div>
        
        <div className="space-y-2">
          <Label>
            {language === 'en' ? 'Publication Date' : 'Fecha de Publicación'}
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <div className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer">
                {tourData.fecha_publicacion ? (
                  format(new Date(tourData.fecha_publicacion), "PPP", {
                    locale: language === 'es' ? es : undefined,
                  })
                ) : (
                  <span className="text-muted-foreground">
                    {language === 'en' ? 'Pick a date' : 'Seleccionar fecha'}
                  </span>
                )}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={tourData.fecha_publicacion ? new Date(tourData.fecha_publicacion) : undefined}
                onSelect={(date) => onChange('fecha_publicacion', date ? format(date, 'yyyy-MM-dd') : null)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="space-y-2">
          <Label>
            {language === 'en' ? 'Expiry Date' : 'Fecha de Caducidad'}
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <div className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer">
                {tourData.fecha_caducidad ? (
                  format(new Date(tourData.fecha_caducidad), "PPP", {
                    locale: language === 'es' ? es : undefined,
                  })
                ) : (
                  <span className="text-muted-foreground">
                    {language === 'en' ? 'Pick a date' : 'Seleccionar fecha'}
                  </span>
                )}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={tourData.fecha_caducidad ? new Date(tourData.fecha_caducidad) : undefined}
                onSelect={(date) => onChange('fecha_caducidad', date ? format(date, 'yyyy-MM-dd') : null)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="aerolinea">
            {language === 'en' ? 'Airline' : 'Aerolínea'}
          </Label>
          <Select 
            value={tourData.aerolinea_id?.toString() || ''} 
            onValueChange={(value) => onChange('aerolinea_id', value ? parseInt(value) : null)}
          >
            <SelectTrigger>
              <SelectValue placeholder={language === 'en' ? 'Select an airline' : 'Seleccionar aerolínea'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">
                {language === 'en' ? '-- None --' : '-- Ninguna --'}
              </SelectItem>
              {aerolineas.map((aerolinea) => (
                <SelectItem key={aerolinea.id} value={aerolinea.id.toString()}>
                  {aerolinea.nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="terminos_condiciones_id">
            {language === 'en' ? 'Terms & Conditions' : 'Términos y Condiciones'}
          </Label>
          <Select 
            value={tourData.terminos_condiciones_id?.toString() || ''} 
            onValueChange={(value) => onChange('terminos_condiciones_id', value ? parseInt(value) : null)}
          >
            <SelectTrigger>
              <SelectValue placeholder={language === 'en' ? 'Select terms & conditions' : 'Seleccionar términos y condiciones'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">
                {language === 'en' ? '-- None --' : '-- Ninguno --'}
              </SelectItem>
              {terminos.map((termino) => (
                <SelectItem key={termino.id} value={termino.id.toString()}>
                  {termino.titulo}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="pdf_detalles_url">
          {language === 'en' ? 'PDF Details URL' : 'URL del PDF de Detalles'}
        </Label>
        <Input
          id="pdf_detalles_url"
          type="url"
          value={tourData.pdf_detalles_url || ''}
          onChange={(e) => onChange('pdf_detalles_url', e.target.value)}
          placeholder={language === 'en' ? 'https://example.com/tour-details.pdf' : 'https://ejemplo.com/detalles-tour.pdf'}
        />
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-2">
          <Label htmlFor="terminos_condiciones">
            {language === 'en' ? 'Custom Terms & Conditions' : 'Términos y Condiciones Personalizados'}
          </Label>
          <Textarea
            id="terminos_condiciones"
            value={tourData.terminos_condiciones || ''}
            onChange={(e) => onChange('terminos_condiciones', e.target.value)}
            rows={3}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="politicas_cancelacion">
            {language === 'en' ? 'Cancellation Policies' : 'Políticas de Cancelación'}
          </Label>
          <Textarea
            id="politicas_cancelacion"
            value={tourData.politicas_cancelacion || ''}
            onChange={(e) => onChange('politicas_cancelacion', e.target.value)}
            rows={3}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="coortesias">
            {language === 'en' ? 'Courtesies' : 'Cortesías'}
          </Label>
          <Textarea
            id="coortesias"
            value={tourData.coortesias || ''}
            onChange={(e) => onChange('coortesias', e.target.value)}
            rows={3}
          />
        </div>
      </div>
    </div>
  );
};

export default TourBasicInfoForm;
