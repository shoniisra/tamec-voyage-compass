
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useDestinos } from '@/modules/tours/hooks';
import { TourFilterParams, Destino } from '@/modules/tours/types';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { 
  Search,
  MapPinned,
  Clock,
  X,
} from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";

interface DestinationsFilterProps {
  onFilterChange: (filters: TourFilterParams) => void;
}

const DestinationsFilter: React.FC<DestinationsFilterProps> = ({ onFilterChange }) => {
  const { language } = useLanguage();
  const { destinos, loading: loadingDestinos } = useDestinos();
  
  // Filter states
  const [duration, setDuration] = useState<string>('');
  const [destinoId, setDestinoId] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDestino, setSelectedDestino] = useState<Destino | null>(null);
  const [open, setOpen] = useState(false);
  
  // Duration options
  const durationOptions = Array.from({ length: 14 }, (_, i) => (i + 1).toString());
  
  const handleApplyFilters = () => {
    const filters: TourFilterParams = {
      search: searchQuery,
    };
    
    if (destinoId) {
      filters.destino = [parseInt(destinoId)];
    }
    
    if (duration) {
      filters.duracion = [parseInt(duration)];
    }
    
    onFilterChange(filters);
  };
  
  const handleResetFilters = () => {
    setDuration('');
    setDestinoId('');
    setSearchQuery('');
    setSelectedDestino(null);
    
    onFilterChange({});
  };
  
  const handleDestinationSelect = (destino: Destino) => {
    setSelectedDestino(destino);
    setDestinoId(destino.id.toString());
    setSearchQuery(destino.nombre);
    setOpen(false);
    
    // Apply filters immediately when destination is selected
    onFilterChange({
      destino: [destino.id],
      duracion: duration ? [parseInt(duration)] : undefined
    });
  };
  
  useEffect(() => {
    if (!searchQuery && selectedDestino) {
      setSelectedDestino(null);
      setDestinoId('');
    }
  }, [searchQuery, selectedDestino]);
  
  return (
    <div className="mb-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
        <h3 className="text-lg font-medium flex items-center mb-4">
          <Search className="mr-2 h-5 w-5 text-tamec-600" /> 
          {language === 'en' ? 'Search Tours' : 'Buscar Tours'}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Destination Search with Suggestions */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center">
              <MapPinned className="mr-2 h-4 w-4 text-tamec-600" /> 
              {language === 'en' ? 'Where' : 'Destino'}
            </label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <div className="relative">
                  <Input
                    placeholder={language === 'en' ? 'Search destinations' : 'Buscar destinos'}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setOpen(true)}
                    className="w-full"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedDestino(null);
                        setDestinoId('');
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="start">
                <Command>
                  <CommandInput 
                    placeholder={language === 'en' ? 'Search destinations' : 'Buscar destinos'} 
                    value={searchQuery}
                    onValueChange={setSearchQuery}
                  />
                  <CommandList>
                    <CommandEmpty>
                      {language === 'en' ? 'No destinations found' : 'No se encontraron destinos'}
                    </CommandEmpty>
                    <CommandGroup>
                      <ScrollArea className="h-64">
                        {destinos
                          .filter(d => 
                            d.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            (d.pais && d.pais.toLowerCase().includes(searchQuery.toLowerCase())) ||
                            (d.ciudad && d.ciudad.toLowerCase().includes(searchQuery.toLowerCase()))
                          )
                          .map(destino => (
                            <CommandItem 
                              key={destino.id} 
                              value={destino.id.toString()}
                              onSelect={() => handleDestinationSelect(destino)}
                              className="flex flex-col items-start p-2"
                            >
                              <div className="font-medium">{destino.nombre}</div>
                              <div className="text-sm text-muted-foreground">
                                {destino.ciudad ? `${destino.ciudad}, ${destino.pais}` : destino.pais}
                              </div>
                            </CommandItem>
                          ))
                        }
                      </ScrollArea>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          
          {/* Duration Filter as Number */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center">
              <Clock className="mr-2 h-4 w-4 text-tamec-600" /> 
              {language === 'en' ? 'Duration (Days)' : 'Duración (Días)'}
            </label>
            <Select
              value={duration}
              onValueChange={(value) => {
                setDuration(value);
                // Apply filters immediately when duration is selected
                onFilterChange({
                  duracion: value ? [parseInt(value)] : undefined,
                  destino: destinoId ? [parseInt(destinoId)] : undefined
                });
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder={language === 'en' ? 'Select days' : 'Seleccionar días'} />
              </SelectTrigger>
              <SelectContent>
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
          
          {/* Search Button */}
          <div className="flex items-end">
            <div className="flex space-x-2 w-full">
              <Button variant="outline" onClick={handleResetFilters} className="flex-1">
                {language === 'en' ? 'Clear' : 'Limpiar'}
              </Button>
              <Button onClick={handleApplyFilters} className="flex-1">
                <Search className="mr-2 h-4 w-4" />
                {language === 'en' ? 'Search' : 'Buscar'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationsFilter;
