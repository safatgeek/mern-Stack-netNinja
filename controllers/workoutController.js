const Workout = require('../models/workoutModel')

//GET all workouts
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAT: -1})

    res.status(200).json(workouts)
}

//GET a single workout
const getSingleWorkout = async (req, res) => {
    const { id } = req.params

    try{
        const workout = await Workout.findById(id)

        if (!workout) {
            return res.status(404).json({error: 'No such workout'})
    
        }

        res.status(200).json(workout)
    }catch(error){
        console.log(error, "ERROR")
        res.status(500).json({error: error.message})
    }

    
}

//POST a new workout
const createWorkout = async (req, res) => {
    const {title, load, reps} = req.body

    // add doc to db
    try {
        const workout = await Workout.create({title, load, reps})
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// delete a workout


// update a workout


module.exports = {
    getWorkouts,
    getSingleWorkout,
    createWorkout
}