const jwt = require('jsonwebtoken')
const monngoose = require('mongoose')

const User = require('../../src/models/user')
const Task = require('../../src/models/task')

const userOneId = new monngoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'Phil Roulo',
    email: 'prouleau@gmail.com',
    password :'1234567',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_WEB_TOKEN)
    }]
}
const userTwoId = new monngoose.Types.ObjectId()
const userTwo = {
    _id: userTwoId,
    name: 'Pierre',
    email: 'pierre@gmail.com',
    password :'1234567',
    tokens: [{
        token: jwt.sign({ _id: userTwoId }, process.env.JWT_WEB_TOKEN)
    }]
}

// const taskOneId = new monngoose.Types.ObjectId()
const taskOne =  {
    _id : new monngoose.Types.ObjectId(),
    description: 'First task',
    completed :false,
    owner : userOne._id
}
const taskTwo =  {
    _id : new monngoose.Types.ObjectId(),
    description: 'First task',
    completed :false,
    owner : userOne._id
}

const taskThree =  {
    _id : new monngoose.Types.ObjectId(),
    description: 'First task',
    completed :false,
    owner : userOne._id
}
 const setupDatabase = async  () => {
    await User.deleteMany()
    await Task.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
  
    await new Task(taskOne).save()
    await new Task(taskTwo).save()
    await new Task(taskThree).save()
 }



 module.exports = {
    userOneId,
    userOne,
    setupDatabase
 }