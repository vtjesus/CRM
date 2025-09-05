import { useState, useEffect, useCallback } from "react";

const useInfiniteScroll = <T>(data: T[], batchSize = 20) => {
  const [displayedItems, setDisplayedItems] = useState<T[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);

  useEffect(() => {
    const initialBatch = data.slice(0, Math.min(batchSize, data.length));
    setDisplayedItems(initialBatch);
    setLoadedCount(initialBatch.length);
  }, [data, batchSize]);

  const isRowLoaded = useCallback(
    ({ index }: { index: number }) => index < loadedCount,
    [loadedCount]
  );

  const loadMoreRows = useCallback(
    async ({ startIndex: _startIndex }: { startIndex: number }) => {
      if (loadedCount >= data.length) return;

      const endIndex = Math.min(loadedCount + batchSize, data.length);
      const nextBatch = data.slice(loadedCount, endIndex);

      if (nextBatch.length > 0) {
        setDisplayedItems((prev) => [...prev, ...nextBatch]);
        setLoadedCount(endIndex);
      }
    },
    [data, loadedCount, batchSize]
  );

  const hasMore = loadedCount < data.length;
  const progress = data.length > 0 ? (loadedCount / data.length) * 100 : 0;

  return {
    itemsToDisplay: displayedItems,
    isRowLoaded,
    loadMoreRows,
    totalItems: data.length,
    loadedCount,
    hasMore,
    progress,
  };
};

export default useInfiniteScroll;
