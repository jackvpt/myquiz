// CSS
import { useState } from "react"
import "./DidYouKnow.scss"
import DidYouKnowModel from "../../models/DidYouKnowModel"
import CustomTextField from "../../components/subComponents/CustomTextField/CustomTextField"

const DidYouKnow = () => {
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
    let value = event.target.value ?? ""

    setForm((prev) => {
      const model = new DidYouKnowModel(prev)

      model[field] = value
      return model
    })
  }

  return (
    <section className="container__didyouknow">
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
    </section>
  )
}

export default DidYouKnow
