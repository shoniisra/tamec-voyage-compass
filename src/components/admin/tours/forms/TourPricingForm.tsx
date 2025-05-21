
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Trash2 } from 'lucide-react';

interface TourPricingFormProps {
  precios: Array<{
    ciudad_salida: string;
    tipo_habitacion: 'doble' | 'triple' | 'individual' | 'child';
    forma_pago: 'efectivo' | 'tarjeta';
    precio: number;
  }>;
  setPrecios: React.Dispatch<React.SetStateAction<Array<{
    ciudad_salida: string;
    tipo_habitacion: 'doble' | 'triple' | 'individual' | 'child';
    forma_pago: 'efectivo' | 'tarjeta';
    precio: number;
  }>>>;
}

const TourPricingForm: React.FC<TourPricingFormProps> = ({ precios, setPrecios }) => {
  const { language } = useLanguage();
  const [newPrecio, setNewPrecio] = useState<{
    ciudad_salida: string;
    tipo_habitacion: 'doble' | 'triple' | 'individual' | 'child';
    forma_pago: 'efectivo' | 'tarjeta';
    precio: number;
  }>({
    ciudad_salida: '',
    tipo_habitacion: 'doble',
    forma_pago: 'efectivo',
    precio: 0
  });
  
  const handleAddPrecio = () => {
    setPrecios([...precios, { ...newPrecio }]);
    setNewPrecio({
      ciudad_salida: '',
      tipo_habitacion: 'doble',
      forma_pago: 'efectivo',
      precio: 0
    });
  };
  
  const handleRemovePrecio = (index: number) => {
    const newPrecios = [...precios];
    newPrecios.splice(index, 1);
    setPrecios(newPrecios);
  };
  
  const translateTipoHabitacion = (tipo: string) => {
    switch (tipo) {
      case 'doble':
        return language === 'en' ? 'Double' : 'Doble';
      case 'triple':
        return language === 'en' ? 'Triple' : 'Triple';
      case 'individual':
        return language === 'en' ? 'Single' : 'Individual';
      case 'child':
        return language === 'en' ? 'Child' : 'Niño';
      default:
        return tipo;
    }
  };
  
  const translateFormaPago = (forma: string) => {
    switch (forma) {
      case 'efectivo':
        return language === 'en' ? 'Cash' : 'Efectivo';
      case 'tarjeta':
        return language === 'en' ? 'Card' : 'Tarjeta';
      default:
        return forma;
    }
  };
  
  const canAddPrecio = 
    newPrecio.ciudad_salida.trim() !== '' && 
    newPrecio.precio > 0;
  
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">
          {language === 'en' ? 'Add Price' : 'Agregar Precio'}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="ciudad_salida">
              {language === 'en' ? 'Departure City' : 'Ciudad de Salida'} <span className="text-destructive">*</span>
            </Label>
            <Input
              id="ciudad_salida"
              value={newPrecio.ciudad_salida}
              onChange={(e) => setNewPrecio({
                ...newPrecio,
                ciudad_salida: e.target.value
              })}
              placeholder={language === 'en' ? 'e.g. Miami' : 'ej. Miami'}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="tipo_habitacion">
              {language === 'en' ? 'Room Type' : 'Tipo de Habitación'}
            </Label>
            <Select 
              value={newPrecio.tipo_habitacion} 
              onValueChange={(value: 'doble' | 'triple' | 'individual' | 'child') => setNewPrecio({
                ...newPrecio,
                tipo_habitacion: value
              })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="doble">
                  {language === 'en' ? 'Double' : 'Doble'}
                </SelectItem>
                <SelectItem value="triple">
                  {language === 'en' ? 'Triple' : 'Triple'}
                </SelectItem>
                <SelectItem value="individual">
                  {language === 'en' ? 'Single' : 'Individual'}
                </SelectItem>
                <SelectItem value="child">
                  {language === 'en' ? 'Child' : 'Niño'}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="forma_pago">
              {language === 'en' ? 'Payment Method' : 'Forma de Pago'}
            </Label>
            <Select 
              value={newPrecio.forma_pago} 
              onValueChange={(value: 'efectivo' | 'tarjeta') => setNewPrecio({
                ...newPrecio,
                forma_pago: value
              })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="efectivo">
                  {language === 'en' ? 'Cash' : 'Efectivo'}
                </SelectItem>
                <SelectItem value="tarjeta">
                  {language === 'en' ? 'Card' : 'Tarjeta'}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="precio">
              {language === 'en' ? 'Price' : 'Precio'} <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                $
              </span>
              <Input
                id="precio"
                type="number"
                min={0}
                step="0.01"
                className="pl-6"
                value={newPrecio.precio}
                onChange={(e) => setNewPrecio({
                  ...newPrecio,
                  precio: parseFloat(e.target.value) || 0
                })}
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button 
            type="button" 
            onClick={handleAddPrecio}
            disabled={!canAddPrecio}
          >
            <Plus className="h-4 w-4 mr-2" />
            {language === 'en' ? 'Add Price' : 'Agregar Precio'}
          </Button>
        </div>
      </div>
      
      {precios.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">
            {language === 'en' ? 'Price List' : 'Lista de Precios'}
          </h3>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  {language === 'en' ? 'Departure City' : 'Ciudad de Salida'}
                </TableHead>
                <TableHead>
                  {language === 'en' ? 'Room Type' : 'Tipo de Habitación'}
                </TableHead>
                <TableHead>
                  {language === 'en' ? 'Payment Method' : 'Forma de Pago'}
                </TableHead>
                <TableHead>
                  {language === 'en' ? 'Price' : 'Precio'}
                </TableHead>
                <TableHead className="text-right">
                  {language === 'en' ? 'Actions' : 'Acciones'}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {precios.map((precio, index) => (
                <TableRow key={index}>
                  <TableCell>{precio.ciudad_salida}</TableCell>
                  <TableCell>{translateTipoHabitacion(precio.tipo_habitacion)}</TableCell>
                  <TableCell>{translateFormaPago(precio.forma_pago)}</TableCell>
                  <TableCell>${precio.precio.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleRemovePrecio(index)}
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

export default TourPricingForm;
