const { test, after, beforeEach, describe } = require('node:test')
const supertest = require('supertest')
const mongoose = require('mongoose')
const assert = require('node:assert')
const bcrypt = require('bcrypt')
const app = require('../app')
const api = supertest(app)
const listHelper = require('../utils/list_helper')
const User = require('../models/user')

beforeEach(async () => {
    await User.deleteMany({})
    let userObject = new User(listHelper.initialUsers[0])
    await userObject.save()
    userObject = new User(listHelper.initialUsers[1])
    await userObject.save()
})

describe('Test POST - adding new user', () => {
    test('users are returned as json', async () => {
        await api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('a valid user can be added', async () => {
        const newUser = {
            username: 'valid user',
            name: 'Anna',
            password: 'password1234567'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await listHelper.usersInDb()
        // console.log(usersAtEnd)
        const usernames = usersAtEnd.map(u => u.username)
        // check length
        assert.strictEqual(usersAtEnd.length, listHelper.initialUsers.length + 1)
        // check added username
        assert(usernames.includes(newUser.username))
    })

    test('invalid user - username too short', async () => {
        const invalidUser = {
          username: 'us',
          name: 'Henry',
          password: 'password1234567'
        }
      
        const result = await api
          .post('/api/users')
          .send(invalidUser)
          .expect(400)
        // console.log(result.body)
      })

      test('invalid user - password too short', async () => {
        const invalidUser = {
          username: 'usernamexxx',
          name: 'Simon',
          password: 'xx'
        }
      
        const result = await api
          .post('/api/users')
          .send(invalidUser)
          .expect(400)
    })

    test('invalid user - missing username or password', async () => {
        const invalidUser = {
          name: 'Simon'
        }
        const result = await api
         .post('/api/users')
         .send(invalidUser)
         .expect(400)
        // console.log(result)
    })
})

after(async () => {
    await mongoose.connection.close()
})