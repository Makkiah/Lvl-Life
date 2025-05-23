'use client';
import {React, useState} from 'react';
import './fitness.scss';

const fitness = () => {

    const [selectedWorkout, setSelectedWorkout] = useState(0);

    let [regimen, setRegimen] = useState([
        {id: 1, name: "Cardio & Core", details: [
            {discription: '5-minute stretch & warm up', note: 'You got this!', completion: true},
            {discription: 'Jog on the treadmill til you burn 100 calories', note: '', completion: false},
            {discription: '10 Burpees', note: '', completion: false},
            {discription: 'Stair Master for 10 Minutes', note: 'Only did 6 minutes instead', completion: false},
        ]},
        {id: 2, name: "Arms & Back", details: [
            {discription: 'Jog on the treadmill til you burn 100 calories', note: '', completion: false},
        ]},
        {id: 3, name: "Legs & Shoulders", details: [
            {discription: 'Stair Master for 10 Minutes', note: '', completion: false},
        ]}
    ])
      
    const handleSelect = (id) => {
        setSelectedWorkout(id === selectedWorkout ? null : id)
    }

    const markCompleted = (itemId, detailIndex) => {
        setRegimen((prevRegimen) =>
          prevRegimen.map((item) =>
            item.id === itemId
              ? {
                  ...item,
                  details: item.details.map((detail, i) =>
                    i === detailIndex ? { ...detail, completed: true } : detail
                  ),
                }
              : item
          )
        );
      };

    return (
        <div className="wo">
            {regimen.map((workout, index) => (
                <div className="wo-div" key={index}>
                    <button onClick={() => handleSelect(workout.id)} className="wo-option">
                        <p className="wo-title">{workout.name}</p> &rarr;
                    </button>

                    {selectedWorkout === workout.id && (
                        <div className="wo-container">
                            {workout.details.map((work, index) => (
                                <div className='wo-details' key={index}>
                                    <button
                                        onClick={() => markCompleted(workout.id, index)}
                                        disabled={workout.completed}
                                        className={`wo-completion ${
                                        work.completed ? 'wo-completed' : ''
                                        }`}
                                    ></button>

                                    <div className="wo-details-div">
                                        <p className="wo-discription">{work.discription}</p>
                                        {work.note ? <p className="wo-note">{work.note}</p> : null}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}

export default fitness