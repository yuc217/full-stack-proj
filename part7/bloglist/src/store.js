import { configureStore } from "@reduxjs/toolkit"
import blogsReducer from "./reducers/blogsReducer"
import userReducer from "./reducers/userReducer"
import notificationsReducer from "./reducers/notificationsReducer"

const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    notification: notificationsReducer,
    user: userReducer,
  },
})

export default store
