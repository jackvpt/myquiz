// TableDidYouKnow.jsx
import "./TableDidYouKnow.scss"

import { useSelector, useDispatch } from "react-redux"
import {
  setEdited,
  selectEditedDidYouKnow,
} from "../../store/features/didYouKnowSlice"

const TableDidYouKnow = ({ didyouknows = [] }) => {
  const dispatch = useDispatch()

  const editedDidYouKnow = useSelector(selectEditedDidYouKnow)

  const handleSelect = (didyouknow) => {
    dispatch(setEdited(didyouknow.toEditableState()))
  }

  return (
    <table className="container__table-didyouknow">
        <colgroup>
    <col style={{ width: "10%" }} />
    <col style={{ width: "30%" }} />
    <col style={{ width: "45%" }} />
    <col style={{ width: "15%" }} />
  </colgroup>
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
          const isSelected =editedDidYouKnow?.referenceId === didyouknow.referenceId

          return (
            <tr
              key={didyouknow.id}
              className={isSelected ? "selected" : ""}
              onClick={() => handleSelect(didyouknow)}
            >
              <td>{didyouknow.referenceId}</td>
              <td>{didyouknow.documentationRef}</td>

              <td className="container__table-didyouknow--text-cell">{didyouknow.text}</td>

              <td className="container__table-didyouknow--difficulty">
                <div
                  className={`difficulty difficulty--${didyouknow.difficulty}`}
                >
                  {didyouknow.difficulty}
                </div>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default TableDidYouKnow
