import { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"
import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import BlogForm from "./components/BlogForm"
import Togglable from "./components/Togglable"

import { setNotification } from "./reducers/notificationsReducer"
import { useDispatch, useSelector } from "react-redux"
import {
  setBlogs,
  allBlogs,
  createBlog,
  likeBlog,
  removeBlog,
} from "./reducers/blogsReducer"
import { loginUser, logoutUser } from "./reducers/userReducer"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import User from "./components/User"
import UserList from "./components/UserList"
import SingleBlog from "./components/SingleBlog"

import "bootstrap/dist/css/bootstrap.min.css"
import { Button, Container, Nav, Navbar } from "react-bootstrap"

const App = () => {
  const dispatch = useDispatch()
  // const [blogs, setBlogs] = useState([])
  const blogs = useSelector((state) => state.blogs)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  // const [user, setUser] = useState(null)
  const user = useSelector((state) => state.user)
  // const [notif, setNotif] = useState({ message: null, type: null })
  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      // console.log(user)
      // setUser(user)
      dispatch(loginUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  // useEffect(() => {
  //   const fetchBlogs = async () => {
  //     try {
  //       const blogs = await blogService.getAll()
  //       const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
  //       setBlogs(sortedBlogs)
  //     } catch (error) {
  //       console.error("Failed to fetch blogs:", error)
  //     }
  //   }
  //   fetchBlogs()
  // }, [])
  useEffect(() => {
    dispatch(allBlogs())
  }, [dispatch])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      // window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user))
      dispatch(loginUser(user))
      blogService.setToken(user.token)
      // setUser(user)
      setUsername("")
      setPassword("")
      dispatch(setNotification("Successful login!", 5))
      // handleNotification("successful login!", "success")
    } catch (error) {
      dispatch(setNotification("wrong username or password!", 5))
      console.log("Login error:", error.response.data)
      // handleNotification("wrong username or password", "error")
    }
  }

  const updateBlog = async (blog, user) => {
    // console.log("Updating blog:", blog)
    // try {
    //   const returnedBlog = await blogService.update(blog.id, blog)
    //   setBlogs(
    //     blogs
    //       .map((b) => (b.id === blog.id ? returnedBlog : b))
    //       .sort((a, b) => b.likes - a.likes)
    //   ) // dynamically displaying sorted blogs
    // } catch (error) {
    //   console.log("Error updating blog:", error.message)
    // }
    dispatch(likeBlog(blog.id, { ...blog, likes: blog.likes + 1 }))
  }

  const deleteBlog = async (blog) => {
    // console.log("Deleted blog:", blog)
    try {
      // await blogService.remove(blog.id)
      // const newBlogs = blogs.filter((cur) => cur.id !== blog.id)
      // setBlogs(newBlogs)
      dispatch(removeBlog(blog.id))
      dispatch(setNotification(`Deleted blog "${blog.title}"`, 5))
      // handleNotification(`Deleted blog "${blog.title}"`, "success")
    } catch (error) {
      // handleNotification("Failed to delete", "error")
      dispatch(setNotification("Failed to delete", 5))
      console.error("Error deleting blog:", error)
    }
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      // const returnedBlog = await blogService.create(blogObject)
      // setBlogs(blogs.concat(returnedBlog))
      dispatch(createBlog(blogObject))
      // handleNotification(
      //   `A new blog "${returnedBlog.title}" by ${returnedBlog.author} added!`,
      //   "success"
      // )
      dispatch(setNotification(`A new blog "${blogObject.title}" added!`, 5))
    } catch (error) {
      // handleNotification(`Failed to add blog: ${error.message}`, "error")
      dispatch(setNotification(`Failed to add blog: ${error.message}`, 5))
    }
  }

  const handleLogout = () => {
    // window.localStorage.clear()
    // setUser(null)
    dispatch(logoutUser())
  }

  // const handleNotification = (message, type) => {
  //   setNotif({ message, type })
  //   setTimeout(() => {
  //     setNotif({ message: null, type: null })
  //   }, 4000)
  // }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </div>
    )
  }

  return (
    <Router>
      <div>
        {/* <nav>
          <Link to="/" > Blogs </Link>
          <Link to="/users" > Users </Link>
          {user ? (
            <>
              <span>{user.name} logged in</span>
              <button onClick={handleLogout} style={{ alignSelf: 'center' }}>Logout</button>
            </>
          ) : (
            <Link to="/login" >Login</Link>
          )}
        </nav> */}
        <Navbar bg="light" expand="lg" style={{ marginBottom: "20px" }}>
          <Container>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Blogs
              </Nav.Link>
              <Nav.Link as={Link} to="/users">
                Users
              </Nav.Link>
            </Nav>
            <Nav>
              {user ? (
                <>
                  <span style={{ marginRight: "10px" }}>
                    {user.name} logged in
                  </span>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
              )}
            </Nav>
          </Container>
        </Navbar>

        <h2>Blogs</h2>
        <Notification />
        {/* <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <p>{user.name} logged in</p>
            <button onClick={handleLogout}>logout</button>
          </div> */}
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <Togglable buttonLabel="create new blog" ref={blogFormRef}>
                  <BlogForm createBlog={addBlog} user={user} />
                </Togglable>
                {blogs.map((blog) => (
                  <Blog
                    key={blog.id}
                    blog={blog}
                    updateBlog={updateBlog}
                    deleteBlog={deleteBlog}
                    user={user}
                  />
                ))}
              </div>
            }
          />
          <Route path="/users" element={<User />} />
          <Route path="/users/:id" element={<UserList blogs={blogs} />} />
          <Route
            path="/blogs/:id"
            element={
              <SingleBlog blogs={blogs} updateBlog={updateBlog} user={user} />
            }
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
