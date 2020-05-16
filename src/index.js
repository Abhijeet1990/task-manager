const app = require('./app')
/* const express = require('express')
require('./db/mongoose_original')
const User = require('./models/user')
const Task = require('./models/task')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express() */
const port = process.env.PORT //|| 3000

app.listen(port,()=>{
    console.log('Server is up on port '+port)
})

/* const multer = require('multer')

const upload = multer({
    dest:'images',
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,cb){
        //if(!file.originalname.endsWith('.pdf'))
        if(file.originalname.match(/\.(doc|docx)$/))
        {
            return cb(new Error('File must be a PDF'))
        }
        cb(undefined,true)
    }
})

const errorMiddleware = (req,res,next)=>{
    throw new Error('From my middleware')
}

app.post('/upload',upload.single('upload'), (req,res)=>{
//app.post('/upload',errorMiddleware, (req,res)=>{
    res.send()
},(error,req,res,next)=>{
    res.status(400).send({error: error.message})
}) */

/* //site maintenance
app.use((req,res,next)=>{
    res.status(503).send('Site is currently down. Check back soon!')
}) */


/*  app.use((req,res,next)=>{
    console.log(req.method,req.path)

    // blocking specific methods to go to the route handlers, for example in the "GET"
    if(req.method ==='GET'){
        res.send('GET requests are disabled')
    }else{
        next()
    }
    // in the next, we run the different route handler
    //next()
}) */

/* app.use(express.json())
app.use(userRouter)
app.use(taskRouter) */

//
// without middleware: new request -> run route handler
//
// with middleware: new request -> do something -> run route handler
// in this "do something" user would be prevented to run route handler if the user is not authenticated using these web 
// tokens.


//const main = async ()=>{
    // get the owner of the task based on task id
    /* const task = await Task.findById('5ebbcefda796224a543f53da')
    await task.populate('owner').execPopulate()
    console.log(task.owner) */

    //get the task information based on the owner id
  //  const user = await User.findById('5ebb9630f555592e8821251b')
   // await user.populate('tasks').execPopulate()
   // console.log(user.tasks)

//}
//main()
/* const bcrypt = require('bcryptjs') 
const myFunction = async()=>{
    const password = 'Red12345!'
    const hashedPassword = await bcrypt.hash(password, 8)
    const isMatch=await bcrypt.compare(password,hashedPassword)
    console.log(isMatch)
}
myFunction() */

/* const jwt = require('jsonwebtoken')
const myfunction = async()=>{
    const token = jwt.sign({_id:'3455feferf'},'thisismynewcourse',{expiresIn:'2 second'}) // usually the user id is stored..second value is signature
    console.log(token)

    const data = jwt.verify(token,'thisismynewcourse')
    console.log(data)


} 

myfunction()*/
/* 
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'dummy@gmail.com',
    pass: 'dummy'
  }
});

var mailOptions = {
  from: 'dummy@gmail.com',
  to: 'dummy2@tamu.edu',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  }); */