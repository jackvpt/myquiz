// CSS
import "./EditDidYouKnow.scss"
import { useState } from "react"

import DidYouKnowModel from "../../models/DidYouKnowModel"
import CustomTextField from "../subComponents/CustomTextField/CustomTextField"

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFileImage } from "@fortawesome/free-solid-svg-icons"

const EditDidYouKnow = () => {
  // Form state
  const formInitialState = {
    theme: "",
    domain: "",
    section: "",
    family: "",
    category: "",
    topic: "",
    referenceId: "",
    documentationRef: "",
    text: "",
    order: 1,
  }

  const [form, setForm] = useState(formInitialState)

  const handleChange = (field) => (event) => {
    const value =
      event.target.type === "file" ? event.target.files[0] : event.target.value

    setForm((prev) => {
      const model = new DidYouKnowModel(prev)

      model[field] = value
      return model
    })
  }
  return (
    <section className="container__edit-didyouknow">
      <CustomTextField
        label="Theme"
        value={form.theme}
        onChange={handleChange("theme")}
      />
      <CustomTextField
        label="Domaine"
        value={form.domain}
        onChange={handleChange("domain")}
      />
      <CustomTextField
        label="Section"
        value={form.section}
        onChange={handleChange("section")}
      />
      <CustomTextField
        label="Family"
        value={form.family}
        onChange={handleChange("family")}
      />
      <CustomTextField
        label="Category"
        value={form.category}
        onChange={handleChange("category")}
      />
      <CustomTextField
        label="Topic"
        value={form.topic}
        onChange={handleChange("topic")}
      />
      <CustomTextField
        label="Reference"
        value={form.referenceId}
        onChange={handleChange("referenceId")}
      />

      {/* Documentation reference */}
      <CustomTextField
        label="Documentation"
        value={form.documentationRef}
        onChange={handleChange("documentationRef")}
      />

      {/* Illustration */}
      <div className="container__edit-didyouknow--fileselect">
        <div className="container__edit-didyouknow--fileselect--label">
          Illustration
        </div>
        <div className="container__edit-didyouknow--fileselect--data">
          <button
            className="container__edit-didyouknow--fileselect--data--button"
            type="button"
            onClick={() =>
              document.getElementById("contentIllustrationUrl").click()
            }
          >
            <FontAwesomeIcon icon={faFileImage} size="xl" />
          </button>
          <div className="container__edit-didyouknow--fileselect--data--filename">
            {form.contentIllustrationUrl instanceof File
              ? form.contentIllustrationUrl.name
              : form.contentIllustrationUrl
                ? form.contentIllustrationUrl.split("/").pop()
                : "No file selected"}
          </div>
        </div>
        <input
          id="contentIllustrationUrl"
          type="file"
          aria-label="Choose content illustration image"
          accept=".jpg,.jpeg,.png"
          onChange={handleChange("contentIllustrationUrl")}
          hidden
        />
      </div>

      {/* Text */}
      <CustomTextField
        label="Text"
        value={form.text}
        onChange={handleChange("text")}
        multiline
        rows={4}
      />
    </section>
  )
}

export default EditDidYouKnow
