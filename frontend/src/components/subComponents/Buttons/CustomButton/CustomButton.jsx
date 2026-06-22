import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faPlus,
  faPen,
  faTrash,
  faRotateLeft,
} from "@fortawesome/free-solid-svg-icons"

import "./CustomButton.scss"

const actionConfig = {
  create: {
    label: "Add",
    colorKey: "buttonAdd",
    icon: faPlus,
  },
  update: {
    label: "Update",
    colorKey: "buttonUpdate",
    icon: faPen,
  },
  delete: {
    label: "Delete",
    colorKey: "buttonDelete",
    icon: faTrash,
  },
  reset: {
    label: "Reset",
    colorKey: "buttonReset",
    icon: faRotateLeft,
  },
}

const CustomButton = ({
  action = "create",
  loading = false,
  disabled = false,
  children,
  ...props
}) => {
  const config = actionConfig[action]

  return (
    <button
      className={`container__custom-button ${action}`}
      onClick={props.onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="container__custom-button--loader" />
      ) : (
        <FontAwesomeIcon icon={config.icon} />
      )}

      <span>{children || config.label}</span>
    </button>
  )
}

export default CustomButton
