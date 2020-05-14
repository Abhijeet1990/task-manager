const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser:true,
    useCreateIndex: true
})

// Moongoose: objects to records
const User = mongoose.model('User',{
    name:{
        type: String,
        required:true,
        trim:true
    },
    age:{
        type: Number,
        validate(value){
            if(value < 0){
                throw new Error('Age must be positive number')
            }
        }
    },
    email:{
        type:String,
        required:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('invalid email')
            }
        }
    }
})

const me2 = new User({
    name:'chepat',
    email:'dasasfasfa@gmail.com',
    age:34
})

me2.save().then(()=>{
    console.log(me2)
}).catch((error)=>{
    console.log('Error',error)
})