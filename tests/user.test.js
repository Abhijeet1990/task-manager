const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const {userOneId,userOne,setupDatabase} = require('../tests/fixtures/db')


/* const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const userOneId = new mongoose.Types.ObjectId()
console.log(userOneId)
console.log(process.env.JWT_SECRET)
const userOne = {
    _id:userOneId,
    name:'Mach',
    email:'mach@gmail.com',
    password:'mach1234',
    tokens:[{
        token: jwt.sign({_id:userOneId},process.env.JWT_SECRET)
    }]
} */

/* 
beforeEach(async ()=>{
    await User.deleteMany()
    await new User(userOne).save() // save one user which we can use for testing 
}) */
/* 
afterEach(()=>{
    console.log(
        'afterEach'
    )
}) */

beforeEach(setupDatabase)

test('should sign up new user',async()=>{
    const response=await request(app).post('/users').send({
        name:'Bhabana',
        email:'bhabana@gmail.com',
        password:'Bhabana1234'
    }).expect(200)

    // assert that the database was changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    // Assertions about the response
    //expect(response.body.user.name).toBe('Mach')
    expect(response.body).toMatchObject({
        user:{
            name:'Bhabana',
            email:'bhabana@gmail.com'
        },
        token:user.tokens[0].token
    })
    expect(user.password).not.toBe('Bhabana1234')
}) 
 
test('should login existing user',async()=>{
    const response = await request(app).post('/users/login').send({
        email:userOne.email,
        password:userOne.password
    }).expect(200)

    const user = await User.findById(response.body.user._id)
    expect(response.body.token).toBe(user.tokens[1].token) // during login the second token is compared
}) 

test('should not login non existent user',async()=>{
    await request(app).post('/users/login').send({
        email:userOne.email,
        password:'notmypassword'
    }).expect(400)
}) 

test('should get user profile',async()=>{
    await request(app)
        .get('/users/me')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not get profile for unauthenticated user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

test('Should delete account for user', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})

test('Should not delete account for unauthenticate user', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})

test('Should upload avatar image',async()=>{
    await request(app)
    .post('/users/me/avatar')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .attach('avatar','tests/fixtures/profile-pic.jpg')
    .expect(200)

    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Shouls update valid user fields',async()=>{
    await request(app)
    .patch('/users/me')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .send({
        name: 'Abhijeet'
    })
    .expect(200)

    const user = await User.findById(userOneId)
    expect(user.name).toEqual('Abhijeet')
})

test('Shouls not update invalid user fields',async()=>{
    await request(app)
    .patch('/users/me')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .send({
        location: 'Frankfurt'
    })
    .expect(400)
})


