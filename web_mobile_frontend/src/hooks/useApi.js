import { useCallback, useState } from 'react';
import api from '../api/client';

// PUBLIC_INTERFACE
export default function useApi() {
  /** Hook to call API with loading/error state. */
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (config) => {
    setLoading(true);
    setError(null);
    try {
      const resp = await api(config);
      return resp.data;
    } catch (e) {
      setError(e);
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  return { request, loading, error };
}
