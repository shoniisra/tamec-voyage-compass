
import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
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
import { Regalo } from '@/modules/tours/types/tour';

interface TourGiftsFormProps {
  regalos: Array<{ regalo_id: number }>;
  setRegalos: React.Dispatch<React.SetStateAction<Array<{ regalo_id: number }>>>;
}

const TourGiftsForm: React.FC<TourGiftsFormProps> = ({ regalos, setRegalos }) => {
  const { language } = useLanguage();
  const [availableRegalos, setAvailableRegalos] = useState<Regalo[]>([]);
  const [selectedRegaloId, setSelectedRegaloId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const fetchRegalos = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('regalos_genericos')
          .select('*')
          .order('nombre');
        
        if (error) {
          throw error;
        }
        
        setAvailableRegalos(data || []);
      } catch (error) {
        console.error('Error fetching gifts:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchRegalos();
  }, []);
  
  const handleAddRegalo = () => {
    if (!selectedRegaloId) return;
    
    // Check if gift is already added
    if (regalos.some(r => r.regalo_id === selectedRegaloId)) {
      return;
    }
    
    setRegalos([...regalos, { regalo_id: selectedRegaloId }]);
    setSelectedRegaloId(null);
  };
  
  const handleRemoveRegalo = (index: number) => {
    const newRegalos = [...regalos];
    newRegalos.splice(index, 1);
    setRegalos(newRegalos);
  };
  
  const getRegaloName = (regaloId: number) => {
    const regalo = availableRegalos.find(r => r.id === regaloId);
    return regalo ? regalo.nombre : '';
  };
  
  const getRegaloDescription = (regaloId: number) => {
    const regalo = availableRegalos.find(r => r.id === regaloId);
    return regalo?.descripcion || '';
  };
  
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">
        {language === 'en' ? 'Tour Gifts' : 'Regalos del Tour'}
      </h3>
      
      <div className="flex space-x-2">
        <Select 
          value={selectedRegaloId?.toString() || ''} 
          onValueChange={(value) => setSelectedRegaloId(value ? parseInt(value) : null)}
          disabled={loading}
        >
          <SelectTrigger className="flex-1">
            <SelectValue placeholder={
              loading 
                ? (language === 'en' ? 'Loading...' : 'Cargando...') 
                : (language === 'en' ? 'Select a gift' : 'Seleccionar un regalo')
            } />
          </SelectTrigger>
          <SelectContent>
            {availableRegalos.map((regalo) => (
              <SelectItem key={regalo.id} value={regalo.id.toString()}>
                {regalo.nombre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Button 
          type="button" 
          onClick={handleAddRegalo}
          disabled={!selectedRegaloId}
        >
          <Plus className="h-4 w-4 mr-2" />
          {language === 'en' ? 'Add' : 'Agregar'}
        </Button>
      </div>
      
      {regalos.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                {language === 'en' ? 'Gift' : 'Regalo'}
              </TableHead>
              <TableHead>
                {language === 'en' ? 'Description' : 'Descripción'}
              </TableHead>
              <TableHead className="text-right">
                {language === 'en' ? 'Actions' : 'Acciones'}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {regalos.map((regalo, index) => (
              <TableRow key={index}>
                <TableCell>{getRegaloName(regalo.regalo_id)}</TableCell>
                <TableCell>{getRegaloDescription(regalo.regalo_id) || '-'}</TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleRemoveRegalo(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      
      {availableRegalos.length === 0 && !loading && (
        <div className="text-center py-4 text-muted-foreground">
          {language === 'en' 
            ? 'No gifts available. Please add gifts in the settings first.' 
            : 'No hay regalos disponibles. Por favor, agrega regalos en la configuración primero.'
          }
        </div>
      )}
    </div>
  );
};

export default TourGiftsForm;
