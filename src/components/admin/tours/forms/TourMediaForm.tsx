
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
import { Plus, Trash2, Image, FileText } from 'lucide-react';

interface TourMediaFormProps {
  fotos: Array<{
    url_imagen: string;
    descripcion?: string;
    orden?: number;
  }>;
  setFotos: React.Dispatch<React.SetStateAction<Array<{
    url_imagen: string;
    descripcion?: string;
    orden?: number;
  }>>>;
  adjuntos: Array<{
    url_archivo: string;
    descripcion?: string;
    tipo_archivo?: string;
  }>;
  setAdjuntos: React.Dispatch<React.SetStateAction<Array<{
    url_archivo: string;
    descripcion?: string;
    tipo_archivo?: string;
  }>>>;
}

const TourMediaForm: React.FC<TourMediaFormProps> = ({ 
  fotos, 
  setFotos,
  adjuntos,
  setAdjuntos
}) => {
  const { language } = useLanguage();
  const [newFoto, setNewFoto] = useState<{
    url_imagen: string;
    descripcion: string;
    orden: number;
  }>({
    url_imagen: '',
    descripcion: '',
    orden: (fotos.length > 0 ? Math.max(...fotos.map(f => f.orden || 0)) : 0) + 1
  });

  const [newAdjunto, setNewAdjunto] = useState<{
    url_archivo: string;
    descripcion: string;
    tipo_archivo: string;
  }>({
    url_archivo: '',
    descripcion: '',
    tipo_archivo: 'pdf'
  });
  
  // Photos functions
  const handleAddFoto = () => {
    setFotos([...fotos, { ...newFoto }]);
    setNewFoto({
      url_imagen: '',
      descripcion: '',
      orden: (fotos.length > 0 ? Math.max(...fotos.map(f => f.orden || 0)) + 1 : 1)
    });
  };
  
  const handleRemoveFoto = (index: number) => {
    const newFotos = [...fotos];
    newFotos.splice(index, 1);
    setFotos(newFotos);
  };

  // Attachments functions
  const handleAddAdjunto = () => {
    setAdjuntos([...adjuntos, { ...newAdjunto }]);
    setNewAdjunto({
      url_archivo: '',
      descripcion: '',
      tipo_archivo: 'pdf'
    });
  };
  
  const handleRemoveAdjunto = (index: number) => {
    const newAdjuntos = [...adjuntos];
    newAdjuntos.splice(index, 1);
    setAdjuntos(newAdjuntos);
  };
  
  return (
    <div className="space-y-8">
      {/* Photos Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-medium">
          {language === 'en' ? 'Tour Photos' : 'Fotos del Tour'}
        </h3>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="url_imagen">
                {language === 'en' ? 'Image URL' : 'URL de la Imagen'} <span className="text-destructive">*</span>
              </Label>
              <Input
                id="url_imagen"
                type="url"
                value={newFoto.url_imagen}
                onChange={(e) => setNewFoto({
                  ...newFoto,
                  url_imagen: e.target.value
                })}
                placeholder={language === 'en' ? 'https://example.com/image.jpg' : 'https://ejemplo.com/imagen.jpg'}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="descripcion_foto">
                {language === 'en' ? 'Description' : 'Descripción'}
              </Label>
              <Input
                id="descripcion_foto"
                value={newFoto.descripcion}
                onChange={(e) => setNewFoto({
                  ...newFoto,
                  descripcion: e.target.value
                })}
                placeholder={language === 'en' ? 'Beach view' : 'Vista a la playa'}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="orden_foto">
                {language === 'en' ? 'Order' : 'Orden'}
              </Label>
              <Input
                id="orden_foto"
                type="number"
                min={1}
                value={newFoto.orden}
                onChange={(e) => setNewFoto({
                  ...newFoto,
                  orden: parseInt(e.target.value) || 1
                })}
              />
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button 
              type="button" 
              onClick={handleAddFoto}
              disabled={!newFoto.url_imagen}
            >
              <Plus className="h-4 w-4 mr-2" />
              {language === 'en' ? 'Add Photo' : 'Agregar Foto'}
            </Button>
          </div>
        </div>
        
        {fotos.length > 0 && (
          <div className="space-y-4 mt-6">
            <h4 className="text-lg font-medium">
              {language === 'en' ? 'Added Photos' : 'Fotos Agregadas'}
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {fotos.map((foto, index) => (
                <div key={index} className="border rounded-md overflow-hidden">
                  <div className="aspect-video bg-muted relative overflow-hidden">
                    {foto.url_imagen && (
                      <img 
                        src={foto.url_imagen} 
                        alt={foto.descripcion || `Photo ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Image+Error';
                        }}
                      />
                    )}
                    <div className="absolute top-2 right-2 bg-background/80 rounded-full p-1">
                      <span className="text-xs font-medium px-2">{foto.orden || index + 1}</span>
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-sm truncate">{foto.descripcion || (language === 'en' ? 'No description' : 'Sin descripción')}</p>
                    <div className="flex justify-end mt-2">
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleRemoveFoto(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Attachments Section */}
      <div className="space-y-4 pt-8 border-t">
        <h3 className="text-xl font-medium">
          {language === 'en' ? 'Tour Attachments' : 'Adjuntos del Tour'}
        </h3>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="url_archivo">
                {language === 'en' ? 'File URL' : 'URL del Archivo'} <span className="text-destructive">*</span>
              </Label>
              <Input
                id="url_archivo"
                type="url"
                value={newAdjunto.url_archivo}
                onChange={(e) => setNewAdjunto({
                  ...newAdjunto,
                  url_archivo: e.target.value
                })}
                placeholder={language === 'en' ? 'https://example.com/document.pdf' : 'https://ejemplo.com/documento.pdf'}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tipo_archivo">
                {language === 'en' ? 'File Type' : 'Tipo de Archivo'}
              </Label>
              <Select 
                value={newAdjunto.tipo_archivo} 
                onValueChange={(value) => setNewAdjunto({
                  ...newAdjunto,
                  tipo_archivo: value
                })}
              >
                <SelectTrigger id="tipo_archivo">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="doc">Word</SelectItem>
                  <SelectItem value="xls">Excel</SelectItem>
                  <SelectItem value="other">{language === 'en' ? 'Other' : 'Otro'}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="descripcion_adjunto">
                {language === 'en' ? 'Description' : 'Descripción'}
              </Label>
              <Input
                id="descripcion_adjunto"
                value={newAdjunto.descripcion}
                onChange={(e) => setNewAdjunto({
                  ...newAdjunto,
                  descripcion: e.target.value
                })}
                placeholder={language === 'en' ? 'Tour itinerary' : 'Itinerario del tour'}
              />
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button 
              type="button" 
              onClick={handleAddAdjunto}
              disabled={!newAdjunto.url_archivo}
            >
              <Plus className="h-4 w-4 mr-2" />
              {language === 'en' ? 'Add Attachment' : 'Agregar Adjunto'}
            </Button>
          </div>
        </div>
        
        {adjuntos.length > 0 && (
          <div className="space-y-4 mt-4">
            <h4 className="text-lg font-medium">
              {language === 'en' ? 'Added Attachments' : 'Adjuntos Agregados'}
            </h4>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]"></TableHead>
                  <TableHead>
                    {language === 'en' ? 'File' : 'Archivo'}
                  </TableHead>
                  <TableHead>
                    {language === 'en' ? 'Description' : 'Descripción'}
                  </TableHead>
                  <TableHead>
                    {language === 'en' ? 'Type' : 'Tipo'}
                  </TableHead>
                  <TableHead className="text-right w-[80px]">
                    {language === 'en' ? 'Actions' : 'Acciones'}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {adjuntos.map((adjunto, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <FileText className="h-4 w-4" />
                    </TableCell>
                    <TableCell className="font-medium">
                      <a 
                        href={adjunto.url_archivo} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:underline text-primary"
                      >
                        {adjunto.url_archivo.split('/').pop() || adjunto.url_archivo}
                      </a>
                    </TableCell>
                    <TableCell>{adjunto.descripcion || '-'}</TableCell>
                    <TableCell>{adjunto.tipo_archivo?.toUpperCase() || '-'}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleRemoveAdjunto(index)}
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
    </div>
  );
};

export default TourMediaForm;
