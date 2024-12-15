import { useParams } from "react-router-dom"
import { Container, Row, Col, Card, ListGroup } from "react-bootstrap"

const UserList = ({ blogs }) => {
  const { id } = useParams()

  const userBlogs = blogs.filter((blog) => blog.user.id === id)

  if (userBlogs.length === 0) {
    return <p>No blogs found.</p>
  }

  return (
    // <div>
    //   <h2>{userBlogs[0].user.name}</h2>
    //   <h3>Added blogs</h3>
    //   <ul>
    //     {userBlogs.map((blog) => (
    //       <li key={blog.id}>{blog.title}</li>
    //     ))}
    //   </ul>
    // </div>
    <Container style={{ marginTop: "20px" }}>
      <Card>
        <Card.Body>
          <Row>
            <Col>
              <Card.Title style={{ textAlign: "center" }}>
                {userBlogs[0].user.name}
              </Card.Title>
              <Card.Subtitle
                className="mb-2 text-muted"
                style={{ textAlign: "center" }}
              >
                Added blogs
              </Card.Subtitle>
              <ListGroup variant="flush">
                {userBlogs.map((blog) => (
                  <ListGroup.Item key={blog.id}>{blog.title}</ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default UserList
