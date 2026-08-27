// CSS
import "./CustomButtonTrash.scss"

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"

const CustomButtonTrash = ({ onClick }) => {
  return (
    <button
      type="button"
      className="trash-button"
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faTrash} />
    </button>
  )
}

export default CustomButtonTrash
