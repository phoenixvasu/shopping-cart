import { useState, useEffect, useCallback } from "react";

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const BATCH_DELAY = 100; // 100ms

class ApiCache {
  constructor() {
    this.cache = new Map();
    this.pendingRequests = new Map();
    this.batchTimeout = null;
    this.batchQueue = new Map();
  }

  async get(key, fetchFn) {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }

    // Check if there's already a pending request
    if (this.pendingRequests.has(key)) {
      return this.pendingRequests.get(key);
    }

    // Create a new promise for this request
    const promise = new Promise(async (resolve, reject) => {
      try {
        const data = await fetchFn();
        this.cache.set(key, {
          data,
          timestamp: Date.now(),
        });
        resolve(data);
      } catch (error) {
        reject(error);
      } finally {
        this.pendingRequests.delete(key);
      }
    });

    this.pendingRequests.set(key, promise);
    return promise;
  }

  batchRequest(key, fetchFn) {
    return new Promise((resolve, reject) => {
      if (!this.batchQueue.has(key)) {
        this.batchQueue.set(key, []);
      }

      this.batchQueue.get(key).push({ resolve, reject });

      if (this.batchTimeout) {
        clearTimeout(this.batchTimeout);
      }

      this.batchTimeout = setTimeout(async () => {
        const queue = this.batchQueue.get(key);
        this.batchQueue.delete(key);

        try {
          const data = await fetchFn();
          queue.forEach(({ resolve }) => resolve(data));
        } catch (error) {
          queue.forEach(({ reject }) => reject(error));
        }
      }, BATCH_DELAY);
    });
  }

  invalidate(key) {
    this.cache.delete(key);
  }

  clear() {
    this.cache.clear();
    this.pendingRequests.clear();
    this.batchQueue.clear();
  }
}

const apiCache = new ApiCache();

export const useApiCache = (key, fetchFn, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const result = await apiCache.get(key, fetchFn);
      setData(result);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [key, fetchFn]);

  useEffect(() => {
    fetchData();
  }, [...dependencies, fetchData]);

  const invalidate = useCallback(() => {
    apiCache.invalidate(key);
    fetchData();
  }, [key, fetchData]);

  return { data, loading, error, refetch: fetchData, invalidate };
};

export const useBatchRequest = (key, fetchFn) => {
  return useCallback(async () => {
    return apiCache.batchRequest(key, fetchFn);
  }, [key, fetchFn]);
};

export default apiCache;
