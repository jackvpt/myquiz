// CSS
import "./CustomToggleButtons.scss"
import PropTypes from "prop-types"

const CustomToggleButtons = ({ options, value, onChange }) => {
  return (
    <div className="container__toggle-switch">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={`${
            value === option.value ? `active active-${option.value}` : ""
          }`}
          onClick={() =>
            onChange({
              target: {
                value: option.value,
              },
            })
          }
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

CustomToggleButtons.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.node.isRequired,
      value: PropTypes.any.isRequired,
    }),
  ).isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
}

export default CustomToggleButtons
