export default function Calendar({ calendarLog }) {
  return (
    <div className="calendar">
      <h2>Workout History</h2>
      {calendarLog.map((entry, idx) => (
        <div key={idx} className="calendar-entry">
          <strong>{entry.date}</strong>
          <ul>
            {entry.completedWorkouts.map(workout => (
              <li key={workout.id}>
                {workout.name}: {workout.completedExercises.join(', ')}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
