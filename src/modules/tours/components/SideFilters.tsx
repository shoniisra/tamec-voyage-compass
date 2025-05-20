
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { TourFilterParams } from '@/modules/tours/types';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDestinos } from '@/modules/tours/hooks';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { MapPinned, Clock, X, DollarSign, Plane } from 'lucide-react';

interface SideFiltersProps {
  filters: TourFilterParams;
  onFilterChange: (filters: TourFilterParams) => void;
  onClearFilters: () => void;
}

const SideFilters = ({ filters, onFilterChange, onClearFilters }: SideFiltersProps) => {
  const { language } = useLanguage();
  const { destinos } = useDestinos();
  
  // Create duration options from 1 to 14 days
  const durationOptions = Array.from({ length: 14 }, (_, i) => (i + 1).toString());
  
  // Price range options
  const priceOptions = [
    { label: language === 'en' ? 'All Prices' : 'Todos los precios', value: '' },
    { label: '< $500', value: '1-500' },
    { label: '$500 - $1000', value: '500-1000' },
    { label: '$1000 - $2000', value: '1000-2000' },
    { label: '> $2000', value: '2000-99999' }
  ];
  
  // Handler for destination select
  const handleDestinoChange = (value: string) => {
    onFilterChange({
      ...filters,
      destino: value ? [parseInt(value)] : undefined
    });
  };
  
  // Handler for duration select
  const handleDurationChange = (value: string) => {
    onFilterChange({
      ...filters,
      duracion: value ? [parseInt(value)] : undefined
    });
  };
  
  // Handler for price range select
  const handlePriceRangeChange = (value: string) => {
    if (!value) {
      const { precio_min, precio_max, ...restFilters } = filters;
      onFilterChange(restFilters);
      return;
    }
    
    const [min, max] = value.split('-').map(Number);
    onFilterChange({
      ...filters,
      precio_min: min,
      precio_max: max
    });
  };
  
  // Handler for flight checkbox
  const handleFlightChange = (checked: boolean) => {
    onFilterChange({
      ...filters,
      incluye_vuelo: checked || undefined
    });
  };
  
  // Find the currently selected values
  const selectedDestinoId = filters.destino?.[0]?.toString() || '';
  const selectedDuration = filters.duracion?.[0]?.toString() || '';
  const selectedPriceRange = filters.precio_min && filters.precio_max
    ? `${filters.precio_min}-${filters.precio_max}`
    : '';
  
  return (
    <Card className="sticky top-24">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">
            {language === 'en' ? 'Filters' : 'Filtros'}
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClearFilters}
            className="h-8 px-2 text-muted-foreground"
          >
            <X className="h-4 w-4 mr-1" />
            {language === 'en' ? 'Clear all' : 'Limpiar todo'}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Destination filter */}
        <div className="space-y-1.5">
          <Label className="flex items-center text-sm font-medium">
            <MapPinned className="mr-2 h-4 w-4 text-tamec-600" />
            {language === 'en' ? 'Destination' : 'Destino'}
          </Label>
          <Select
            value={selectedDestinoId}
            onValueChange={handleDestinoChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={language === 'en' ? 'All destinations' : 'Todos los destinos'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">
                {language === 'en' ? 'All destinations' : 'Todos los destinos'}
              </SelectItem>
              <ScrollArea className="h-60">
                {destinos.map((destino) => (
                  <SelectItem key={destino.id} value={destino.id.toString()}>
                    {destino.nombre}
                  </SelectItem>
                ))}
              </ScrollArea>
            </SelectContent>
          </Select>
        </div>
        
        {/* Duration filter */}
        <div className="space-y-1.5">
          <Label className="flex items-center text-sm font-medium">
            <Clock className="mr-2 h-4 w-4 text-tamec-600" />
            {language === 'en' ? 'Duration' : 'Duración'}
          </Label>
          <Select
            value={selectedDuration}
            onValueChange={handleDurationChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={language === 'en' ? 'Any duration' : 'Cualquier duración'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">
                {language === 'en' ? 'Any duration' : 'Cualquier duración'}
              </SelectItem>
              <ScrollArea className="h-60">
                {durationOptions.map((days) => (
                  <SelectItem key={days} value={days}>
                    {days} {language === 'en' ? 'days' : 'días'}
                  </SelectItem>
                ))}
              </ScrollArea>
            </SelectContent>
          </Select>
        </div>
        
        {/* Price range filter */}
        <div className="space-y-1.5">
          <Label className="flex items-center text-sm font-medium">
            <DollarSign className="mr-2 h-4 w-4 text-tamec-600" />
            {language === 'en' ? 'Price Range' : 'Rango de Precio'}
          </Label>
          <Select
            value={selectedPriceRange}
            onValueChange={handlePriceRangeChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={language === 'en' ? 'All prices' : 'Todos los precios'} />
            </SelectTrigger>
            <SelectContent>
              {priceOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Includes flight filter */}
        <div className="space-y-1.5">
          <Label className="flex items-center text-sm font-medium" htmlFor="flight">
            <Plane className="mr-2 h-4 w-4 text-tamec-600" />
            {language === 'en' ? 'Includes Flight' : 'Incluye Vuelo'}
          </Label>
          <div className="flex items-center space-x-2 pt-1">
            <Checkbox 
              id="flight" 
              checked={filters.incluye_vuelo === true}
              onCheckedChange={handleFlightChange}
            />
            <label 
              htmlFor="flight" 
              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {language === 'en' ? 'Only show tours with flights' : 'Solo mostrar tours con vuelos'}
            </label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SideFilters;
