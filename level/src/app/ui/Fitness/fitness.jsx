'use client';
import {motion, AnimatePresence} from 'motion/react';
import {React, useState, useEffect} from 'react';
import './fitness.scss';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import Tooltip from '@mui/material/Tooltip';
//import myList from '../../data';

const LOCAL_STORAGE_KEY = 'userRegimen';


const fitness = () => {
    const [regimen, setRegimen] = useState([]);
    const [newWorkoutName, setNewWorkoutName] = useState('');
    const [newExercise, setNewExercise] = useState({ id: null, description: '', note: '', completion: false, timeCompleted: null  });
    const [selectedWorkout, setSelectedWorkout] = useState(null);
    const [editWorkoutId, setEditWorkoutId] = useState(null);
    const [editWorkoutName, setEditWorkoutName] = useState('');
    const [editExercise, setEditExercise] = useState({
        workoutId: null,
        exerciseId: null,
        desc: '',
        note: ''
    });
    
    // Load from data.js
    // useEffect(() => {
    //     const saved = myList;
    //     if (saved) {
    //         setRegimen(saved);
    //     }
    // }, []);

    // Load from localStorage when component mounts 
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

    const handleWorkoutEdit = (workoutId, currentName) => {
        setEditWorkoutId(workoutId)
        setEditWorkoutName(currentName)
    };

    const handleWorkoutSave = () => {
        setRegimen(prev => prev.map(workout => 
            workout.id === editWorkoutId ? {
                ...workout,
                name: editWorkoutName,  // return a new object with updated name
            } : workout
        ));

        setEditWorkoutId(null); // exit edit mode
        setEditWorkoutName('');
    };

    const handleExerciseSave = (workoutId, exerciseId, newDesc, newNote) => {
        setRegimen(prev => prev.map(workout => {
            if(workout.id === editExercise.workoutId){
                return {
                    ...workout,
                    details: workout.details.map(exercise => {
                        if(exercise.id === editExercise.exerciseId){
                            return {
                                ...exercise,
                                description: editExercise.desc,
                                note: editExercise.note,
                            };
                        }
                        return exercise;
                    })
                };
            }
            return workout;
        }))
        //Clears edit state
        setEditExercise({
            workoutId: null,
            exerciseId: null,
            desc: '',
            note: ''
        });
    };

    const handleEditExercise = (workoutId, exerciseId, newDesc, newNote) => {
        setEditExercise({
            workoutId,
            exerciseId,
            desc: newDesc,
            note: newNote
        })
    }

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
                    {editWorkoutId === workout.id ? (
                        <>  
                            <div className="wo-editing">
                                <input 
                                    className='wo-editing-input'
                                    value={editWorkoutName}
                                    onChange={(e) => setEditWorkoutName(e.target.value)}
                                />
                            </div>
                            <Tooltip title="Save" placement='right'>
                                <SaveIcon onClick={handleWorkoutSave} className='wo-saveBtn'></SaveIcon>
                            </Tooltip>
                        </> ) : (
                        <>
                            <button onClick={() => handleSelect(workout.id)} className="wo-option">
                                <p className="wo-title">{workout.name} {workout.details.some(detail => detail.completion) && <span className="checkmark">✓</span>} </p> &rarr;
                            </button>
                            <Tooltip title="Edit">
                                <EditIcon onClick={() => handleWorkoutEdit(workout.id, workout.name)} className='wo-editBtn'></EditIcon>
                            </Tooltip>
                            <Tooltip title="Delete">
                                <DeleteIcon onClick={() => handleDeleteWorkout(workout.id)} className='wo-deleteBtn'></DeleteIcon>
                            </Tooltip>
                        </> )
                    }
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
                                {workout.details.map((exercise, index) => (
                                    
                                    <div className='wo-details' key={index}>
                                        {editExercise.workoutId === workout.id && editExercise.exerciseId === exercise.id ? ( 
                                            <>
                                                <div className="wo-editing-ex">
                                                    <input 
                                                        className='wo-editing-input-desc'
                                                        type="text"
                                                        value={editExercise.desc}
                                                        onChange={(e) => setEditExercise((prev) => ({...prev, desc: e.target.value}))}
                                                    />
                                                    <input 
                                                        className='wo-editing-input-note'
                                                        type="text"
                                                        value={editExercise.note}
                                                        onChange={(e) => setEditExercise((prev) => ({...prev, note: e.target.value}))}
                                                    />
                                                </div>
                                                <Tooltip title="Save"  placement='right'>
                                                    <SaveIcon onClick={handleExerciseSave} className='wo-saveBtn'></SaveIcon> 
                                                </Tooltip>
                                            </> ) : ( <>
                                               <button
                                                    onClick={() => markCompleted(workout.id, index)}
                                                    className={`wo-completion ${
                                                        exercise.completion ? 'wo-completed' : ''
                                                    }`}
                                                ></button>
                                                <div className="wo-details-div">
                                                    <p className="wo-description">{exercise.description}</p>
                                                    {exercise.note ? <p className="wo-note">{exercise.note}</p> : null}
                                                    {exercise.completion ? <p className="wo-completion-note"><strong>Completed:</strong> {new Date(exercise.timeCompleted).toLocaleDateString()} - {new Date(exercise.timeCompleted).toLocaleTimeString()}</p> : null}
                                                </div>
                                                <Tooltip title="Edit">
                                                    <EditIcon onClick={() => handleEditExercise(workout.id, exercise.id, exercise.description, exercise.note)} className='wo-editBtn'></EditIcon>
                                                </Tooltip>
                                                <Tooltip title="Delete">
                                                    <DeleteIcon onClick={() => handleDeleteExercise(workout.id, exercise.id)} className='wo-deleteBtn'></DeleteIcon>
                                                </Tooltip>
                                            </> 
                                        )}
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