import { useParams } from "react-router-dom"
import React, { useState, useEffect } from "react"
import { fetchComments, postComment } from "../reducers/blogsReducer"
import { useDispatch, useSelector } from "react-redux"
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  ListGroup,
} from "react-bootstrap"

const SingleBlog = ({ blogs, updateBlog, user }) => {
  const { id } = useParams()
  const blog = blogs.find((blog) => blog.id === id)
  const [comment, setComment] = useState("")
  const dispatch = useDispatch()

  useEffect(() => {
    if (blog) {
      dispatch(fetchComments(blog.id))
    }
  }, [dispatch, blog?.id])

  const handleCommentSubmit = (e) => {
    e.preventDefault()
    // console.log(comment)
    if (comment) {
      dispatch(postComment(id, comment))
      setComment("")
    }
  }

  if (!blog) {
    return <p>Blog not found.</p>
  }
  console.log(blog.comments)
  return (
    <div>
      {/* <h2>{blog.title}</h2>
            <p>Author: {blog.author}</p>
            <p>URL: {blog.url}</p>
            <p>
                Likes: {blog.likes}{" "}
                <button onClick={() => updateBlog(blog, user)} style={{ marginLeft: "10px" }}>
                    like
                </button>
            </p>
            <p>Added by: {blog.user.name}</p>

            <h3>Comments</h3>
            <form onSubmit={handleCommentSubmit}>
                <input
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <button type="submit">Add Comment</button>
            </form>
            <ul>
                {blog.comments && blog.comments.length > 0 ? (
                    blog.comments.map((comment, index) => (
                        <li key={index}>{comment}</li>
                    ))
                ) : (
                    <p>No comments</p>
                )}
            </ul> */}
      <Container className="my-5">
        <Card>
          <Card.Header>
            <h2>{blog.title}</h2>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={8}>
                <p>
                  <strong>Author:</strong> {blog.author}
                </p>
                <p>
                  <strong>URL:</strong>{" "}
                  <a href={blog.url} target="_blank" rel="noopener noreferrer">
                    {blog.url}
                  </a>
                </p>
                <p>
                  <strong>Likes:</strong> {blog.likes}
                  <Button
                    variant="outline-success"
                    size="sm"
                    className="ms-2"
                    onClick={() => updateBlog(blog, user)}
                  >
                    Like
                  </Button>
                </p>
                <p>
                  <strong>Added by:</strong> {blog.user.name}
                </p>
              </Col>
            </Row>

            <h3>Comments</h3>
            <Form onSubmit={handleCommentSubmit}>
              <Form.Group className="mb-3" controlId="commentInput">
                <Form.Control
                  type="text"
                  placeholder="Write your comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </Form.Group>
              <Button type="submit" variant="primary">
                Add Comment
              </Button>
            </Form>

            <ListGroup className="mt-4">
              {blog.comments && blog.comments.length > 0 ? (
                blog.comments.map((comment, index) => (
                  <ListGroup.Item key={index}>{comment}</ListGroup.Item>
                ))
              ) : (
                <p className="text-muted">No comments yet.</p>
              )}
            </ListGroup>
          </Card.Body>
        </Card>
      </Container>
    </div>
  )
}

export default SingleBlog
