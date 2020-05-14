const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = express.Router()

// sign up
router.post('/users', async (req,res)=>{
    const user = new User(req.body)
    try{
        await user.save()
        const token = await user.generateAuthToken()

        res.status(200).send({user,token})
    }catch(e){
        res.status(400).send(e)
    }

})

// login
router.post('/users/login',async (req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthToken()

        //console.log(user)
        res.send({user,token})
        //const publicContent = user.getPublicProfile()
        //console.log(publicContent)
        //res.send({user: publicContent,token})
    }catch(e){
        res.status(400).send()
    }
})

//logout
router.post('/users/logout',auth,async (req,res)=>{
    try{
        // removes that specific token from the tokens array for that specific user. Hence the user cannot use
        // other older tokens to do any CRUD operations. The filter is used to return the tokens in the list for the user
        // which is different then the current token user by the user for this session
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !==req.token
        })
        // after removing that current token the user is resaved
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }

})

//logout from all sessions
router.post('/users/logoutAll',auth,async (req,res)=>{
    try{
        //remove all tokens
        req.user.tokens = []
        // after removing that current token the user is resaved
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }

})


//read...adding the middleware "auth" in between the path and the handler function
router.get('/users/me',auth, async (req,res)=>{
    //allow the users to access only their data based on their authentication
    res.send(req.user)
/* 
    try{
        const users = await User.find({})
        res.send(users)
    }
    catch(e){
        res.status(500).send()
    } */

/*     User.find({}).then((user)=>{
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }).catch((e)=>{
        res.status(500).send(e)
    }) */
})

//read specific user
router.get('/users/:id',async (req,res)=>{
    const _id = req.params.id
    try{
        const user = await User.findById(_id)
        if(!user)
        {
            return res.status(404).send()
        }
        res.send(user)
    }
    catch(e){
        res.status(500).send()
    }
/* 
    User.findById(_id).then((users)=>{
        res.send(users)
    }).catch((e)=>{
        res.status(500).send(e)
    }) */
})

//update in users
router.patch('/users/me',auth, async (req,res)=>{
    //properties that are allowed to change
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','email','password','age']
    const isValidOperation = updates.every((update)=>{
        return allowedUpdates.includes(update) 
    })

    if(!isValidOperation){
        return res.status(400).send({error:'Invalid update request'})
    }
    try{
        //these three lines does the same thing as the findByIdAndUpdate
        //but since we wanted to access the middleware for handling some chacking before the
        //update, so we used this method as the moongoose library with findByIdandUpdate doesnt go through the middleware
        //const user = await User.findById(req.params.id)

        updates.forEach((update)=>req.user[update] = req.body[update])
        await req.user.save()

        //const user = await User.findByIdAndUpdate(req.params.id,req.body,{new: true,runValidators:true})
        /* if(!user)
        {
            return res.status(404).send()
        } */
        res.send(req.user)
    }catch(e){
        res.status(400).send(e)
    }
})

//Delete
router.delete('/users/me',auth, async (req,res)=>{
    //const _id = req.params.id
    try{
        /* const user = await User.findByIdAndDelete(req.user._id)
        if(!user)
        {
            return res.status(404).send()
        } */
        await req.user.remove()
        res.send(req.user)
    }
    catch(e){
        res.status(500).send()
    }
})

const multer = require('multer')
const getStream = require('get-stream')
const streamToBuffer = require('stream-to-buffer')

const upload = multer({
    dest: 'avatars',   
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/))
        {
            return cb(new Error('Avatar must be in either jpg,jpeg or png format'))
        }
        cb(undefined,true)
    }
})

var fs = require("fs");

const sharp = require('sharp')
// adding both middleware: first authentication then second is file upload
router.post('/users/me/avatar', auth, upload.single('avatar'),async (req,res)=>{
    const img = fs.readFileSync(req.file.path)
    const encode_image = img.toString('base64');
    
    // resize the image and change to .png format from .jpg format using sharp module
    const buffer = await sharp(new Buffer(encode_image,'base64')).resize({width:250,height:250}).png().toBuffer()
    //req.user.avatar = new Buffer(encode_image,'base64')
    req.user.avatar = buffer
    await req.user.save()
    res.send()
    },(error,req,res,next)=>{
        res.status(400).send({error: error.message})
    })

router.delete('/users/me/avatar',auth, async(req,res)=>{
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})

router.get('/users/:id/avatar',async (req,res)=>{
    try{
        const user = await User.findById(req.params.id)
        if(!user||!user.avatar){
            throw new Error()
        }
        res.set('Content-Type','image/png')
        res.send(user.avatar)
    }catch(e){
        res.status(404).send()
    }
})

module.exports = router