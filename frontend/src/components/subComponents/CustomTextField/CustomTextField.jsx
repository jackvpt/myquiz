import { useState } from "react"
import PropTypes from "prop-types"
import "./CustomTextField.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleXmark, faCopy } from "@fortawesome/free-solid-svg-icons"

const CustomTextField = ({
  id,
  label,
  value,
  onChange,
  type = "text",
  error,
  helperText = "",
  disabled = false,
  clearField = true,
  copy = false,
  multiline = false,
  rows = 4,
}) => {
  const [focused, setFocused] = useState(false)

  const isFilled = value && value.length > 0

  return (
    <div
      className={`container__customtextfield 
        ${focused ? "focused" : ""}
        ${isFilled ? "filled" : ""}
        ${error ? "error" : ""}
        ${disabled ? "disabled" : ""}
      `}
    >
      <label htmlFor={id}>{label}</label>
      <div className="container__customtextfield--input">
        <div className="container__customtextfield--input--copy-btn">
          {copy && isFilled && !disabled && (
            <button
              type="button"
              onClick={() => navigator.clipboard.writeText(value)}
              disabled={disabled}
            >
              <FontAwesomeIcon icon={faCopy} />
            </button>
          )}
        </div>
        {multiline ? (
          <textarea
            className="container__customtextfield--input--textarea"
            id={id}
            value={value}
            rows={rows}
            disabled={disabled}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChange={onChange}
          />
        ) : (
          <input
            className={
              type === "number"
                ? "container__customtextfield--input--number"
                : "container__customtextfield--input--input"
            }
            id={id}
            type={type}
            value={value}
            disabled={disabled}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChange={onChange}
          />
        )}
        {clearField && isFilled && !disabled && type !== "number" && (
          <button
            type="button"
            className="container__customfield--clear-btn"
            onClick={() => onChange({ target: { value: "" } })}
          >
            <FontAwesomeIcon icon={faCircleXmark} />
          </button>
        )}

        {helperText && <span className="helper">{helperText}</span>}
      </div>{" "}
    </div>
  )
}

CustomTextField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  helperText: PropTypes.string,
  disabled: PropTypes.bool,
  clearField: PropTypes.bool,
  copy: PropTypes.bool,
  multiline: PropTypes.bool,
  rows: PropTypes.number,
}

export default CustomTextField
