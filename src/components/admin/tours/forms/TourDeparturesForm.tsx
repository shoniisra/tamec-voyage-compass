
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CalendarIcon, Plus, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface TourDeparturesFormProps {
  salidas: Array<{
    fecha_salida: string | null;
    dias_duracion: number;
    cupos_disponibles: number | null;
  }>;
  setSalidas: React.Dispatch<React.SetStateAction<Array<{
    fecha_salida: string | null;
    dias_duracion: number;
    cupos_disponibles: number | null;
  }>>>;
  tourDuration: number;
}

const TourDeparturesForm: React.FC<TourDeparturesFormProps> = ({ 
  salidas, 
  setSalidas,
  tourDuration
}) => {
  const { language } = useLanguage();
  const [newSalida, setNewSalida] = useState<{
    fecha_salida: string | null;
    dias_duracion: number;
    cupos_disponibles: number | null;
  }>({
    fecha_salida: null,
    dias_duracion: tourDuration,
    cupos_disponibles: 20
  });
  
  const handleAddSalida = () => {
    setSalidas([...salidas, { ...newSalida }]);
    setNewSalida({
      fecha_salida: null,
      dias_duracion: tourDuration,
      cupos_disponibles: 20
    });
  };
  
  const handleRemoveSalida = (index: number) => {
    const newSalidas = [...salidas];
    newSalidas.splice(index, 1);
    setSalidas(newSalidas);
  };
  
  const handleSelectDate = (date: Date | undefined) => {
    setNewSalida({
      ...newSalida,
      fecha_salida: date ? format(date, 'yyyy-MM-dd') : null
    });
  };
  
  const canAddSalida = !!newSalida.fecha_salida && 
                      newSalida.dias_duracion > 0 && 
                      (newSalida.cupos_disponibles === null || newSalida.cupos_disponibles > 0);
  
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">
          {language === 'en' ? 'Add Departure Date' : 'Agregar Fecha de Salida'}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>
              {language === 'en' ? 'Departure Date' : 'Fecha de Salida'}
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <div className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer">
                  {newSalida.fecha_salida ? (
                    format(new Date(newSalida.fecha_salida), "PPP", {
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
                  selected={newSalida.fecha_salida ? new Date(newSalida.fecha_salida) : undefined}
                  onSelect={handleSelectDate}
                  initialFocus
                  fromDate={new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="dias_duracion_salida">
              {language === 'en' ? 'Duration (days)' : 'Duración (días)'}
            </Label>
            <Input
              id="dias_duracion_salida"
              type="number"
              min={1}
              value={newSalida.dias_duracion}
              onChange={(e) => setNewSalida({
                ...newSalida,
                dias_duracion: parseInt(e.target.value) || 1
              })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="cupos_disponibles">
              {language === 'en' ? 'Available Spots' : 'Cupos Disponibles'}
            </Label>
            <Input
              id="cupos_disponibles"
              type="number"
              min={0}
              value={newSalida.cupos_disponibles || ''}
              onChange={(e) => setNewSalida({
                ...newSalida,
                cupos_disponibles: e.target.value ? parseInt(e.target.value) : null
              })}
            />
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button 
            type="button" 
            onClick={handleAddSalida}
            disabled={!canAddSalida}
          >
            <Plus className="h-4 w-4 mr-2" />
            {language === 'en' ? 'Add Departure' : 'Agregar Salida'}
          </Button>
        </div>
      </div>
      
      {salidas.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">
            {language === 'en' ? 'Scheduled Departures' : 'Salidas Programadas'}
          </h3>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  {language === 'en' ? 'Departure Date' : 'Fecha de Salida'}
                </TableHead>
                <TableHead>
                  {language === 'en' ? 'Duration (days)' : 'Duración (días)'}
                </TableHead>
                <TableHead>
                  {language === 'en' ? 'Available Spots' : 'Cupos Disponibles'}
                </TableHead>
                <TableHead className="text-right">
                  {language === 'en' ? 'Actions' : 'Acciones'}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {salidas.map((salida, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {salida.fecha_salida 
                      ? format(new Date(salida.fecha_salida), "PPP", {
                          locale: language === 'es' ? es : undefined,
                        })
                      : '-'
                    }
                  </TableCell>
                  <TableCell>{salida.dias_duracion}</TableCell>
                  <TableCell>
                    {salida.cupos_disponibles !== null ? salida.cupos_disponibles : '-'}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleRemoveSalida(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default TourDeparturesForm;
