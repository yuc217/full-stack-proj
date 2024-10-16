import React, { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [detailsVisible, setDetailsVisible] = useState(false)
  const toggleDetails = () => {
    setDetailsVisible(!detailsVisible)
  }

  const handleLike = (event) => {
    event.preventDefault()
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    updateBlog(updatedBlog, user)
  }

  const handleDelete = async () => {
    const confirmDelete = window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`)
    if (confirmDelete) {
      deleteBlog(blog)
    }
  }

  return (
    <div style={blogStyle} data-testid='blog'>
      <div>
        {blog.title} {blog.author}
        <button data-testid="view" name="hideView" onClick={toggleDetails}>
          {detailsVisible ? 'hide' : 'view'}
        </button>
      </div>
      {detailsVisible && (
        <div>
          <p>URL: {blog.url}</p>
          <p><span data-testid="blog-likes">Likes: {blog.likes}</span>
          <button data-testid="like" name="like" onClick={handleLike}>like</button></p>
          <p>User: {blog.user.name}</p>
          {user && user.id === blog.user.id && (
            <button name="delete" onClick={handleDelete}>delete</button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog