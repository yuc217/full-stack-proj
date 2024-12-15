import React, { useEffect, useState } from "react"
import userService from "../services/users"
import { Link } from "react-router-dom"
import { Table } from "react-bootstrap"

const User = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await userService.getAll()
      setUsers(fetchedUsers)
    }

    fetchUsers()
  }, [])

  return (
    <div>
      <h2>Users</h2>
      <Table striped bordered hover size="sm" style={{ marginTop: "15px" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`} className="text-decoration-none">
                  {user.name}
                </Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default User
