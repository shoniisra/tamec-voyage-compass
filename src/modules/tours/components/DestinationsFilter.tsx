import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useDestinos } from '@/modules/tours/hooks';
import { TourFilterParams } from '@/modules/tours/types';
import { DateRange } from 'react-day-picker';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { MultiSelect } from "@/components/ui/multi-select";
import { 
  CalendarIcon, 
  Filter, 
  SlidersHorizontal, 
  Calendar as CalendarIcon2,
  Search,
  PlaneIcon,
  DollarSign,
  X,
  MapPinned
} from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface DestinationsFilterProps {
  onFilterChange: (filters: TourFilterParams) => void;
}

const DestinationsFilter: React.FC<DestinationsFilterProps> = ({ onFilterChange }) => {
  const { language } = useLanguage();
  const { destinos, loading: loadingDestinos } = useDestinos();
  
  // Filter states
  const [duracion, setDuracion] = useState<number[]>([]);
  const [destinoIds, setDestinoIds] = useState<string[]>([]);
  const [precioMaximo, setPrecioMaximo] = useState<number>(3000);
  const [incluyeVuelo, setIncluyeVuelo] = useState<boolean | undefined>(undefined);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Duration options
  const duracionOptions = [
    { value: "1-3", label: "1-3 " + (language === 'en' ? 'days' : 'días') },
    { value: "4-7", label: "4-7 " + (language === 'en' ? 'days' : 'días') },
    { value: "8-14", label: "8-14 " + (language === 'en' ? 'days' : 'días') },
    { value: "15+", label: "15+ " + (language === 'en' ? 'days' : 'días') }
  ];
  
  // Transform destinations to options format
  const destinoOptions = destinos.map(destino => ({
    value: destino.id.toString(),
    label: destino.ciudad ? `${destino.ciudad}, ${destino.pais}` : destino.pais,
    color: `#${Math.floor(Math.random()*16777215).toString(16)}`
  }));
  
  const handleDuracionChange = (selected: string[]) => {
    const duracionValues: number[] = [];
    
    selected.forEach(value => {
      if (value === "1-3") {
        duracionValues.push(1, 2, 3);
      } else if (value === "4-7") {
        duracionValues.push(4, 5, 6, 7);
      } else if (value === "8-14") {
        duracionValues.push(8, 9, 10, 11, 12, 13, 14);
      } else if (value === "15+") {
        // Add some reasonable upper limit like 30 days
        for (let i = 15; i <= 30; i++) {
          duracionValues.push(i);
        }
      }
    });
    
    setDuracion(duracionValues);
  };
  
  const handleApplyFilters = () => {
    onFilterChange({
      duracion: duracion.length > 0 ? duracion : undefined,
      destino: destinoIds.length > 0 ? destinoIds.map(id => parseInt(id)) : undefined,
      precio_maximo: precioMaximo,
      incluye_vuelo: incluyeVuelo,
      fecha_inicio: dateRange?.from || undefined,
      fecha_fin: dateRange?.to || undefined
    });
    
    setIsFilterOpen(false);
  };
  
  const handleResetFilters = () => {
    setDuracion([]);
    setDestinoIds([]);
    setPrecioMaximo(3000);
    setIncluyeVuelo(undefined);
    setDateRange(undefined);
    
    onFilterChange({});
  };
  
  return (
    <div className="mb-8">
      {/* Mobile Filter Button */}
      <div className="md:hidden">
        <Button 
          variant="outline" 
          className="w-full" 
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <Filter className="mr-2 h-4 w-4" /> 
          {language === 'en' ? 'Filters' : 'Filtros'}
        </Button>
      </div>
      
      {/* Desktop/Mobile Filter Panel */}
      <div className={`${isFilterOpen ? 'block' : 'hidden md:block'} bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium flex items-center">
            <SlidersHorizontal className="mr-2 h-5 w-5" /> 
            {language === 'en' ? 'Filter Tours' : 'Filtrar Tours'}
          </h3>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsFilterOpen(false)}
            className="md:hidden"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {/* Duration Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center">
              <CalendarIcon2 className="mr-2 h-4 w-4 text-tamec-600" /> 
              {language === 'en' ? 'Duration' : 'Duración'}
            </label>
            <MultiSelect
              options={duracionOptions}
              selected={[]}
              onChange={(selected) => handleDuracionChange(selected)}
              placeholder={language === 'en' ? 'Select duration' : 'Seleccionar duración'}
            />
          </div>
          
          {/* Destinations Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center">
              <MapPinned className="mr-2 h-4 w-4 text-tamec-600" /> 
              {language === 'en' ? 'Destinations' : 'Destinos'}
            </label>
            <MultiSelect
              options={destinoOptions}
              selected={destinoIds}
              onChange={setDestinoIds}
              placeholder={language === 'en' ? 'Select destinations' : 'Seleccionar destinos'}
              className="w-full"
            />
          </div>
          
          {/* Date Range Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center">
              <CalendarIcon className="mr-2 h-4 w-4 text-tamec-600" /> 
              {language === 'en' ? 'Travel Dates' : 'Fechas de Viaje'}
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange?.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, 'PP', { locale: language === 'es' ? es : undefined })} -{' '}
                        {format(dateRange.to, 'PP', { locale: language === 'es' ? es : undefined })}
                      </>
                    ) : (
                      format(dateRange.from, 'PP', { locale: language === 'es' ? es : undefined })
                    )
                  ) : (
                    <span className="text-muted-foreground">
                      {language === 'en' ? 'Select dates' : 'Seleccionar fechas'}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange?.from}
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>
          
          {/* Price Range Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center">
              <DollarSign className="mr-2 h-4 w-4 text-tamec-600" /> 
              {language === 'en' ? 'Max Price' : 'Precio Máximo'}
            </label>
            <div className="pt-2 px-1">
              <Slider
                defaultValue={[3000]}
                max={5000}
                step={100}
                onValueChange={(value) => setPrecioMaximo(value[0])}
              />
              <div className="flex justify-between mt-2 text-sm text-gray-600">
                <span>$0</span>
                <span>${precioMaximo}</span>
                <span>$5000</span>
              </div>
            </div>
          </div>
          
          {/* Flight Included Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center">
              <PlaneIcon className="mr-2 h-4 w-4 text-tamec-600" /> 
              {language === 'en' ? 'Flight Included' : 'Vuelo Incluido'}
            </label>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="flight-included" 
                checked={incluyeVuelo === true}
                onCheckedChange={(checked) => 
                  setIncluyeVuelo(checked === 'indeterminate' ? undefined : checked)
                }
              />
              <label
                htmlFor="flight-included"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {language === 'en' ? 'Only tours with flights' : 'Solo tours con vuelos'}
              </label>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-2 mt-6">
          <Button variant="outline" onClick={handleResetFilters}>
            {language === 'en' ? 'Reset' : 'Reiniciar'}
          </Button>
          <Button onClick={handleApplyFilters}>
            <Search className="mr-2 h-4 w-4" />
            {language === 'en' ? 'Apply Filters' : 'Aplicar Filtros'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DestinationsFilter;
