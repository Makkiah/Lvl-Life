'use client';
import {motion, AnimatePresence} from 'motion/react';
import {React, useState} from 'react';
import './fitness.scss';


const fitness = () => {

    const [selectedWorkout, setSelectedWorkout] = useState(null);

    let [regimen, setRegimen] = useState([
        {id: 1, name: "Cardio & Core", crap: false, details: [
            {discription: '5-minute stretch & warm up', note: 'You got this!', completion: true},
            {discription: 'Jog on the treadmill til you burn 100 calories', note: '', completion: false},
            {discription: '10 Burpees', note: '', completion: false},
            {discription: 'Stair Master for 10 Minutes', note: 'Only did 6 minutes instead', completion: false},
        ]},
        {id: 2, name: "Arms & Back", crap: false, details: [
            {discription: 'Jog on the treadmill til you burn 100 calories or more', note: '', completion: false},
        ]},
        {id: 3, name: "Legs & Shoulders", crap: false, details: [
            {discription: 'Stair Master for 10 Minutes', note: '', completion: false},
        ]}
    ])
      
    const handleSelect = (id) => {
        setSelectedWorkout(id === selectedWorkout ? null : id)
    }

    const markCompleted = (itemId, detailIndex) => {
        setRegimen((currState) =>
            currState.map((item) =>
            item.id === itemId
                ? {
                    ...item,
                    details: item.details.map((detail, i) =>
                    i === detailIndex ? { ...detail, completed: !detail.completed} : detail,
                    ),
                }
                : item
            )
        );
    };

    const itemsToShow = selectedWorkout
        ? regimen.filter((item) => item.id === selectedWorkout)
        : regimen;
    
    const handleBack = () => {
        setSelectedWorkout(null);
    };

    return (
        <div className="wo">
            {selectedWorkout && (
                <button className="wo-back" onClick={handleBack}>
                    &times;
                </button>
            )}
            
            {itemsToShow.map((workout, index) => (
                <motion.div
                    key={index}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="wo-div"
                >
                    <button onClick={() => handleSelect(workout.id)} className="wo-option">
                        <p className="wo-title">{workout.name}</p> &rarr;
                    </button>
                    <AnimatePresence>
                        {selectedWorkout === workout.id && (
                            <motion.div
                                key="details"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="wo-container"
                            >
                                {workout.details.map((work, index) => (
                                    <div className='wo-details' key={index}>
                                        <button
                                            onClick={() => markCompleted(workout.id, index)}
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
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            ))}
        </div>
    )
}

export default fitness