// CSS
import "./EditDidYouKnow.scss"

// React
import { useState } from "react"

// Models
import DidYouKnowModel from "../../models/DidYouKnowModel"

// Components
import CustomTextField from "../subComponents/CustomTextField/CustomTextField"
import CustomFileSelect from "../subComponents/CustomFileSelect/CustomFileSelect"
import CustomButton from "../subComponents/Buttons/CustomButton/CustomButton"

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
    contentIllustrationUrl: null,
    text: "",
    answerIllustrationUrls: [],
    order: 1,
  }

  const [form, setForm] = useState(formInitialState)

  const handleChange = (field) => (event) => {
    const value =
      event.target.type === "file"
        ? event.target.multiple
          ? Array.from(event.target.files)
          : event.target.files[0]
        : event.target.value

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
      <CustomFileSelect
        label="Illustration"
        value={form.contentIllustrationUrl}
        onChange={handleChange("contentIllustrationUrl")}
        multiple={false}
      />

      {/* Text */}
      <CustomTextField
        label="Text"
        value={form.text}
        onChange={handleChange("text")}
        multiline
        rows={4}
      />

      {/* Images illustrating answers */}
      <CustomFileSelect
        label="Images"
        value={form.answerIllustrationUrls}
        onChange={handleChange("answerIllustrationUrls")}
        multiple={true}
      />

      {/* Buttons */}
      <div className="container__edit-didyouknow--buttons">
        <CustomButton action="create" />
      </div>
    </section>
  )
}

export default EditDidYouKnow
