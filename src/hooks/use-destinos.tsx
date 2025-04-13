
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Destino } from '@/types/tour';

export const useDestinos = () => {
  const [destinos, setDestinos] = useState<Destino[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDestinos = async () => {
      setLoading(true);
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
      } catch (err) {
        console.error('Error fetching destinos:', err);
        setError('Failed to fetch destinations');
      } finally {
        setLoading(false);
      }
    };

    fetchDestinos();
  }, []);

  return { destinos, loading, error };
};
