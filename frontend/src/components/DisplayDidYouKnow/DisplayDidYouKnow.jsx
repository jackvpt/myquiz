// CSS
import "./DisplayDidYouKnow.scss"

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLightbulb } from "@fortawesome/free-solid-svg-icons"

const DisplayDidYouKnow = ({ didYouKnow }) => {
  return (
    <section className="container__displaydidyouknow">
      <div className="container__displaydidyouknow--title">
        <FontAwesomeIcon icon={faLightbulb} size="xl" />
        <h2>Did You Know?</h2>
      </div>
      <p className="container__displaydidyouknow--text">{didYouKnow.text}</p>
    </section>
  )
}

export default DisplayDidYouKnow
