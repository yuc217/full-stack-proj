import PropTypes from "prop-types"
import { Form, Button, Container } from "react-bootstrap"

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => {
  return (
    <div>
      {/* <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            placeholder="Enter username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password
          <input
            placeholder="Enter password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">login</button>
      </form> */}
      <Container className="mt-5" style={{ maxWidth: "400px" }}>
        <h2 className="text-center">Login</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={handleUsernameChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            Login
          </Button>
        </Form>
      </Container>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}

export default LoginForm
