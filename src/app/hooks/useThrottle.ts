import { useRef } from "react";

export const useThrottle = (callback: () => void, delay: number) => {
    const lastCall = useRef(0);
  
    return () => {
      const now = new Date().getTime();
      if (now - lastCall.current >= delay) {
        callback();
        lastCall.current = now;
      }
    };
  };