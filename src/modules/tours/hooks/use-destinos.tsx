
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Destino } from '@/modules/tours/types/tour';
import { useToast } from '@/components/ui/use-toast';

export const useDestinos = () => {
  const [destinos, setDestinos] = useState<Destino[]>([]);
  const [loading, setLoading] = useState(true);
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
          .order('pais', { ascending: true });
        
        if (supabaseError) {
          throw supabaseError;
        }
        
        if (data) {
          setDestinos(data);
        }
      } catch (err: any) {
        console.error('Error fetching destinos:', err);
        setError('Failed to fetch destinos');
        toast({
          variant: "destructive",
          title: "Error fetching destinations",
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
