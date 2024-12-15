import { useState } from "react"
import { Form, Button, Container } from "react-bootstrap"

const BlogForm = ({ createBlog, user }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const addBlog = async (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
      user: user,
    })
    setTitle("")
    setAuthor("")
    setUrl("")
  }

  return (
    // <form onSubmit={addBlog}>
    //   <div>
    //     title:
    //     <input
    //       value={title}
    //       onChange={({ target }) => setTitle(target.value)}
    //       placeholder="Enter title"
    //     />
    //   </div>
    //   <div>
    //     author:
    //     <input
    //       value={author}
    //       onChange={({ target }) => setAuthor(target.value)}
    //       placeholder="Enter author"
    //     />
    //   </div>
    //   <div>
    //     url:
    //     <input
    //       value={url}
    //       onChange={({ target }) => setUrl(target.value)}
    //       placeholder="Enter url"
    //     />
    //   </div>
    //   <button type="submit">create</button>
    // </form>
    <Container className="mt-5" style={{ maxWidth: "600px" }}>
      <h2 className="text-center mb-4">Create New Blog</h2>
      <Form onSubmit={addBlog}>
        <Form.Group className="mb-3" controlId="formBlogTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBlogAuthor">
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBlogUrl">
          <Form.Label>URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter URL"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            required
          />
        </Form.Group>

        <Button variant="success" type="submit" className="w-100">
          Create Blog
        </Button>
      </Form>
    </Container>
  )
}

export default BlogForm
