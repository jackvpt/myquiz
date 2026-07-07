// TableDidYouKnow.jsx
import "./TableDidYouKnow.scss"

const TableDidYouKnow = ({ didyouknows = [], onSelect }) => {
  return (
    <table className="container__table-didyouknow">
      <thead>
        <tr>
          <th>Référence</th>
          <th>Documentation</th>
          <th>Illustration</th>
          <th>Texte</th>
          <th>Difficulté</th>
          <th>Images</th>
        </tr>
      </thead>

      <tbody>
        {didyouknows.map((didyouknow) => (
          <tr key={didyouknow.reference} onClick={() => onSelect?.(didyouknow)}>
            <td>{didyouknow.reference}</td>

            <td>{didyouknow.documentation}</td>

            <td>{didyouknow.illustration}</td>

            <td className="text-cell">{didyouknow.text}</td>

            <td>
              <span
                className={`difficulty difficulty--${didyouknow.difficulty}`}
              >
                {didyouknow.difficulty}
              </span>
            </td>

            <td>
              <div className="images-cell">
                {didyouknow.images?.map((image, index) => (
                  <img key={index} src={image} alt="" />
                ))}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default TableDidYouKnow
