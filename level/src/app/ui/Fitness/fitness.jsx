'use client';
import {motion, AnimatePresence} from 'motion/react';
import {React, useState, useEffect} from 'react';
import './fitness.scss';
//import myList from '../../data';

const LOCAL_STORAGE_KEY = 'userRegimen';


const fitness = () => {
    const [regimen, setRegimen] = useState([]);
    const [newWorkoutName, setNewWorkoutName] = useState('');
    const [newExercise, setNewExercise] = useState({ id: null, description: '', note: '', completion: false, timeCompleted: null  });
    const [selectedWorkout, setSelectedWorkout] = useState(null);
    const [editWorkoutId, setEditWorkoutId] = useState(null);
    const [editWorkoutName, setEditWorkoutName] = useState('');
    
    // Load from data.js
    // useEffect(() => {
    //     const saved = myList;
    //     if (saved) {
    //         setRegimen(saved);
    //     }
    // }, []);

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
        if (!newExercise.description.trim()) return;

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
                            id: Date.now(),
                        },
                    ],
                }
                : item
            )
        );

        setNewExercise({ id: null, description: '', note: '', completion: false, timeCompleted: null });
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

    const itemsToShow = selectedWorkout ? regimen.filter((item) => item.id === selectedWorkout) : regimen;
    
    const handleBack = () => {
        setSelectedWorkout(null);
    };

    const handleDeleteWorkout = (workoutId) => {
        setRegimen(prev => prev.filter(workout => workout.id !== workoutId))
    };

    const handleDeleteExercise = (workoutId, exerciseId) => {
        setRegimen(prev => prev.map(workout => 
            workout.id === workoutId ? {
                ...workout,
                details: workout.details.filter(exercise => exercise.id !== exerciseId)
            } : workout
        ))
    };

    const handleEdit = (workoutId, currentName) => {
        setEditWorkoutId(workoutId)
        setEditWorkoutName(currentName)
    };

    const handleSave = () => {
        setRegimen(prev => prev.map(workout => 
            workout.id === editWorkoutId ? {
                ...workout,
                name: editWorkoutName,  // return a new object with updated name
            } : workout
        ));

        setEditWorkoutId(null); // exit edit mode
        setEditWorkoutName('');
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
                    value={newExercise.description}
                    onChange={(e) => setNewExercise({ ...newExercise, description: e.target.value })}
                    />
                    <input
                    className="wo-form-input"
                    type="text"
                    placeholder="Exercise description (optional)"
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
                    <button onClick={() => handleDeleteWorkout(workout.id)} className='wo-delete'>Delete</button>

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
                                {workout.details.map((excersise, index) => (
                                    
                                    <div className='wo-details' key={index}>
                                        {editWorkoutId === workout.id ? (
                                            <>
                                                <input 
                                                    value={editWorkoutName}
                                                    onChange={(e) => setEditWorkoutName(e.target.value)}
                                                />
                                                <button onClick={handleSave}>Save</button>
                                            </> ) : (
                                            <>
                                                <button
                                                    onClick={() => markCompleted(workout.id, index)}
                                                    className={`wo-completion ${
                                                        excersise.completion ? 'wo-completed' : ''
                                                    }`}
                                                ></button>
                                                <div className="wo-details-div">
                                                    <p className="wo-description">{excersise.description}</p>
                                                    {excersise.note ? <p className="wo-note">{excersise.note}</p> : null}
                                                    {excersise.completion ? <p className="wo-completion-note"><strong>Completed:</strong> {new Date(excersise.timeCompleted).toLocaleDateString()} - {new Date(excersise.timeCompleted).toLocaleTimeString()}</p> : null}
                                                </div>
                                                <button onClick={() => handleDeleteExercise(workout.id, excersise.id)} className='wo-delete'>Delete</button>
                                                <button onClick={() => handleEdit(workout.id, workout.name)}>Edit</button>
                                            </> )
                                        }
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