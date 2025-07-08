import { useEffect } from 'react';

export function useDailyReset(lastResetDate, onReset) {
  // React hook that watches the date and calls `onReset()` if a new day starts
  useEffect(() => {
    const today = new Date().toDateString();

    if (lastResetDate !== today) {
      // If the saved date is NOT today, trigger reset
      onReset(today);
    }
  }, [lastResetDate, onReset]); 
}
