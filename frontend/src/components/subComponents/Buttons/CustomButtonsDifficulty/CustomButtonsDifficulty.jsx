// CSS
import "./CustomButtonsDifficulty.scss"

// Components
import CustomToggleButtons from "../CustomToggleButtons/CustomToggleButtons"

const CustomButtonsDifficulty = ({ value, onChange }) => {
  return (
    <div className="container__custom-buttons-difficulty">
      <div className="container__custom-buttons-difficulty--label">
        Difficulty
      </div>

      <div className="container__custom-buttons-difficulty--buttons">
        <CustomToggleButtons
          label="Type"
          options={[
            { label: "Easy", value: "easy" },
            { label: "Medium", value: "medium" },
            { label: "Hard", value: "hard" },
          ]}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  )
}

export default CustomButtonsDifficulty
