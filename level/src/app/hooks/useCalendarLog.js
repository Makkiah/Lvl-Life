import { useEffect } from 'react';

export function useCalendarLog(regimen, logCompleted) {
  // React hook that scans the regimen and logs any completed exercises

  useEffect(() => {
    const completedToday = regimen
      .filter(workout => workout.details.some(detail => detail.completion))
      .map(workout => ({
        id: workout.id,
        name: workout.name,
        completedExercises: workout.details
          .filter(detail => detail.completion)
          .map(detail => detail.description)
      }));

    if (completedToday.length > 0) {
      logCompleted(completedToday);
    }
  }, [regimen, logCompleted]);
}
