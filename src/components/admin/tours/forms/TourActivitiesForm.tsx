
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus, Trash2 } from 'lucide-react';

interface TourActivitiesFormProps {
  actividades: Array<{
    nombre: string;
    descripcion?: string;
    costo_adicional?: number;
    incluida: boolean;
  }>;
  setActividades: React.Dispatch<React.SetStateAction<Array<{
    nombre: string;
    descripcion?: string;
    costo_adicional?: number;
    incluida: boolean;
  }>>>;
}

const TourActivitiesForm: React.FC<TourActivitiesFormProps> = ({ actividades, setActividades }) => {
  const { language } = useLanguage();
  const [newActividad, setNewActividad] = useState<{
    nombre: string;
    descripcion: string;
    costo_adicional: number | undefined;
    incluida: boolean;
  }>({
    nombre: '',
    descripcion: '',
    costo_adicional: undefined,
    incluida: true
  });
  
  const handleAddActividad = () => {
    if (!newActividad.nombre.trim()) return;
    
    setActividades([...actividades, { ...newActividad }]);
    setNewActividad({
      nombre: '',
      descripcion: '',
      costo_adicional: undefined,
      incluida: true
    });
  };
  
  const handleRemoveActividad = (index: number) => {
    const newActividades = [...actividades];
    newActividades.splice(index, 1);
    setActividades(newActividades);
  };
  
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">
        {language === 'en' ? 'Tour Activities' : 'Actividades del Tour'}
      </h3>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="nombre_actividad">
              {language === 'en' ? 'Activity Name' : 'Nombre de la Actividad'} <span className="text-destructive">*</span>
            </Label>
            <Input
              id="nombre_actividad"
              value={newActividad.nombre}
              onChange={(e) => setNewActividad({
                ...newActividad,
                nombre: e.target.value
              })}
              placeholder={language === 'en' ? 'e.g. City Tour' : 'ej. Tour por la Ciudad'}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="costo_adicional">
              {language === 'en' ? 'Additional Cost' : 'Costo Adicional'}
            </Label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                $
              </span>
              <Input
                id="costo_adicional"
                type="number"
                min={0}
                step="0.01"
                className="pl-6"
                value={newActividad.costo_adicional === undefined ? '' : newActividad.costo_adicional}
                onChange={(e) => setNewActividad({
                  ...newActividad,
                  costo_adicional: e.target.value === '' ? undefined : parseFloat(e.target.value)
                })}
                placeholder={language === 'en' ? 'Leave empty if included' : 'Dejar vacío si está incluido'}
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="descripcion_actividad">
            {language === 'en' ? 'Description' : 'Descripción'}
          </Label>
          <Textarea
            id="descripcion_actividad"
            value={newActividad.descripcion}
            onChange={(e) => setNewActividad({
              ...newActividad,
              descripcion: e.target.value
            })}
            rows={3}
            placeholder={language === 'en' ? 'Describe the activity' : 'Describe la actividad'}
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="incluida" 
            checked={newActividad.incluida}
            onCheckedChange={(checked) => setNewActividad({
              ...newActividad,
              incluida: checked === true
            })}
          />
          <Label htmlFor="incluida">
            {language === 'en' ? 'Included in the tour price' : 'Incluida en el precio del tour'}
          </Label>
        </div>
        
        <div className="flex justify-end">
          <Button 
            type="button" 
            onClick={handleAddActividad}
            disabled={!newActividad.nombre.trim()}
          >
            <Plus className="h-4 w-4 mr-2" />
            {language === 'en' ? 'Add Activity' : 'Agregar Actividad'}
          </Button>
        </div>
      </div>
      
      {actividades.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-lg font-medium">
            {language === 'en' ? 'Added Activities' : 'Actividades Agregadas'}
          </h4>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  {language === 'en' ? 'Activity' : 'Actividad'}
                </TableHead>
                <TableHead>
                  {language === 'en' ? 'Description' : 'Descripción'}
                </TableHead>
                <TableHead>
                  {language === 'en' ? 'Cost' : 'Costo'}
                </TableHead>
                <TableHead>
                  {language === 'en' ? 'Included' : 'Incluida'}
                </TableHead>
                <TableHead className="text-right">
                  {language === 'en' ? 'Actions' : 'Acciones'}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {actividades.map((actividad, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{actividad.nombre}</TableCell>
                  <TableCell>{actividad.descripcion || '-'}</TableCell>
                  <TableCell>
                    {actividad.costo_adicional !== undefined 
                      ? `$${actividad.costo_adicional.toFixed(2)}` 
                      : '-'
                    }
                  </TableCell>
                  <TableCell>
                    {actividad.incluida 
                      ? (language === 'en' ? 'Yes' : 'Sí') 
                      : (language === 'en' ? 'No' : 'No')
                    }
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleRemoveActividad(index)}
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

export default TourActivitiesForm;
