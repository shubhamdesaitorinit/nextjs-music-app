"use client";

import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";

interface UseScrollType {
  isLoading: boolean;
  scrollIsLoading: boolean;
  changeOffset: () => void;
  setScrollLoading: (loading: boolean) => void;
  containerRef: React.RefObject<HTMLDivElement>;
}
const useScroll = ({
  isLoading,
  scrollIsLoading,
  setScrollLoading,
  containerRef,
  changeOffset,
}: UseScrollType): void => {
  const {
    songAction: { search },
  } = useSelector(({ song }: { song: SongStoreType }) => song);

  const handleScroll = useCallback(async (): Promise<void> => {
    if (containerRef?.current) {
      const scrollHeight = containerRef?.current?.scrollHeight;
      const scrollTop = containerRef?.current?.scrollTop;
      const clientHeight = containerRef?.current?.clientHeight;
      const isNotScrolledToBottom =
        Math.floor(scrollHeight - scrollTop) !== clientHeight;

      if (isLoading || isNotScrolledToBottom || scrollIsLoading || search) {
        return;
      }
      setScrollLoading(true);
      changeOffset();
      setScrollLoading(false);
    }
  }, [
    containerRef,
    isLoading,
    scrollIsLoading,
    search,
    setScrollLoading,
    changeOffset,
  ]);

  useEffect(() => {
    const containerDivRef = containerRef.current;
    if (containerDivRef) {
      containerDivRef.addEventListener("scroll", () => {
        void handleScroll();
      });
    }
    return () => {
      if (containerDivRef) {
        containerDivRef.removeEventListener("scroll", () => {
          void handleScroll();
        });
      }
    };
  }, [handleScroll, containerRef]);
};
export default useScroll;
