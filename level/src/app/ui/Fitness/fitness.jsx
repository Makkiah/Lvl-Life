'use client';
import {motion, AnimatePresence} from 'motion/react';
import {React, useState, useEffect} from 'react';
import './fitness.scss';

const LOCAL_STORAGE_KEY = 'userRegimen';


const fitness = () => {
    const [regimen, setRegimen] = useState([]);
    const [newWorkoutName, setNewWorkoutName] = useState('');
    const [newExercise, setNewExercise] = useState({ discription: '', note: '', completion: false, timeCompleted: null  });
    const [selectedWorkout, setSelectedWorkout] = useState(null);
    


    // Load from localStorage
    useEffect(() => {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (saved) {
        setRegimen(JSON.parse(saved));
        }
    }, []);

    // Save to localStorage when regimen changes
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(regimen));
    }, [regimen]);

    const handleAddWorkout = () => {
        if (!newWorkoutName.trim()) return;

        const newWorkout = {
            id: Date.now(),
            name: newWorkoutName,
            details: [],
        };

        setRegimen((prev) => [...prev, newWorkout]);
        setNewWorkoutName('');
    };

    const handleAddExercise = () => {
        if (!newExercise.discription.trim()) return;

        setRegimen((prev) =>
            prev.map((item) =>
            item.id === selectedWorkout
                ? {
                    ...item,
                    details: [
                    ...item.details,
                    {
                        ...newExercise,
                        completion: false,
                    },
                    ],
                }
                : item
            )
        );

        setNewExercise({ discription: '', note: '', completion: false, timeCompleted: null });
    };


  

    
      
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
                    i === detailIndex ? { 
                        ...detail, 
                        completion: !detail.completion,
                        timeCompleted: !detail.completion ? Date.now() : null,
                    } : detail,
                        
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
            <div className="wo-form">
                <input
                className="wo-form-input"
                type="text"
                placeholder="New workout name"
                value={newWorkoutName}
                onChange={(e) => setNewWorkoutName(e.target.value)}
                />
                <button onClick={handleAddWorkout} className="wo-form-btn">Add Workout</button>
            </div>

            {selectedWorkout && (
                <div className="wo-form">
                    <input
                    className="wo-form-input"
                    type="text"
                    placeholder="Exercise title"
                    value={newExercise.discription}
                    onChange={(e) => setNewExercise({ ...newExercise, discription: e.target.value })}
                    />
                    <input
                    className="wo-form-input"
                    type="text"
                    placeholder="Exercise discription (optional)"
                    value={newExercise.note}
                    onChange={(e) => setNewExercise({ ...newExercise, note: e.target.value })}
                    />
                    <button onClick={handleAddExercise} className="wo-form-btn">Add Exercise</button>
                    <button className="wo-back" onClick={handleBack}>
                        &times;
                    </button>
                </div>
                
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
                        <p className="wo-title">{workout.name} {workout.details.some(detail => detail.completion) && <span className="checkmark">✓</span>} </p> &rarr;
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
                                                work.completion ? 'wo-completed' : ''
                                            }`}
                                        ></button>
                                        <div className="wo-details-div">
                                            <p className="wo-discription">{work.discription}</p>
                                            {work.note ? <p className="wo-note">{work.note}</p> : null}
                                            {work.completion ? <p className="wo-completion-note"><strong>Completed:</strong> {new Date(work.timeCompleted).toLocaleDateString()} - {new Date(work.timeCompleted).toLocaleTimeString()}</p> : null}
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