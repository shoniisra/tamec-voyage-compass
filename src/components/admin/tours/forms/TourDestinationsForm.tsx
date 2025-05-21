
import React, { useEffect, useState } from 'react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { TourDestino, Destino } from '@/modules/tours/types/tour';
import { useDestinos } from '@/modules/tours';

interface TourDestinationsFormProps {
  destinos: Array<{ destino_id: number; orden: number }>;
  setDestinos: React.Dispatch<React.SetStateAction<Array<{ destino_id: number; orden: number }>>>;
  errors: { [key: string]: string };
}

const TourDestinationsForm: React.FC<TourDestinationsFormProps> = ({ destinos, setDestinos, errors }) => {
  const { language } = useLanguage();
  const { destinos: destinosList, loading } = useDestinos();
  const [destinoId, setDestinoId] = useState<number | null>(null);
  
  const handleAddDestino = () => {
    if (!destinoId) return;
    
    // Check if destino already exists
    const exists = destinos.some(d => d.destino_id === destinoId);
    if (exists) return;
    
    // Add new destino with the next order number
    const orden = destinos.length > 0 
      ? Math.max(...destinos.map(d => d.orden)) + 1 
      : 1;
    
    setDestinos([...destinos, { destino_id: destinoId, orden }]);
    setDestinoId(null); // Reset selection
  };
  
  const handleRemoveDestino = (index: number) => {
    const newDestinos = [...destinos];
    newDestinos.splice(index, 1);
    
    // Reorder remaining destinos
    const reorderedDestinos = newDestinos.map((d, i) => ({
      ...d,
      orden: i + 1
    }));
    
    setDestinos(reorderedDestinos);
  };
  
  const handleMoveDestino = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === destinos.length - 1)
    ) {
      return;
    }
    
    const newDestinos = [...destinos];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    
    // Swap orden values
    const tempOrden = newDestinos[index].orden;
    newDestinos[index].orden = newDestinos[swapIndex].orden;
    newDestinos[swapIndex].orden = tempOrden;
    
    // Sort by orden
    newDestinos.sort((a, b) => a.orden - b.orden);
    
    setDestinos(newDestinos);
  };
  
  const getDestinoName = (destinoId: number) => {
    const destino = destinosList.find(d => d.id === destinoId);
    if (!destino) return '';
    
    // Use the nombre property which is formatted "{pais}, {ciudad}"
    return destino.nombre || `${destino.pais}${destino.ciudad ? `, ${destino.ciudad}` : ''}`;
  };
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label className={errors.destinos ? "text-destructive" : ""}>
          {language === 'en' ? 'Destinations' : 'Destinos'} <span className="text-destructive">*</span>
        </Label>
        
        <div className="flex space-x-2">
          <Select 
            value={destinoId?.toString() || 'placeholder'} // Changed from empty string to 'placeholder'
            onValueChange={(value) => setDestinoId(value !== 'placeholder' ? parseInt(value) : null)}
            disabled={loading}
          >
            <SelectTrigger className="flex-1">
              <SelectValue placeholder={language === 'en' ? 'Select a destination' : 'Seleccionar un destino'} />
            </SelectTrigger>
            <SelectContent>
              {destinosList.map((destino) => (
                <SelectItem key={destino.id} value={destino.id.toString()}>
                  {destino.nombre || `${destino.pais}${destino.ciudad ? `, ${destino.ciudad}` : ''}`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button 
            type="button" 
            onClick={handleAddDestino}
            disabled={!destinoId}
          >
            <Plus className="h-4 w-4 mr-2" />
            {language === 'en' ? 'Add' : 'Agregar'}
          </Button>
        </div>
        
        {errors.destinos && (
          <p className="text-sm font-medium text-destructive">{errors.destinos}</p>
        )}
      </div>
      
      {destinos.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16 text-center">
                {language === 'en' ? 'Order' : 'Orden'}
              </TableHead>
              <TableHead>
                {language === 'en' ? 'Destination' : 'Destino'}
              </TableHead>
              <TableHead className="text-right">
                {language === 'en' ? 'Actions' : 'Acciones'}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {destinos.map((destino, index) => (
              <TableRow key={index}>
                <TableCell className="text-center">{destino.orden}</TableCell>
                <TableCell>{getDestinoName(destino.destino_id)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleMoveDestino(index, 'up')}
                      disabled={index === 0}
                    >
                      ↑
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleMoveDestino(index, 'down')}
                      disabled={index === destinos.length - 1}
                    >
                      ↓
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleRemoveDestino(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default TourDestinationsForm;
