import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    showNotification(state, action) {
      return action.payload.message
    },
    clearNotification() {
      return null
    },
  },
})

export const { showNotification, clearNotification } = notificationSlice.actions

export const setNotification = (message, duration) => {
  return (dispatch) => {
    dispatch(showNotification({ message }))
    setTimeout(() => {
      dispatch(clearNotification())
    }, duration * 1000) // in seconds -> ms
  }
}

export default notificationSlice.reducer
