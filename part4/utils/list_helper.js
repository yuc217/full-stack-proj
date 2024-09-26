const User = require('../models/user')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }
  const favorite = blogs.reduce((prev, current) => (prev.likes > current.likes) ? prev : current)
  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  }
}

const _ = require('lodash')

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }
  const count = _.countBy(blogs, 'author')
  const resultAuthor = _.maxBy(_.entries(count), ([author, blogs]) => blogs)
  return {
    author: resultAuthor[0],
    blogs: resultAuthor[1],
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  const groupAuthor = _.groupBy(blogs, 'author')
  const groupLikes = _.map(groupAuthor, (authorBlogs, author) => {
    return {
      author: author,
      likes: _.sumBy(authorBlogs, 'likes')
    }
  })
  return _.maxBy(groupLikes, 'likes')
}

const lastBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  const last = blogs[blogs.length - 1]
  return {
    title: last.title,
    author: last.author,
    url: last.url,
    likes: last.likes
  }
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const initialUsers = [
  {
    username: 'Ihmish Tiehesh',
    name: 'tensi',
    password: 'password1'
  },
  {
    username: 'Vaiksidfhsdf Monet',
    name: 'Ensidk',
    password: 'password2'
  }
]

const newBlog = {
  title: 'New Blog Post',
  author: 'Cool',
  url: 'https://cool.com/',
  likes: 43
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  lastBlog,
  usersInDb,
  initialUsers,
  newBlog
}
