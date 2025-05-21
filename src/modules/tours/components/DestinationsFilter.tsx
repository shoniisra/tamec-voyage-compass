
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useDestinos } from '@/modules/tours/hooks';
import { TourFilterParams, Destino } from '@/modules/tours/types';
import { Button } from "@/components/ui/button";
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
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDestino, setSelectedDestino] = useState<Destino | null>(null);
  const [open, setOpen] = useState(false);
  
  // Duration options
  const durationOptions = Array.from({ length: 14 }, (_, i) => (i + 1).toString());
  
  const handleApplyFilters = () => {
    const filters: TourFilterParams = {};
    
    if (selectedDestino) {
      filters.destino = [selectedDestino.id.toString()];
    }
    
    if (duration) {
      filters.duracion = [duration];
    }
    
    onFilterChange(filters);
  };
  
  const handleDestinationSelect = (destino: Destino) => {
    setSelectedDestino(destino);
    setSearchQuery(destino.nombre);
    setOpen(false);
    
    // Apply filters immediately when destination is selected
    onFilterChange({
      destino: destino ? [destino.id.toString()] : undefined,
      duracion: duration ? [duration] : undefined
    });
  };
  
  useEffect(() => {
    if (!searchQuery && selectedDestino) {
      setSelectedDestino(null);
    }
  }, [searchQuery, selectedDestino]);
  
  return (
    <div className="mb-2">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-2 shadow-sm">
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
                  <div className="flex items-center border border-input rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                    <Search className="ml-3 h-4 w-4 shrink-0 opacity-50" />
                    <input
                      placeholder={language === 'en' ? 'Search destinations' : 'Buscar destinos'}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => setOpen(true)}
                      className="w-full py-2 px-3 bg-transparent focus:outline-none"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => {
                          setSearchQuery('');
                          setSelectedDestino(null);
                        }}
                        className="mr-2 text-gray-500 hover:text-gray-700"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="start">
                <Command>
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
                  duracion: value ? [value] : undefined,
                  destino: selectedDestino ? [selectedDestino.id.toString()] : undefined
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
            <div className="w-full">
              <Button onClick={handleApplyFilters} className="w-full">
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
