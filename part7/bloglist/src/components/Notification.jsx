import { useSelector } from "react-redux"
import { Alert } from "react-bootstrap"

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  // console.log(notification)
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  }

  if (!notification) {
    return null
  }

  return (
    // <div style={style}>
    //   {notification}
    // </div>
    <Alert
      variant="info"
      style={{
        fontSize: "14px",
        marginBottom: "15px",
        textAlign: "center",
      }}
    >
      {notification}
    </Alert>
  )
}

export default Notification
