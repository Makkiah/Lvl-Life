import Fitness from '../../ui/Fitness/fitness.jsx';

export default function workouts() {
  return (
    <div className="page-wrapper">
      <main className="page-main">
        <div className="page-top">
          <h2 className="page-title">Workouts</h2>
        </div>
        <div className="page-content">
          <Fitness/>
        </div>
      </main>
    </div>
  );
}
