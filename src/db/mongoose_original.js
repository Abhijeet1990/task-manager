const mongoose = require('mongoose')
const validator = require('validator')

//mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})
/*  
const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
}) */

