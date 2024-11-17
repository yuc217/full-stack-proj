import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'SHOW':
          return action.payload
        case 'CLEAR':
          return null
        default:
          return state
      }
  }

  const NotificationContext = createContext()

  export const useNotification = () => {
    return useContext(NotificationContext)
  }
  
  export const NotificationProvider = ({ children }) => {
    const [notification, dispatch] = useReducer(notificationReducer, null)
  
    return (
      <NotificationContext.Provider value={{ notification, dispatch }}>
        {children}
      </NotificationContext.Provider>
    )
  }

