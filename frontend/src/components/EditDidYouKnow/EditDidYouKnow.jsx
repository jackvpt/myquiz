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
import { useCreateDidYouKnow } from "../../hooks/useDidYouKnow"
import CustomButtonsDifficulty from "../subComponents/Buttons/CustomButtonsDifficulty/CustomButtonsDifficulty"
import DisplayDidYouKnow from "../DisplayDidYouKnow/DisplayDidYouKnow"

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
    contentIllustrationFile: null,
    text: "",
    difficulty: "easy",
    answerImageFiles: [],
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

    setForm((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleCreate = () => {
    console.log("Creating DidYouKnow:", form)
    const didyouknow = new DidYouKnowModel(form)
    console.log("DidYouKnowModel instance:", didyouknow)
    if (!didyouknow.isValid()) {
      console.log("Data not valid")
      return
    }
    createDidYouKnow(didyouknow)
  }

  const createMock = () => {
    const mockData = {
      theme: "Aviation",
      domain: "Aircraft",
      section: "H160",
      family: "Technical knowledge",
      category: "AFCS",
      topic: "",
      referenceId: "H160_TECH_AFCS_001",
      documentationRef:
        "FLM VOL 2 > DESC > AFCS > OPS MODES > ADV UPPER MODES > GO AROUND",
      text: "When GA is coupled, green mode labels are displayed for 15s (from cruise flight) or 30 s (from hover)",
      difficulty: "medium",
    }

    setForm(mockData)
  }

  // Mutations
  const {
    mutate: createDidYouKnow,
    isPending: isCreating,
    isSuccess: isCreateSuccess,
    isError: isCreateError,
    reset: resetCreate,
  } = useCreateDidYouKnow()
  return (
    <section className="container__edit-didyouknow">
      <div className="container__edit-didyouknow--form">
        <button onClick={() => createMock()}>Create Mock</button>
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
          value={form.contentIllustrationFile}
          onChange={handleChange("contentIllustrationFile")}
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

        {/* Difficulty */}
        <CustomButtonsDifficulty
          value={form.difficulty}
          onChange={handleChange("difficulty")}
        />

        {/* Images illustrating answers */}
        <CustomFileSelect
          label="Images"
          value={form.answerImageFiles}
          onChange={handleChange("answerImageFiles")}
          multiple={true}
        />

        {/* Buttons */}
        <div className="container__edit-didyouknow--buttons">
          <CustomButton action="create" onClick={handleCreate} />
        </div>
      </div>
      <div className="container__edit-didyouknow--preview">
        <DisplayDidYouKnow didYouKnow={form} />
      </div>
    </section>
  )
}

export default EditDidYouKnow
