// CSS
import "./CustomFileSelect.scss"

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFileImage } from "@fortawesome/free-solid-svg-icons"

const CustomFileSelect = ({ label, value, onChange, multiple = false }) => {
  const displayValue = () => {
    if (!value) return "No file selected"

    if (multiple && Array.isArray(value)) {
      if (!value.length) return "No file selected"

      return value
        .map((file) => {
          if (!file) return null
          if (file instanceof File) return file.name
          if (typeof file === "string") return file.split("/").pop()
          return null
        })
        .filter(Boolean)
        .join(", ")
    }

    if (value instanceof File) {
      return value.name
    }

    if (typeof value === "string") {
      return value.split("/").pop()
    }


    return "No file selected"
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
