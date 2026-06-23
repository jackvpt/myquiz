// CSS
import "./DisplayDidYouKnow.scss"

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLightbulb, faBookmark } from "@fortawesome/free-solid-svg-icons"

const DisplayDidYouKnow = ({ didYouKnow }) => {
  console.log("DisplayDidYouKnow received didYouKnow:", didYouKnow)
  return (
    <section className="container__displaydidyouknow">
      <div className="container__displaydidyouknow--title">
        <FontAwesomeIcon icon={faLightbulb} size="xl" />
        <h2>Did You Know?</h2>
      </div>

      <div className="container__displaydidyouknow--content">
        {didYouKnow.contentIllustrationPreview && (
          <img
            className="container__displaydidyouknow--illustration"
            src={didYouKnow.contentIllustrationPreview}
            alt="Did You Know illustration"
          />
        )}
        <div className="container__displaydidyouknow--text">
          {didYouKnow.text}
        </div>
        <div className="container__displaydidyouknow--reference">
          <FontAwesomeIcon icon={faBookmark} size="lg"/>
          {didYouKnow.documentationRef}
        </div>
      </div>
    </section>
  )
}

export default DisplayDidYouKnow
