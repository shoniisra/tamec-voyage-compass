
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { TourFilterParams } from '@/modules/tours/types';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MultiSelect, OptionType } from "@/components/ui/multi-select";
import { FilterIcon, X } from 'lucide-react';

interface SideFiltersProps {
  filters: TourFilterParams;
  onFilterChange: (filters: TourFilterParams) => void;
  onClearFilters: () => void;
}

const SideFilters: React.FC<SideFiltersProps> = ({ filters, onFilterChange, onClearFilters }) => {
  const { language } = useLanguage();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  // Duration options for the filter
  const durationOptions: OptionType[] = Array.from({ length: 14 }, (_, i) => ({
    label: `${i + 1} ${language === 'en' ? 'days' : 'días'}`,
    value: (i + 1).toString()
  }));

  const handleDurationChange = (selectedValues: string[]) => {
    onFilterChange({
      ...filters,
      duracion: selectedValues.length > 0 ? selectedValues : undefined
    });
  };

  const handleIncludesFlightChange = (checked: boolean) => {
    onFilterChange({
      ...filters,
      incluye_vuelo: checked
    });
  };
  
  return (
    <>
      {/* Mobile Filter Button */}
      <div className="md:hidden mb-4">
        <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full flex justify-between">
              <span className="flex items-center">
                <FilterIcon className="mr-2 h-4 w-4" />
                {language === 'en' ? 'Filters' : 'Filtros'}
              </span>
              {Object.keys(filters).length > 0 && (
                <span className="bg-primary text-primary-foreground w-5 h-5 rounded-full text-xs flex items-center justify-center">
                  {Object.keys(filters).length}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[80vh]">
            <div className="pt-6 pb-20">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium">
                  {language === 'en' ? 'Filter Options' : 'Opciones de Filtrado'}
                </h3>
                <Button variant="ghost" size="sm" onClick={onClearFilters}>
                  <X className="h-4 w-4 mr-1" />
                  {language === 'en' ? 'Clear All' : 'Limpiar Todo'}
                </Button>
              </div>
              <div className="space-y-6">
                {/* Mobile Filter Content */}
                {renderFilterContent()}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Filters */}
      <div className="hidden md:block">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border p-4 sticky top-20">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">
              {language === 'en' ? 'Filters' : 'Filtros'}
            </h3>
            {Object.keys(filters).length > 0 && (
              <Button variant="ghost" size="sm" onClick={onClearFilters} className="h-8 px-2">
                <X className="h-3 w-3 mr-1" />
                {language === 'en' ? 'Clear' : 'Limpiar'}
              </Button>
            )}
          </div>
          
          <div className="space-y-6">
            {/* Desktop Filter Content */}
            {renderFilterContent()}
          </div>
        </div>
      </div>
    </>
  );
  
  function renderFilterContent() {
    return (
      <>
        {/* Duration Filter */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium">
            {language === 'en' ? 'Duration' : 'Duración'}
          </h4>
          <MultiSelect
            options={durationOptions}
            selected={filters.duracion || []}
            onChange={handleDurationChange}
            placeholder={language === 'en' ? 'Select duration' : 'Seleccionar duración'}
          />
        </div>
        
        {/* Includes Flight Filter */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium">
            {language === 'en' ? 'Includes' : 'Incluye'}
          </h4>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="incluye_vuelo"
              checked={filters.incluye_vuelo || false}
              onCheckedChange={handleIncludesFlightChange}
            />
            <Label htmlFor="incluye_vuelo">
              {language === 'en' ? 'Flight included' : 'Incluye vuelo'}
            </Label>
          </div>
        </div>
        
        {/* Price Range Filter - To be implemented in the future */}
        {/* <div className="space-y-3">
          <h4 className="text-sm font-medium">
            {language === 'en' ? 'Price Range' : 'Rango de Precio'}
          </h4>
          <div className="px-2">
            <Slider />
          </div>
        </div> */}
      </>
    );
  }
};

export default SideFilters;
