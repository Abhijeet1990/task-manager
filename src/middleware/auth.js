const jwt = require('jsonwebtoken')
const User = require('../models/user')
const auth = async (req,res,next)=>{
    try{
        //extract the token from the Authorization field and replace the starting "Bearer " by ""
        const token = req.header('Authorization').replace('Bearer ','')

        //decode the token
        const decoded = jwt.verify(token,'thisismynewtesting')

        // find the user with the unique id and the unique authentication token available with that user
        console.log(decoded._id)
        const user = await User.findOne({_id:decoded._id,'tokens.token': token})

        if(!user){
            throw new Error()
        }

        // if the user proved its token .. just go ahead and run the handlers
        req.token = token
        req.user = user
        next()

    }catch(e){
        res.status(401).send({error: 'Please authenticate'})
    }
}

module.exports = auth