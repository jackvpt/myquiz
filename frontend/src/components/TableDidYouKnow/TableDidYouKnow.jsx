// TableDidYouKnow.jsx
import "./TableDidYouKnow.scss"

import { useDispatch } from "react-redux"
import { setEdited } from "../../store/features/didYouKnowSlice"

const TableDidYouKnow = ({ didyouknows = [] }) => {
  const dispatch = useDispatch()

  const handleSelect = (didyouknow) => {
    dispatch(setEdited(didyouknow.toEditableState()))
  }

  return (
    <table className="container__table-didyouknow">
      <thead>
        <tr>
          <th>Reference</th>
          <th>Documentation</th>
          <th>Texte</th>
          <th>Difficulty</th>
        </tr>
      </thead>

      <tbody>
        {didyouknows.map((didyouknow) => {
          return (
            <tr
              key={didyouknow.referenceId}
              onClick={() => handleSelect(didyouknow)}
            >
              <td>{didyouknow.referenceId}</td>
              <td>{didyouknow.documentationRef}</td>

              <td className="text-cell">{didyouknow.text}</td>

              <td>
                <span
                  className={`difficulty difficulty--${didyouknow.difficulty}`}
                >
                  {didyouknow.difficulty}
                </span>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default TableDidYouKnow
