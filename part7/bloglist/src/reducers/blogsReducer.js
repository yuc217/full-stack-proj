import { createSlice } from "@reduxjs/toolkit"
import blogService from "../services/blogs"

const blogsSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs: (state, action) => action.payload,
    addBlog: (state, action) => {
      state.push(action.payload)
    },
    updateBlog: (state, action) => {
      const { id, ...updatedData } = action.payload
      const blogIndex = state.findIndex((blog) => blog.id === id)
      if (blogIndex >= 0) {
        state[blogIndex] = { ...state[blogIndex], ...updatedData }
      }
    },
    deleteBlog: (state, action) => {
      return state.filter((blog) => blog.id !== action.payload)
    },
    setComments(state, action) {
      const { id, comments } = action.payload
      const blog = state.find((blog) => blog.id === id)
      if (blog) {
        blog.comments = comments
      }
    },
    addComment(state, action) {
      const { id, comment } = action.payload
      console.log("id:", id, "comment:", comment)
      const blog = state.find((blog) => blog.id === id)
      if (blog) {
        blog.comments.push(comment)
      }
    },
  },
})

export const {
  setBlogs,
  addBlog,
  updateBlog,
  deleteBlog,
  setComments,
  addComment,
} = blogsSlice.actions

export const allBlogs = () => async (dispatch) => {
  try {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  } catch (error) {
    console.error("Failed to get", error)
  }
}

export const createBlog = (blogObject) => async (dispatch) => {
  try {
    const newBlog = await blogService.create(blogObject)
    dispatch(addBlog(newBlog))
  } catch (error) {
    console.error("Failed to create", error)
  }
}

export const likeBlog = (id, updatedData) => async (dispatch) => {
  try {
    const updatedBlog = await blogService.update(id, updatedData)
    dispatch(updateBlog({ id, ...updatedBlog }))
  } catch (error) {
    console.error("Error liking blog", error)
  }
}

export const removeBlog = (id) => async (dispatch) => {
  try {
    await blogService.remove(id)
    dispatch(deleteBlog(id))
  } catch (error) {
    console.error("Error deleting", error)
  }
}

export const fetchComments = (id) => async (dispatch) => {
  const comments = await blogService.getComments(id)
  dispatch(setComments({ id, comments }))
}

export const postComment = (id, comment) => async (dispatch) => {
  const addedComment = await blogService.addComment(id, comment)
  dispatch(addComment({ id, comment }))
}

export default blogsSlice.reducer
