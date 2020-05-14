// CRUD operation

/* const mongodb = require('mongodb')
const mongoClient = mongodb.MongoClient
const objectID = mongodb.ObjectID */

const{MongoClient,ObjectID} = require('mongodb')
const connectionURL ='mongodb://127.0.0.1:27017'
const databaseName='task-manager'
const id = new ObjectID()
console.log(id)
console.log(id.getTimestamp())

MongoClient.connect(connectionURL, {useNewUrlParser:true},(error,client)=>{
    if(error)
    {
        return console.log('Unable to connect to database')
    }
    console.log('Connected correctly!')

    /* const db = client.db(databaseName)
    db.collection('users').insertOne({
        name:'Bunty',
        age:32
    }, (error,result)=>{
        if(error){
            return console.log('Unable to insert')
        }
        console.log(result.ops)
    }) */

    // insert many
    /* const db = client.db(databaseName)
    db.collection('users').insertMany([{
        _id:id,
        name:'Bhabana',
        age:26},{
        _id:new ObjectID(),
        name:'Pooja',age:29
    }], (error,result)=>{
        if(error){
            return console.log('Unable to insert')
        }
        console.log(result.ops)
    }) */

    //read one
    /* const db = client.db(databaseName)
    db.collection('users').findOne({
        name:'Bhabana'}, (error,user)=>{
        if(error){
            return console.log('Unable to insert')
        }
        console.log(user)
    }) */

    /* const db = client.db(databaseName)
    db.collection('users').find({
        age:72}).toArray((error,user)=>{
        if(error){
            return console.log('Unable to insert')
        }
        console.log(user)
    })
    db.collection('users').find({
        age:72}).count((error,count)=>{
        if(error){
            return console.log('Unable to insert')
        }
        console.log(count)
    }) */

    // Update
    const db = client.db(databaseName)
    /* const updatePromise = db.collection('users').updateOne({
        _id: new ObjectID("5eb9b75ba60e025268245871")
    },{
        $set:{
            name:'Michael'
        }
    })

    updatePromise.then(()=>{
        console.log('name updated')
    }).catch(()=>{
        console.log('name update failed')
    }) */

    
    /* db.collection('users').updateOne({
        _id: new ObjectID("5eb9b75ba60e025268245871")
    },{
        $inc:{
            age:5
        }
    }).then(()=>{
        console.log('name updated')
    }).catch(()=>{
        console.log('name update failed')
    }) */


    //Update Many
    /* db.collection('users').updateMany({
        age: 72
    },{
        $set:{
            name:'Farad'
        },
        $inc:{
            age:3
        }
    }).then(()=>{
        console.log('ages updated')
    }).catch(()=>{
        console.log('ages update failed')
    }) */

    // Delete records
    db.collection('users').deleteMany({
        age:75
    }).then((result)=>{
        console.log(result)
    }).catch((error)=>{
        console.log(error)
    })

})