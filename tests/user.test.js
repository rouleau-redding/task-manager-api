const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')

const { userOneId, userOne,  setupDatabase} = require('../tests/fixtures/db.js')
// console.log(userOneId, userOne,  setupDatabase)



beforeEach(async () =>{
    await setupDatabase()
} )
test('should signup a new user', async() => {
   const response = await request(app).post('/users').send(
        {
            name: 'Phil',
            email: 'philippe@rouleau-redding.com',
            password : '1234567'
        }).expect(201)

        const user = await User.findById(response.body.user._id)
        expect(user).not.toBeNull()
        expect(response.body).toMatchObject({
            user:{
                name:'Phil',
                email:'philippe@rouleau-redding.com'
            },
            token:  user.tokens[0].token
        })
        expect(user.password).not.toBe('1234567')
})
test('login user', async() => {
    const response = await request(app).post('/users/login').send(
         {
             email: userOne.email,
             password : userOne.password
         }).expect(200)
         const user = await User.findById(userOneId)
         expect(response.body.token).toBe(user.tokens[0].token)
         // expect(userOne.tokens[0].token).toBe(user.tokens[0].token)
 })
 test('Should Not Login Invalid User', async() => {
    await request(app).post('/users/login').send(
         {
             email: 'xxxxxxxxxxx',
             password : 'xxxxxxxxxxx'
         }).expect(400)
 })
 test('Should get profile for user', async() => {
     await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
 })
 test('Should not get profile for user', async() => {
    await request(app)
       .get('/users/me')
       .set('Authorization', `Bearer '123123123123123'`)
       .send()
       .expect(401)
})
test('Should close account when authenticated', async() => {
    await request(app)
       .delete('/users/me')
       .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
       .send()
       .expect(200)
        const user = await User.findById(userOneId)
        
        expect(user).toBeNull()
})

test('Should NOT close account when NOT authenticated', async() => {
    await request(app)
       .delete('/users/me')
       .send()
       .expect(401)
})

test('Should upload avatar image', async () => 
{
    await request(app)
    .post('/users/me/avatar')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .attach('avatar','tests/fixtures/profile-pic.jpg')
    .expect(200)
    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))

})

test('Should update account when authenticated', async() => {
    await request(app)
       .patch('/users/me')
       .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
       .send(
        {
            "age": 37,
            "name": "paul"
        }
    )
       .expect(200)
        const user = await User.findById(userOneId)
        
        expect(user.name).toEqual('paul')
        expect(user.age).toEqual(37)
})

test('Should not update invlid user field', async() => {
    await request(app)
       .patch('/users/me')
       .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
       .send(
        {
            "location": "Philafelphia"
        }
    )
       .expect(400)
      
})