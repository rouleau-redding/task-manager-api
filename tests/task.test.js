const request = require('supertest')
// const jwt = require('jsonwebtoken')
// const monngoose = require('mongoose')
const app = require('../src/app')
const Task = require('../src/models/task')

const { userOneId, userOne,  setupDatabase} = require('../tests/fixtures/db.js')


beforeEach(async () =>  {
  await  setupDatabase()
} )

test('Shoud ', async () => {
    expect(1).toEqual(1)
})




// test('should create task for user', async () =>{
//     response = await request(app)
//     .post('/tasks')
//     .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
//     .send({
//         "description" : "Store in the production database"
//     })
//     .expect(201)
//     const task = await Task.findById(response.body._id) 
//     expect(task).not.toBeNull()
//     expect(task.completed).toEqual(false)
// })
