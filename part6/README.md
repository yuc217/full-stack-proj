# part6 exercise 6.1 - 6.24

unicafe-redux 6.1-6.2

redux-anecdotes 6.3-6.19

query-anecdotes 6.20-6.24

React: Component-based structure with hooks (useState, useEffect, useReducer) for managing state and side effects.
Redux: Used Redux Toolkit for state management with createSlice to define reducers and actions. createAsyncThunk for handling asynchronous actions such as fetching and updating data.
React-Redux: Integrated Redux with React using useSelector to access state and useDispatch to dispatch actions.
React Query: Replaced Redux for fetching and mutating data with useQuery (for fetching data) and useMutation (for posting/updating data), improving state management for asynchronous operations.
Axios: Used to make HTTP requests to interact with the backend (e.g., fetching, posting, and updating anecdotes).
Notifications: Managed notifications using Redux and React Context + useReducer for global notification state management. Displayed notifications on actions like adding or voting on anecdotes, with a timeout for auto-dismissal.
Error Handling: Implemented error handling for failed API requests with notifications displayed to the user.
Backend Integration: Worked with json-server for a mock backend, implementing CRUD operations for anecdotes and handling constraints like content length validation.