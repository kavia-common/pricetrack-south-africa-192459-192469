import { useCallback, useState } from 'react';
import { apiGet, apiPost } from '../api/client';

/** 
 * PUBLIC_INTERFACE
 */
export default function useApi() {
  /** Hook to call API with loading/error state. */
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (config) => {
    setLoading(true);
    setError(null);
    try {
      const method = (config.method || 'GET').toUpperCase();
      const url = config.url;
      if (!url) throw new Error('useApi.request: url is required');

      if (method === 'GET') {
        return await apiGet(url);
      } else if (method === 'POST') {
        // accept data/body in config
        return await apiPost(url, config.data || config.body || {});
      } else if (method === 'DELETE' || method === 'PUT' || method === 'PATCH') {
        // Fallback to fetch for other verbs
        const res = await fetch(`${process.env.REACT_APP_API_BASE_URL || window.location.origin.replace(':3000', ':8080')}${url}`, {
          method,
          headers: {
            'Content-Type': 'application/json',
            ...(localStorage.getItem('accessToken') ? { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } : {}),
          },
          body: method === 'DELETE' ? undefined : JSON.stringify(config.data || config.body || {}),
          credentials: 'include',
        });
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`${method} ${url} failed: ${res.status} ${text}`);
        }
        return res.status === 204 ? null : await res.json();
      } else {
        throw new Error(`Unsupported method: ${method}`);
      }
    } catch (e) {
      setError(e);
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  return { request, loading, error };
}
