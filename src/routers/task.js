const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = express.Router()

router.post('/tasks',auth,async (req,res)=>{
    //const task = new Task(req.body)
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try{
        await task.save()
        res.status(200).send(task)
    }
    catch(e){
        res.status(400).send(e)
    }

})

// GET /tasks?completed=true  returns all the completed tasks

// Pagination: limits and skips
// GET /tasks?limit=10&skip=10 returns only 10 reuslt...from 10-20
// GET /tasks?sortBy=createdAt:desc
router.get('/tasks',auth, async (req,res)=>{
    const match ={}
    const sort={}
    if(req.query.completed)
    {
        match.completed = req.query.completed == 'true'
    }
    if(req.query.sortBy){
        const parts = req.query.sortBy.split(':')
        sort[parts[0]]  = parts[1] === 'desc'? -1:1 //desc makes -1 and asc makes 1
    }
    try{
        //const tasks = await Task.find({owner: req.user._id})
        //await req.user.populate('tasks').execPopulate()
        await req.user.populate({
            path:'tasks',
            match,
            options:{
                limit:parseInt(req.query.limit),
                skip:parseInt(req.query.skip),
                sort/* :{
                    createdAt:-1 // descending order, +1 for ascending order
                } */
            }
        }).execPopulate()
        res.send(req.user.tasks)
    }
    catch(e){
        res.status(500).send()
    }

})

router.get('/tasks/:id',auth,async (req,res)=>{
    const _id = req.params.id
    try{
        //const task = await Task.findById(_id)
        const task = await Task.findOne({_id,owner:req.user._id})
        if(!task)
        {
            return res.status(404).send()
        }
        res.send(task)
    }
    catch(e){
        res.status(500).send()
    }

})

//update in tasks
router.patch('/tasks/:id',auth,async (req,res)=>{
    //properties that are allowed to change
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description','completed']
    const isValidOperation = updates.every((update)=>{
        return allowedUpdates.includes(update) 
    })

    if(!isValidOperation){
        return res.status(400).send({error:'Invalid update request'})
    }
    try{
        const task = await Task.findOne({_id:req.params.id, owner:req.user._id})
        //these three lines does the same thing as the findByIdAndUpdate
        //but since we wanted to access the middleware for handling some chacking before the
        //update, so we used this method as the moongoose library with findByIdandUpdate doesnt go through the middleware
        //const task = await Task.findById(req.params.id)
        

        //const user = await User.findByIdAndUpdate(req.params.id,req.body,{new: true,runValidators:true})
        if(!task)
        {
            return res.status(404).send()
        }
        updates.forEach((update)=>task[update] = req.body[update])
        await task.save()
        res.send(task)
    }catch(e){
        res.status(400).send(e)
    }
})

//Delete
router.delete('/tasks/:id',auth,async (req,res)=>{
    const _id = req.params.id
    try{
        const task = await Task.findOneAndDelete({_id:req.params.id,owner:req.user._id})
        if(!task)
        {
            return res.status(404).send()
        }
        res.send(task)
    }
    catch(e){
        res.status(500).send()
    }
})

module.exports = router