const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const bcrypt = require('bcrypt')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const api = supertest(app)

const initialBlogs = [
    {
        title: 'First',
        author: 'Author',
        url: 'http://example.com/first',
        likes: 1
    },
    {
        title: 'Second',
        author: 'Author',
        url: 'http://example.com/second',
        likes: 9
    }
]

let header

beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    await api.post('/api/users').send(listHelper.initialUsers[0])
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()

    const res = await api
        .post('/api/login')
        .send({ username: listHelper.initialUsers[0].username, password: listHelper.initialUsers[0].password })
        .expect(200)
    header = { Authorization: `Bearer ${res.body.token}` }
})

describe.only('Test GET functionality', () => {
    test.only('blogs are returned as JSON', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test.only('returns the correct amount of blog posts', async () => {
        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body.length, initialBlogs.length)
    })

    test.only('unique id property of the blogs is named id', async () => {
        const blogs = await api.get('/api/blogs')
        // console.log(blogs.body)
        blogs.body.forEach((blog) => {
            assert.notStrictEqual(blog.id, undefined)
            assert.strictEqual(blog._id, undefined)
        })
    })
})

describe('Test POST functionality', () => {
    test('add a valid blog', async () => {
        const before = await api.get('/api/blogs')
        const lenBefore = before.body.length
        await api
            .post('/api/blogs')
            .send(listHelper.newBlog)
            .set(header)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const after = await api.get('/api/blogs')
        const lenAfter = after.body.length // check length 
        assert.strictEqual(lenAfter, lenBefore + 1)

        // check content
        const lastBlog = listHelper.lastBlog(after.body)
        assert.deepStrictEqual(lastBlog, listHelper.newBlog)
    })

    test('if the likes property is missing, defaults to 0', async () => {

        const response = await api
            .post('/api/blogs')
            .send({ title: 'New Blog Post', author: 'Cool', url: 'https://cool.com/' })
            .set(header)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const addBlog = response.body
        assert.strictEqual(addBlog.likes, 0)
    })

    test('if the title or url are missing, the backend sends 400', async () => {
        const newBlog = {
            author: 'Invalid Post'
        }
        const response = await api
            .post('/api/blogs')
            .send(newBlog)
            .set(header)
            .expect(400)
        // console.log(response.body)
    })

    test('should return 401 Unauthorized if token is not provided', async () => {
        const response = await api
            .post('/api/blogs')
            .send(listHelper.newBlog)
            .expect(401)
        assert.strictEqual(response.body.error, 'token missing')
    })
})

describe.only('Test DELETE functionality', () => {
    test.only('successfully deletes a blog with a valid ID', async () => {
    
        // add a blog for deletion
        const blogToDelete = {
            title: 'delete',
            author: 'delete',
            url: 'https://delete.com/',
            likes: 999
        }
        await api.post('/api/blogs')
            .send(blogToDelete)
            .set(header)
            .expect(201)
        const blogsBefore = await api.get('/api/blogs')
        const blog = await Blog.findOne({ title: blogToDelete.title })
        // console.log(blog)
        await api
            .delete(`/api/blogs/${blog.id}`)
            .set(header)
            .expect(204)

        // Check if the blog is really deleted
        const afterDelete = await api.get('/api/blogs')
        assert.strictEqual(afterDelete.body.length, blogsBefore.body.length - 1)

    })

    test('responds with 404 if blog does not exist', async () => {
        const id = '666666b329e53c4d2d222222'
        await api
            .delete(`/api/blogs/${id}`)
            .set(header)
            .expect(404)
    })

    test('responds with 400 if ID is invalid', async () => {
        const id = 'xxxxx111'
        await api
            .delete(`/api/blogs/${id}`)
            .set(header)
            .expect(400)
    })
})

describe('Test PUT (update) functionality', () => {
    test('successfully updates a blog with a valid ID', async () => {
        // get an ID
        const blogs = await api.get('/api/blogs')
        const updateBlog = blogs.body[0]
        // console.log(updateBlog)
        const newBlog = {
            title: 'First',
            author: 'Better Author',
            url: 'http://example.com/',
            likes: 1000,
            id: updateBlog.id
        }

        await api
            .put(`/api/blogs/${updateBlog.id}`)
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        // Check likes
        const afterUpdate = await api.get('/api/blogs')
        const updatedBlog = afterUpdate.body.find(b => b.id === updateBlog.id)
        assert.strictEqual(updatedBlog.likes, 1001)
    })

    test('responds with 404 if id does not exist already', async () => {
        const newBlog = {
            title: 'First',
            author: 'Better Author',
            url: 'http://example.com/',
            likes: 1000,
            id: '666666b329e53c4d2d222222'
        }
        await api
            .put(`/api/blogs/${newBlog.id}`)
            .send(newBlog)
            .expect(404)
    })

    test.only('responds with 500 if ID is invalid', async () => {
        const newBlog = {
            title: 'First',
            author: 'Better Author',
            url: 'http://example.com/',
            likes: 1000,
            id: '666666'
        }
        await api
            .put(`/api/blogs/${newBlog.id}`)
            .send(newBlog)
            .expect(500)
    })
})

after(async () => {
    await mongoose.connection.close()
})
