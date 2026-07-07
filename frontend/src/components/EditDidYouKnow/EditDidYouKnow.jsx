import "./EditDidYouKnow.scss"

import { useEffect, useState } from "react"

import DidYouKnowModel from "../../models/DidYouKnowModel"

import CustomTextField from "../subComponents/CustomTextField/CustomTextField"
import CustomFileSelect from "../subComponents/CustomFileSelect/CustomFileSelect"
import CustomButton from "../subComponents/Buttons/CustomButton/CustomButton"
import CustomButtonsDifficulty from "../subComponents/Buttons/CustomButtonsDifficulty/CustomButtonsDifficulty"

import { useCreateDidYouKnow } from "../../hooks/useDidYouKnow"

const emptyDidYouKnow = {
  theme: "",
  domain: "",
  section: "",
  family: "",
  category: "",
  topic: "",

  referenceId: "",
  documentationRef: "",

  contentIllustrationFile: null,
  contentIllustrationPreview: null,

  text: "",

  difficulty: "easy",

  answerImageFiles: [],
  answerImagePreviews: [],

  order: 1,
}

const EditDidYouKnow = ({ didYouKnow, onChange }) => {
  const [form, setForm] = useState(didYouKnow ?? emptyDidYouKnow)

  /**
   * Quand la ligne du tableau change
   */
  useEffect(() => {
    setForm(didYouKnow ?? emptyDidYouKnow)
  }, [didYouKnow])

  const updateForm = (updated) => {
    setForm(updated)

    onChange?.(updated)
  }

  const handleChange = (field) => (event) => {
    const value =
      event.target.type === "file"
        ? event.target.multiple
          ? Array.from(event.target.files)
          : event.target.files[0]
        : event.target.value

    updateForm({
      ...form,

      [field]: value,

      ...(field === "contentIllustrationFile" && value
        ? {
            contentIllustrationPreview: URL.createObjectURL(value),
          }
        : {}),

      ...(field === "answerImageFiles" && value
        ? {
            answerImagePreviews: value.map((file) => URL.createObjectURL(file)),
          }
        : {}),
    })
  }

  const { mutate: createDidYouKnow, isPending } = useCreateDidYouKnow()

  const handleSave = () => {
    const model = new DidYouKnowModel(form)

    if (!model.isValid()) {
      return
    }

    createDidYouKnow(model)
  }

  return (
    <section className="container__edit-didyouknow">
      <div className="container__edit-didyouknow--form">
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

        <CustomTextField
          label="Documentation"
          value={form.documentationRef}
          onChange={handleChange("documentationRef")}
        />

        <CustomFileSelect
          label="Illustration"
          value={form.contentIllustrationFile}
          onChange={handleChange("contentIllustrationFile")}
        />

        <CustomTextField
          label="Text"
          value={form.text}
          onChange={handleChange("text")}
          multiline
          rows={4}
        />

        <CustomButtonsDifficulty
          value={form.difficulty}
          onChange={handleChange("difficulty")}
        />

        <CustomFileSelect
          label="Images"
          value={form.answerImageFiles}
          onChange={handleChange("answerImageFiles")}
          multiple
        />

        <CustomButton
          action="create"
          disabled={isPending}
          onClick={handleSave}
        />
      </div>
    </section>
  )
}

export default EditDidYouKnow
