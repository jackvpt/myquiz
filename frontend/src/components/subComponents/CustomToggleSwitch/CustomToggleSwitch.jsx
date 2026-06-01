// CSS
import "./CustomToggleSwitch.scss"
import PropTypes from "prop-types"

const CustomToggleSwitch = ({
  id,
  label,
  toggleLabels = [],
  checked,
  onChange,
  disabled = false,
}) => {
  return (
    <div className="container__toggleSwitch">
      <label htmlFor={id}>{label}</label>

      <div className="container__toggleSwitch--button-wrapper">
        <label htmlFor={toggleLabels[0]} className="toggle-labels">
          {toggleLabels[0]}
        </label>
        <button
          type="button"
          onClick={() => onChange({ target: { value: !checked } })}
          className={`container__toggleSwitch--button ${checked ? "active" : ""} ${disabled ? "toggle--disabled" : ""}`}
          aria-pressed={checked}
          disabled={disabled}
        >
          <span className="container__toggleSwitch--thumb" />
        </button>
        <label htmlFor={toggleLabels[1]} className="toggle-labels">
          {toggleLabels[1]}
        </label>
      </div>
    </div>
  )
}

CustomToggleSwitch.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
}

export default CustomToggleSwitch
