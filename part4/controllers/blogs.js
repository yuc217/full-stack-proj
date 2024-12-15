const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user
  if (!user) {
    return response.status(400).json({ error: 'User not found' })
  }

  if (!body.title || !body.url) {
    return response.status(400).json({ error: 'title or url missing' })
  }
  // const blog = new Blog({
  //   title: body.title,
  //   author: body.author,
  //   url: body.url,
  //   likes: body.likes || 0,
  //   user: user._id
  // })
  const blog = new Blog(request.body)
  blog.likes = blog.likes | 0
  blog.user = user
  
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  // delete only by the user who added it
  const user = request.user
  console.log(request.user) 
  try {
    const blog = await Blog.findById(request.params.id)

    if (!blog) {
      return response.status(404).json({ error: 'Blog not found' })
    }
    if (blog.user.toString() !== user.id.toString()) {
      return response.status(401).json({ error: 'Unauthorized: Only the creator can delete this blog' })
    }

    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (error) {
    return response.status(400).json({ error: 'Invalid ID' })
  }

})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  try {
    const res = await Blog.findById(request.params.id)

    if (res) {
      const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
      }
      const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true }).populate('user', { username: 1, name: 1 }) 
      response.json(updatedBlog)
    }
    else {
      response.status(404).end()
    }
  } catch (error) {
    response.status(500).json({ error: 'Update Error' });
  }
})

blogsRouter.post('/:id/comments', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' })
    }

    blog.comments.push(req.body.comment)
    await blog.save()
    res.status(200).json(blog)

  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

blogsRouter.get('/:id/comments', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' })
    }
    res.json(blog.comments)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

module.exports = blogsRouter