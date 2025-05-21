
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Tour } from '@/modules/tours/types/tour';

interface TourInclusionsFormProps {
  tourData: Partial<Tour>;
  onChange: (field: string, value: any) => void;
}

const TourInclusionsForm: React.FC<TourInclusionsFormProps> = ({ tourData, onChange }) => {
  const { language } = useLanguage();
  
  const handleCheckboxChange = (field: string) => (checked: boolean) => {
    onChange(field, checked);
  };
  
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">
        {language === 'en' ? 'Tour Inclusions' : 'Inclusiones del Tour'}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="incluye_vuelo" 
            checked={tourData.incluye_vuelo || false}
            onCheckedChange={handleCheckboxChange('incluye_vuelo')}
          />
          <Label htmlFor="incluye_vuelo">
            {language === 'en' ? 'Includes Flight' : 'Incluye Vuelo'}
          </Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="incluye_hotel" 
            checked={tourData.incluye_hotel || false}
            onCheckedChange={handleCheckboxChange('incluye_hotel')}
          />
          <Label htmlFor="incluye_hotel">
            {language === 'en' ? 'Includes Hotel' : 'Incluye Hotel'}
          </Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="incluye_transporte" 
            checked={tourData.incluye_transporte || false}
            onCheckedChange={handleCheckboxChange('incluye_transporte')}
          />
          <Label htmlFor="incluye_transporte">
            {language === 'en' ? 'Includes Transportation' : 'Incluye Transporte'}
          </Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="incluye_hospedaje" 
            checked={tourData.incluye_hospedaje || false}
            onCheckedChange={handleCheckboxChange('incluye_hospedaje')}
          />
          <Label htmlFor="incluye_hospedaje">
            {language === 'en' ? 'Includes Accommodation' : 'Incluye Hospedaje'}
          </Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="incluye_comida" 
            checked={tourData.incluye_comida || false}
            onCheckedChange={handleCheckboxChange('incluye_comida')}
          />
          <Label htmlFor="incluye_comida">
            {language === 'en' ? 'Includes Meals' : 'Incluye Comida'}
          </Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="incluye_actividades" 
            checked={tourData.incluye_actividades || false}
            onCheckedChange={handleCheckboxChange('incluye_actividades')}
          />
          <Label htmlFor="incluye_actividades">
            {language === 'en' ? 'Includes Activities' : 'Incluye Actividades'}
          </Label>
        </div>
      </div>
      
      <h3 className="text-lg font-medium mt-6">
        {language === 'en' ? 'Luggage Allowance' : 'Equipaje Permitido'}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="incluye_maleta_10" 
            checked={tourData.incluye_maleta_10 || false}
            onCheckedChange={handleCheckboxChange('incluye_maleta_10')}
          />
          <Label htmlFor="incluye_maleta_10">
            {language === 'en' ? 'Includes 10kg Suitcase' : 'Incluye Maleta de 10kg'}
          </Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="incluye_maleta_23" 
            checked={tourData.incluye_maleta_23 || false}
            onCheckedChange={handleCheckboxChange('incluye_maleta_23')}
          />
          <Label htmlFor="incluye_maleta_23">
            {language === 'en' ? 'Includes 23kg Suitcase' : 'Incluye Maleta de 23kg'}
          </Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="incluye_articulo_personal" 
            checked={tourData.incluye_articulo_personal || false}
            onCheckedChange={handleCheckboxChange('incluye_articulo_personal')}
          />
          <Label htmlFor="incluye_articulo_personal">
            {language === 'en' ? 'Includes Personal Item' : 'Incluye Artículo Personal'}
          </Label>
        </div>
      </div>
    </div>
  );
};

export default TourInclusionsForm;
