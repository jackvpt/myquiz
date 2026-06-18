// CSS
import "./EditQuiz.scss"

import CustomTextField from "../subComponents/CustomTextField/CustomTextField"
import CustomToggleButtons from "../subComponents/CustomToggleButtons/CustomToggleButtons"
import { useState } from "react"
import QuestionModel from "../../models/QuestionModel"
import CustomToggleSwitch from "../subComponents/CustomToggleSwitch/CustomToggleSwitch"
import AnswerModel from "../../models/AnswerModel"

const EditQuiz = () => {
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
    openBook: false,
    question: "",
    order: 1,
    type: "multiple-choice",
    answers: [],
  }
  const [form, setForm] = useState(formInitialState)

  const [nbAnswers, setNbAnswers] = useState(4)

  const handleChange = (field) => (event) => {
    let value = event.target.value ?? ""

    setForm((prev) => {
      const model = new QuestionModel(prev)

      const [fieldName, index] = field.split("|")

      switch (fieldName) {
        case "openAnswer":
          model.answers = [new AnswerModel({ text: value, isCorrect: true })]
          break
        case "multipleAnswer":
          model.answers[Number(index)] = new AnswerModel({
            text: value,
            isCorrect: false,
          })
          break
        default:
          model[field] = value
          break
      }

      return model
    })
  }

  return (
    <section className="container__editquiz">
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

      {/* Open book toggle */}
      <CustomToggleSwitch
        label="Open Book"
        toggleLabels={["Closed", "Open"]}
        checked={form.openBook}
        onChange={handleChange("openBook")}
      />

      {/* Order */}
      <CustomTextField
        label="Order"
        type="number"
        value={form.order}
        onChange={handleChange("order")}
        clearField={false}
      />

      {/* Question */}
      <CustomTextField
        label="Question"
        value={form.question}
        onChange={handleChange("question")}
        multiline={true}
        rows={4}
      />

      {/* Type */}
      <CustomToggleButtons
        label="Type"
        options={[
          { label: "Multiple Choice", value: "multiple-choice" },
          { label: "Open answer", value: "open-answer" },
        ]}
        value={form.type}
        onChange={handleChange("type")}
      />

      {/* Open answer */}
      {form.type === "open-answer" && (
        <CustomTextField
          label="Answer"
          value={form.openAnswer}
          onChange={handleChange("openAnswer")}
        />
      )}

      {/* Multiple choice answers */}
      {form.type === "multiple-choice" && (
        <div className="multiple-choice__answers">
          <h3>Answers</h3>
          <CustomTextField
            label="Number of answers"
            type="number"
            value={nbAnswers}
            onChange={(event) => {
              const value = Number.parseInt(event.target.value) || 0
              setNbAnswers(value)
            }}
          />
          {Array.from({ length: nbAnswers }, (_, index) => (
            <div key={index} className="multiple-choice__answer">
              <CustomTextField
                label={`Answer ${index + 1}`}
                value={form.answers[index]?.text || ""}
                onChange={handleChange("multipleAnswer|" + index)}
              />
              {/* <CustomToggleSwitch
                label="Correct"
                toggleLabels={["Incorrect", "Correct"]}
                checked={answer.isCorrect}
                onChange={(event) => {
                  const value = event.target.checked
                  setForm((prev) => {
                    const model = new QuestionModel(prev)
                    model.answers[index].isCorrect = value
                    return model
                  })
                }}
              /> */}
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default EditQuiz
