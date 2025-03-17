import { useState, useCallback } from "react";

export const useRefresh = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setRefreshKey(prevKey => prevKey + 1);

    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  return { refreshing, refreshKey, onRefresh };
};
