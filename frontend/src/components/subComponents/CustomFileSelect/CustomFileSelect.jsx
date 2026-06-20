// CSS
import "./CustomFileSelect.scss"

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFileImage } from "@fortawesome/free-solid-svg-icons"

const CustomFileSelect = ({ label, value, onChange, multiple = false }) => {
  const displayValue = () => {
    if (multiple && Array.isArray(value)) {
      return value.length
        ? value.map((file) => file.name).join(", ")
        : "No file selected"
    }

    if (value instanceof File) {
      return value.name
    }

    return value ? value.split("/").pop() : "No file selected"
  }

  return (
    <div className="container__fileselect">
      <div className="container__fileselect--label">{label}</div>
      <div className="container__fileselect--data">
        <button
          className="container__fileselect--data--button"
          type="button"
          onClick={() =>
            document
              .getElementById(label.toLowerCase().replace(" ", "-"))
              .click()
          }
        >
          <FontAwesomeIcon icon={faFileImage} size="xl" />
        </button>
        <div
          className="container__fileselect--data--filename"
          title={displayValue()}
        >
          {displayValue()}
        </div>
      </div>
      <input
        id={label.toLowerCase().replace(" ", "-")}
        type="file"
        aria-label="Choose image"
        accept=".jpg,.jpeg,.png"
        onChange={onChange}
        multiple={multiple}
        hidden
      />
    </div>
  )
}

export default CustomFileSelect
