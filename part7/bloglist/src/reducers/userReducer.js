import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser: (state, action) => action.payload,
    clearUser: () => null,
  },
})

export const { setUser, clearUser } = userSlice.actions

export const loginUser = (user) => (dispatch) => {
  dispatch(setUser(user))
  window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user))
}

export const logoutUser = () => (dispatch) => {
  dispatch(clearUser())
  window.localStorage.removeItem("loggedBlogappUser")
}

export default userSlice.reducer
