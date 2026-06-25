// CSS
import "./ImageCarousel.scss"
// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faCircleChevronLeft,
  faCircleChevronRight,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons"

// React
import { useState } from "react"

const ImageCarousel = ({ images = [] }) => {
  const [open, setOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!images.length) return null

  const openCarousel = (index) => {
    setCurrentIndex(index)
    setOpen(true)
  }

  const next = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const previous = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  return (
    <>
      {/* Miniatures */}
      <div className="container__imagesCarousel">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Image ${index + 1}`}
            className="container__imagesCarousel__images"
            onClick={() => openCarousel(index)}
          />
        ))}
      </div>

      {/* Carousel */}
      {open && (
        <div
          className="container__imagesCarousel__carousel"
          onClick={() => setOpen(false)}
        >
          <button
            className="container__imagesCarousel__carousel--button container__imagesCarousel__carousel--button--close"
            onClick={() => setOpen(false)}
          >
            <FontAwesomeIcon icon={faCircleXmark} />
          </button>

          {images.length > 1 && (
            <button
              className="container__imagesCarousel__carousel--button container__imagesCarousel__carousel--button--prev"
              onClick={(e) => {
                e.stopPropagation()
                previous()
              }}
            >
              <FontAwesomeIcon icon={faCircleChevronLeft} size="sm" />
            </button>
          )}

          <img
            className="container__imagesCarousel__images--image"
            src={images[currentIndex]}
            alt={`Image ${currentIndex + 1}`}
            onClick={(e) => e.stopPropagation()}
          />

          {images.length > 1 && (
            <button
              className="container__imagesCarousel__carousel--button container__imagesCarousel__carousel--button--next"
              onClick={(e) => {
                e.stopPropagation()
                next()
              }}
            >
              <FontAwesomeIcon icon={faCircleChevronRight} size="sm" />
            </button>
          )}
        </div>
      )}
    </>
  )
}

export default ImageCarousel
