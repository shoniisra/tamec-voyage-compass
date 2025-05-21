
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Destino } from '../types/tour';
import { useToast } from '@/components/ui/use-toast';

export const useDestinos = () => {
  const [destinos, setDestinos] = useState<Destino[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchDestinos = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const { data, error: supabaseError } = await supabase
          .from('destinos')
          .select('*')
          .order('pais', { ascending: true })
          .order('ciudad', { ascending: true });
        
        if (supabaseError) {
          throw supabaseError;
        }
        
        // Transform the data to match the Destino interface
        const transformedDestinos = data?.map(item => ({
          id: item.id,
          pais: item.pais,
          ciudad: item.ciudad,
          nombre: item.ciudad ? `${item.pais}, ${item.ciudad}` : item.pais
        })) || [];
        
        setDestinos(transformedDestinos);
      } catch (err: any) {
        console.error('Error fetching destinations:', err);
        setError('Failed to fetch destinations');
        toast({
          variant: "destructive",
          title: "Error loading destinations",
          description: err.message || "Please try again later.",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchDestinos();
  }, [toast]);
  
  return { destinos, loading, error };
};
