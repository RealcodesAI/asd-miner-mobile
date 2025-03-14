import { useState } from "react";

export default function useRefresh(callback: () => void, delay: number = 1500) {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      callback(); // Gọi callback để làm mới dữ liệu thực tế
      setRefreshing(false);
    }, delay);
  };

  return { refreshing, onRefresh };
}
