import { useState, useImperativeHandle, forwardRef } from "react"
import PropTypes from "prop-types"
import { Button } from "react-bootstrap"

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? "none" : "" }
  const showWhenVisible = { display: visible ? "" : "none" }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div style={{ textAlign: "center", marginBottom: "20px" }}>
      <div>
        <div style={hideWhenVisible}>
          <Button
            onClick={toggleVisibility}
            variant="primary"
            size="lg"
            style={{
              width: "200px",
              fontSize: "18px",
              padding: "10px 10px",
              marginBottom: "10px",
            }}
          >
            {props.buttonLabel}
          </Button>
        </div>
        <div style={showWhenVisible}>
          {props.children}
          <Button
            onClick={toggleVisibility}
            name="cancel"
            variant="danger"
            size="sm"
            style={{
              marginTop: "10px",
            }}
          >
            cancel
          </Button>
        </div>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

Togglable.displayName = "Togglable"
export default Togglable
