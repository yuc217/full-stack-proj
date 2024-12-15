import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Card, Button } from "react-bootstrap"

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
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
    const confirmDelete = window.confirm(
      `Remove blog "${blog.title}" by ${blog.author}?`
    )
    if (confirmDelete) {
      deleteBlog(blog)
    }
  }

  return (
    // <div style={blogStyle} data-testid="blog">
    //   <div>
    //   <Link to={`/blogs/${blog.id}`}>
    //     {blog.title} by {blog.author}
    //   </Link>
    //     <button data-testid="view" name="hideView" onClick={toggleDetails}>
    //       {detailsVisible ? "hide" : "view"}
    //     </button>
    //   </div>
    //   {detailsVisible && (
    //     <div>
    //       <p>URL: {blog.url}</p>
    //       <p>
    //         <span data-testid="blog-likes">Likes: {blog.likes}</span>
    //         <button data-testid="like" name="like" onClick={handleLike}>
    //           like
    //         </button>
    //       </p>
    //       <p>User: {blog.user.name}</p>
    //       {user && user.id === blog.user.id && (
    //         <button name="delete" onClick={handleDelete}>
    //           delete
    //         </button>
    //       )}
    //     </div>
    //   )}
    // </div>
    <Card className="mb-3" data-testid="blog" style={{ width: "80%" }}>
      <Card.Body>
        <Card.Title>
          <Link to={`/blogs/${blog.id}`} className="text-decoration-none">
            {blog.title} by {blog.author}
          </Link>
          <Button
            data-testid="view"
            name="hideView"
            onClick={toggleDetails}
            variant="outline-secondary"
            size="sm"
            className="float-end"
          >
            {detailsVisible ? "Hide" : "View"}
          </Button>
        </Card.Title>
        {detailsVisible && (
          <>
            <Card.Text>URL: {blog.url}</Card.Text>
            <Card.Text>
              <span data-testid="blog-likes">Likes: {blog.likes}</span>{" "}
              <Button
                data-testid="like"
                name="like"
                onClick={handleLike}
                variant="success"
                size="sm"
              >
                Like
              </Button>
            </Card.Text>
            <Card.Text>User: {blog.user.name}</Card.Text>
            {user && user.id === blog.user.id && (
              <Button
                name="delete"
                onClick={handleDelete}
                variant="danger"
                size="sm"
              >
                Delete
              </Button>
            )}
          </>
        )}
      </Card.Body>
    </Card>
  )
}

export default Blog
