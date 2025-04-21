import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTourManagement, useDestinos } from '@/modules/tours';
import { 
  Tour, 
  Destino, 
  Aerolinea, 
  Regalo, 
  Incluye, 
  TerminosCondiciones 
} from '@/modules/tours/types/tour';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useToast } from '@/components/ui/use-toast';
import { CalendarIcon, Trash2, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';

const formSchema = z.object({
  titulo: z.string().min(3, {
    message: 'Title must be at least 3 characters.',
  }),
  descripcion: z.string().optional(),
  dias_duracion: z.number().int().positive().optional(),
  incluye_boleto_aereo: z.boolean().default(false),
  pdf_detalles_url: z.string().optional(),
  fecha_publicacion: z.date().optional().nullable(),
  fecha_caducidad: z.date().optional().nullable(),
  coortesias: z.string().optional(),
  terminos_condiciones: z.string().optional(),
  politicas_cancelacion: z.string().optional(),
  slug: z.string().optional(),
  aerolinea_id: z.number().nullable().optional(),
  terminos_condiciones_id: z.number().nullable().optional(),
});

type TourFormProps = {
  tour?: Tour;
};

const TourForm = ({ tour }: TourFormProps) => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { createTour, updateTour, isLoading } = useTourManagement();
  const { destinos } = useDestinos();
  
  const [aerolineas, setAerolineas] = useState<Aerolinea[]>([]);
  const [regalosGenericos, setRegalosGenericos] = useState<Regalo[]>([]);
  const [incluyeGenericos, setIncluyeGenericos] = useState<Incluye[]>([]);
  const [terminosCondiciones, setTerminosCondiciones] = useState<TerminosCondiciones[]>([]);
  const [selectedDestinos, setSelectedDestinos] = useState<Destino[]>([]);
  const [selectedRegalos, setSelectedRegalos] = useState<Regalo[]>([]);
  const [selectedIncluye, setSelectedIncluye] = useState<Incluye[]>([]);
  const [salidas, setSalidas] = useState<Array<{
    fecha_salida: string | null;
    dias_duracion: number;
    cupos_disponibles: number | null;
  }>>([]);
  const [precios, setPrecios] = useState<Array<{
    ciudad_salida: string;
    tipo_habitacion: 'doble' | 'triple' | 'individual' | 'child';
    forma_pago: 'efectivo' | 'tarjeta';
    precio: number;
  }>>([]);
  const [componentes, setComponentes] = useState({
    incluye_vuelo: false,
    incluye_hotel: false,
    incluye_transporte: false,
    incluye_comida: false,
    incluye_actividades: false,
    incluye_maleta_10: false,
    incluye_maleta_23: false,
    incluye_articulo_personal: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titulo: '',
      descripcion: '',
      dias_duracion: undefined,
      incluye_boleto_aereo: false,
      pdf_detalles_url: '',
      fecha_publicacion: null,
      fecha_caducidad: null,
      coortesias: '',
      terminos_condiciones: '',
      politicas_cancelacion: '',
      slug: '',
      aerolinea_id: null,
      terminos_condiciones_id: null,
    },
  });
  
  useEffect(() => {
    const fetchReferenceData = async () => {
      try {
        const { data: aerolineasData, error: aerolineasError } = await supabase
          .from('aerolineas')
          .select('*')
          .order('nombre');
          
        if (aerolineasError) throw aerolineasError;
        setAerolineas(aerolineasData || []);
        
        const { data: regalosData, error: regalosError } = await supabase
          .from('regalos_genericos')
          .select('*')
          .order('nombre');
          
        if (regalosError) throw regalosError;
        setRegalosGenericos(regalosData || []);
        
        const { data: incluyeData, error: incluyeError } = await supabase
          .from('incluye_generico')
          .select('*')
          .order('nombre');
          
        if (incluyeError) throw incluyeError;
        setIncluyeGenericos(incluyeData || []);
        
        const { data: terminosData, error: terminosError } = await supabase
          .from('terminos_condiciones')
          .select('*')
          .order('titulo');
          
        if (terminosError) throw terminosError;
        setTerminosCondiciones(terminosData || []);
        
      } catch (error) {
        console.error('Error fetching reference data:', error);
        toast({
          variant: "destructive",
          title: "Error loading reference data",
          description: "Please try again later.",
        });
      }
    };
    
    fetchReferenceData();
  }, [toast]);
  
  useEffect(() => {
    if (tour) {
      form.reset({
        titulo: tour.titulo,
        descripcion: tour.descripcion || '',
        dias_duracion: tour.dias_duracion || undefined,
        incluye_boleto_aereo: tour.incluye_boleto_aereo || false,
        pdf_detalles_url: tour.pdf_detalles_url || '',
        fecha_publicacion: tour.fecha_publicacion ? new Date(tour.fecha_publicacion) : null,
        fecha_caducidad: tour.fecha_caducidad ? new Date(tour.fecha_caducidad) : null,
        coortesias: tour.coortesias || '',
        terminos_condiciones: tour.terminos_condiciones || '',
        politicas_cancelacion: tour.politicas_cancelacion || '',
        slug: tour.slug || '',
        aerolinea_id: tour.aerolinea_id,
        terminos_condiciones_id: tour.terminos_condiciones_id,
      });
      
      if (tour.destinos && tour.destinos.length > 0) {
        const destinos = tour.destinos
          .filter(td => td.destino)
          .map(td => td.destino!);
        setSelectedDestinos(destinos);
      }
      
      if (tour.regalos && tour.regalos.length > 0) {
        setSelectedRegalos(tour.regalos);
      }
      
      if (tour.incluye && tour.incluye.length > 0) {
        setSelectedIncluye(tour.incluye);
      }
      
      if (tour.salidas && tour.salidas.length > 0) {
        setSalidas(tour.salidas.map(salida => ({
          fecha_salida: salida.fecha_salida,
          dias_duracion: salida.dias_duracion,
          cupos_disponibles: salida.cupos_disponibles,
        })));
      }
      
      if (tour.salidas && tour.salidas.length > 0 && tour.salidas[0].precios) {
        setPrecios(tour.salidas[0].precios.map(precio => ({
          ciudad_salida: precio.ciudad_salida,
          tipo_habitacion: precio.tipo_habitacion as 'doble' | 'triple' | 'individual' | 'child',
          forma_pago: precio.forma_pago as 'efectivo' | 'tarjeta',
          precio: precio.precio,
        })));
      }
      
      if (tour.componentes) {
        setComponentes({
          incluye_vuelo: tour.componentes.incluye_vuelo,
          incluye_hotel: tour.componentes.incluye_hotel,
          incluye_transporte: tour.componentes.incluye_transporte,
          incluye_comida: tour.componentes.incluye_comida,
          incluye_actividades: tour.componentes.incluye_actividades,
          incluye_maleta_10: tour.componentes.incluye_maleta_10,
          incluye_maleta_23: tour.componentes.incluye_maleta_23,
          incluye_articulo_personal: tour.componentes.incluye_articulo_personal,
        });
      }
    }
  }, [tour, form]);
  
  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    
    try {
      const tourData = {
        ...data,
        aerolinea_id: data.aerolinea_id ? parseInt(data.aerolinea_id) : null,
        terminos_condiciones_id: data.terminos_condiciones_id ? parseInt(data.terminos_condiciones_id) : null,
      };
      
      const destinos = selectedDestinos.map((destino, index) => ({
        destino_id: destino.id,
        orden: index + 1,
      }));
      
      const regalos = selectedRegalos.map(regalo => ({
        regalo_id: regalo.id,
      }));
      
      const incluye = selectedIncluye.map(item => ({
        incluye_id: item.id,
      }));
      
      if (tour) {
        await updateTour(
          tour.id, 
          tourData, 
          destinos, 
          salidas, 
          precios, 
          componentes, 
          regalos
        );
        
        toast({
          title: language === 'en' ? "Tour Updated" : "Tour Actualizado",
          description: language === 'en' ? "The tour has been updated successfully." : "El tour ha sido actualizado con éxito.",
        });
      } else {
        const newTourId = await createTour(
          tourData, 
          destinos, 
          salidas, 
          precios, 
          componentes, 
          regalos
        );
        
        toast({
          title: language === 'en' ? "Tour Created" : "Tour Creado",
          description: language === 'en' ? "The tour has been created successfully." : "El tour ha sido creado con éxito.",
        });
        navigate(`/admin/tours/edit/${newTourId}`);
      }
    } catch (error: any) {
      console.error('Error saving tour:', error);
      toast({
        variant: "destructive",
        title: language === 'en' ? "Error Saving Tour" : "Error al Guardar el Tour",
        description: error.message || (language === 'en' ? "An error occurred while saving the tour." : "Ocurrió un error al guardar el tour."),
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const addDestino = (destinoId: number) => {
    const destino = destinos.find(d => d.id === destinoId);
    if (destino && !selectedDestinos.some(d => d.id === destinoId)) {
      setSelectedDestinos([...selectedDestinos, destino]);
    }
  };
  
  const removeDestino = (destinoId: number) => {
    setSelectedDestinos(selectedDestinos.filter(d => d.id !== destinoId));
  };
  
  const addRegalo = (regaloId: number) => {
    const regalo = regalosGenericos.find(r => r.id === regaloId);
    if (regalo && !selectedRegalos.some(r => r.id === regaloId)) {
      setSelectedRegalos([...selectedRegalos, regalo]);
    }
  };
  
  const removeRegalo = (regaloId: number) => {
    setSelectedRegalos(selectedRegalos.filter(r => r.id !== regaloId));
  };
  
  const addIncluye = (incluyeId: number) => {
    const incluye = incluyeGenericos.find(i => i.id === incluyeId);
    if (incluye && !selectedIncluye.some(i => i.id === incluyeId)) {
      setSelectedIncluye([...selectedIncluye, incluye]);
    }
  };
  
  const removeIncluye = (incluyeId: number) => {
    setSelectedIncluye(selectedIncluye.filter(i => i.id !== incluyeId));
  };
  
  const addSalida = () => {
    setSalidas([
      ...salidas,
      {
        fecha_salida: null,
        dias_duracion: form.getValues('dias_duracion') || 0,
        cupos_disponibles: 20,
      },
    ]);
  };
  
  const updateSalida = (index: number, field: string, value: any) => {
    const updatedSalidas = [...salidas];
    updatedSalidas[index] = {
      ...updatedSalidas[index],
      [field]: value,
    };
    setSalidas(updatedSalidas);
  };
  
  const removeSalida = (index: number) => {
    setSalidas(salidas.filter((_, i) => i !== index));
  };
  
  const addPrecio = () => {
    setPrecios([
      ...precios,
      {
        ciudad_salida: '',
        tipo_habitacion: 'doble',
        forma_pago: 'efectivo',
        precio: 0,
      },
    ]);
  };
  
  const updatePrecio = (index: number, field: string, value: any) => {
    const updatedPrecios = [...precios];
    updatedPrecios[index] = {
      ...updatedPrecios[index],
      [field]: value,
    };
    setPrecios(updatedPrecios);
  };
  
  const removePrecio = (index: number) => {
    setPrecios(precios.filter((_, i) => i !== index));
  };
  
  const updateComponente = (field: string, value: boolean) => {
    setComponentes({
      ...componentes,
      [field]: value,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <Tabs defaultValue="basic">
          <TabsList className="grid grid-cols-5 mb-4">
            <TabsTrigger value="basic">
              {language === 'en' ? 'Basic Info' : 'Info Básica'}
            </TabsTrigger>
            <TabsTrigger value="destinations">
              {language === 'en' ? 'Destinations' : 'Destinos'}
            </TabsTrigger>
            <TabsTrigger value="details">
              {language === 'en' ? 'Details & Inclusions' : 'Detalles e Inclusiones'}
            </TabsTrigger>
            <TabsTrigger value="departures">
              {language === 'en' ? 'Departures' : 'Salidas'}
            </TabsTrigger>
            <TabsTrigger value="prices">
              {language === 'en' ? 'Prices' : 'Precios'}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === 'en' ? 'Tour Basic Information' : 'Información Básica del Tour'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="titulo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{language === 'en' ? 'Title' : 'Título'}</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder={language === 'en' ? 'Tour title' : 'Título del tour'} 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        {language === 'en' 
                          ? 'The title of the tour as it will appear on the website.' 
                          : 'El título del tour tal como aparecerá en el sitio web.'}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
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
                          rows={5}
                        />
                      </FormControl>
                      <FormDescription>
                        {language === 'en' 
                          ? 'A detailed description of the tour.' 
                          : 'Una descripción detallada del tour.'}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="dias_duracion"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{language === 'en' ? 'Duration (days)' : 'Duración (días)'}</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            {...field}
                            onChange={e => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                            value={field.value || ''}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Slug</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="tour-slug" 
                            {...field} 
                            value={field.value || ''}
                          />
                        </FormControl>
                        <FormDescription>
                          {language === 'en' 
                            ? 'URL-friendly version of the title (e.g., "caribbean-cruise").' 
                            : 'Versión amigable para URL del título (ej. "crucero-caribe").'}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="fecha_publicacion"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>{language === 'en' ? 'Publication Date' : 'Fecha de Publicación'}</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={`w-full pl-3 text-left font-normal ${!field.value ? "text-muted-foreground" : ""}`}
                              >
                                {field.value ? (
                                  format(field.value, "PP", { locale: language === 'es' ? es : undefined })
                                ) : (
                                  <span>{language === 'en' ? 'Select date' : 'Seleccionar fecha'}</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value || undefined}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormDescription>
                          {language === 'en' 
                            ? 'When the tour will be published on the website.' 
                            : 'Cuándo será publicado el tour en el sitio web.'}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="fecha_caducidad"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>{language === 'en' ? 'Expiration Date' : 'Fecha de Caducidad'}</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={`w-full pl-3 text-left font-normal ${!field.value ? "text-muted-foreground" : ""}`}
                              >
                                {field.value ? (
                                  format(field.value, "PP", { locale: language === 'es' ? es : undefined })
                                ) : (
                                  <span>{language === 'en' ? 'Select date' : 'Seleccionar fecha'}</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value || undefined}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormDescription>
                          {language === 'en' 
                            ? 'When the tour will no longer be available on the website.' 
                            : 'Cuándo el tour ya no estará disponible en el sitio web.'}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="aerolinea_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{language === 'en' ? 'Airline' : 'Aerolínea'}</FormLabel>
                      <Select
                        onValueChange={(value) => field.onChange(parseInt(value))}
                        value={field.value?.toString() || ''}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={language === 'en' ? 'Select airline' : 'Seleccionar aerolínea'} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="0">
                            {language === 'en' ? '-- No airline --' : '-- Sin aerolínea --'}
                          </SelectItem>
                          {aerolineas.map((aerolinea) => (
                            <SelectItem key={aerolinea.id} value={aerolinea.id.toString()}>
                              {aerolinea.nombre} {aerolinea.codigo ? `(${aerolinea.codigo})` : ''}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="incluye_boleto_aereo"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>{language === 'en' ? 'Includes Flight Ticket' : 'Incluye Boleto Aéreo'}</FormLabel>
                        <FormDescription>
                          {language === 'en' 
                            ? 'Whether the tour includes flight tickets in the price.' 
                            : 'Si el tour incluye boletos aéreos en el precio.'}
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value || false}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="pdf_detalles_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{language === 'en' ? 'PDF Details URL' : 'URL del PDF de Detalles'}</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="https://example.com/tour-details.pdf" 
                          {...field} 
                          value={field.value || ''}
                        />
                      </FormControl>
                      <FormDescription>
                        {language === 'en' 
                          ? 'URL to a PDF with detailed information about the tour.' 
                          : 'URL a un PDF con información detallada sobre el tour.'}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="destinations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === 'en' ? 'Tour Destinations' : 'Destinos del Tour'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4 items-start md:items-end">
                  <div className="w-full md:w-3/4">
                    <Select onValueChange={(value) => value && addDestino(parseInt(value))}>
                      <SelectTrigger>
                        <SelectValue placeholder={language === 'en' ? 'Add destination' : 'Agregar destino'} />
                      </SelectTrigger>
                      <SelectContent>
                        {destinos
                          .filter(d => !selectedDestinos.some(sd => sd.id === d.id))
                          .map((destino) => (
                            <SelectItem key={destino.id} value={destino.id.toString()}>
                              {destino.pais} {destino.ciudad ? `- ${destino.ciudad}` : ''}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="border rounded-md">
                  {selectedDestinos.length > 0 ? (
                    <div className="divide-y">
                      {selectedDestinos.map((destino) => (
                        <div key={destino.id} className="flex justify-between items-center p-3">
                          <span>
                            {destino.pais} {destino.ciudad ? `- ${destino.ciudad}` : ''}
                          </span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeDestino(destino.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-muted-foreground">
                      {language === 'en' 
                        ? 'No destinations selected. Please add at least one destination.' 
                        : 'No hay destinos seleccionados. Por favor, añade al menos un destino.'}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="details" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === 'en' ? 'Components Included' : 'Componentes Incluidos'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>{language === 'en' ? 'Includes Flight' : 'Incluye Vuelo'}</FormLabel>
                    </div>
                    <Switch
                      checked={componentes.incluye_vuelo}
                      onCheckedChange={(checked) => updateComponente('incluye_vuelo', checked)}
                    />
                  </div>
                  
                  <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>{language === 'en' ? 'Includes Hotel' : 'Incluye Hotel'}</FormLabel>
                    </div>
                    <Switch
                      checked={componentes.incluye_hotel}
                      onCheckedChange={(checked) => updateComponente('incluye_hotel', checked)}
                    />
                  </div>
                  
                  <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>{language === 'en' ? 'Includes Transportation' : 'Incluye Transporte'}</FormLabel>
                    </div>
                    <Switch
                      checked={componentes.incluye_transporte}
                      onCheckedChange={(checked) => updateComponente('incluye_transporte', checked)}
                    />
                  </div>
                  
                  <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>{language === 'en' ? 'Includes Food' : 'Incluye Comida'}</FormLabel>
                    </div>
                    <Switch
                      checked={componentes.incluye_comida}
                      onCheckedChange={(checked) => updateComponente('incluye_comida', checked)}
                    />
                  </div>
                  
                  <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>{language === 'en' ? 'Includes Activities' : 'Incluye Actividades'}</FormLabel>
                    </div>
                    <Switch
                      checked={componentes.incluye_actividades}
                      onCheckedChange={(checked) => updateComponente('incluye_actividades', checked)}
                    />
                  </div>
                  
                  <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>{language === 'en' ? 'Includes 10kg Baggage' : 'Incluye Maleta 10kg'}</FormLabel>
                    </div>
                    <Switch
                      checked={componentes.incluye_maleta_10}
                      onCheckedChange={(checked) => updateComponente('incluye_maleta_10', checked)}
                    />
                  </div>
                  <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>{language === 'en' ? 'Includes 23kg Baggage' : 'Incluye Maleta 23kg'}</FormLabel>
                    </div>
                    <Switch
                      checked={componentes.incluye_maleta_23}
                      onCheckedChange={(checked) => updateComponente('incluye_maleta_23', checked)}
                    />
                  </div>
                  
                  <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>{language === 'en' ? 'Includes Personal Item' : 'Incluye Artículo Personal'}</FormLabel>
                    </div>
                    <Switch
                      checked={componentes.incluye_articulo_personal}
                      onCheckedChange={(checked) => updateComponente('incluye_articulo_personal', checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === 'en' ? 'Included Items' : 'Ítems Incluidos'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4 items-start md:items-end">
                  <div className="w-full md:w-3/4">
                    <Select onValueChange={(value) => value && addIncluye(parseInt(value))}>
                      <SelectTrigger>
                        <SelectValue placeholder={language === 'en' ? 'Add included item' : 'Agregar ítem incluido'} />
                      </SelectTrigger>
                      <SelectContent>
                        {incluyeGenericos
                          .filter(i
