// CSS
import "./DisplayDidYouKnow.scss"

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLightbulb, faBookmark } from "@fortawesome/free-solid-svg-icons"
import ImageCarousel from "../ImageCarousel/ImageCarousel"

const DisplayDidYouKnow = ({ didYouKnow }) => {
  return (
    <section className="container__displaydidyouknow">
      {/* TITLE */}
      <div className="container__displaydidyouknow--title">
        <FontAwesomeIcon icon={faLightbulb} size="lg" />
        <h2>Did You Know?</h2>
      </div>

      {/* CONTENT */}
      <div className="container__displaydidyouknow--content">
        {/* DIFFICULTY */}
        <div className="container__displaydidyouknow--content--difficulty">
          <span
            className={`difficulty-light easy ${
              didYouKnow.difficulty === "easy" ? "active" : ""
            }`}
          />
          <span
            className={`difficulty-light medium ${
              didYouKnow.difficulty === "medium" ? "active" : ""
            }`}
          />
          <span
            className={`difficulty-light hard ${
              didYouKnow.difficulty === "hard" ? "active" : ""
            }`}
          />{" "}
        </div>

        {/* ILLUSTRATION */}
        <div>
          {didYouKnow.contentIllustrationPreview && (
            <img
              className="container__displaydidyouknow--content--illustration"
              src={didYouKnow.contentIllustrationPreview}
              alt="Did You Know illustration"
            />
          )}
        </div>

        {/* TEXT */}
        <div className="container__displaydidyouknow--content--text">
          {didYouKnow.text}
        </div>

        {/* ANSWER IMAGES */}
        <div className="container__displaydidyouknow--content--answer-images">
          <ImageCarousel images={didYouKnow.answerImagePreviews} />
        </div>

        {/* REFERENCE */}
        <div className="container__displaydidyouknow--content--reference">
          <span title={didYouKnow.documentationRef}>
            <FontAwesomeIcon icon={faBookmark} size="lg" />
          </span>
          {didYouKnow.documentationRef}
        </div>
      </div>
    </section>
  )
}

export default DisplayDidYouKnow
