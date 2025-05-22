import './workouts.css';


let regimen = [
  {name: "Cardio & Core"},
  {name: "Arms & Back"},
  {name: "Legs & Shoulders"}
]

export default function workouts() {
  return (
    <div className="page-wrapper">
      <main className="page-main">
        <div className="page-top">
          <h2 className="page-title">Workouts</h2>
        </div>
        <div className="page-content">
          <div className="wo">
            {regimen.map((workout, index) => (
                <div className="wo-option" key={workout.index}>
                    <p className="wo-title" key={workout.index}>{workout.name}</p> &rarr;
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
