import "./EditDidYouKnow.scss"

import { useDispatch, useSelector } from "react-redux"

import {
  updateEdited,
  selectEditedDidYouKnow,
} from "../../store/features/didYouKnowSlice"

import DidYouKnowModel from "../../models/DidYouKnowModel"

import CustomTextField from "../subComponents/CustomTextField/CustomTextField"
import CustomFileSelect from "../subComponents/CustomFileSelect/CustomFileSelect"
import CustomButton from "../subComponents/Buttons/CustomButton/CustomButton"
import CustomButtonsDifficulty from "../subComponents/Buttons/CustomButtonsDifficulty/CustomButtonsDifficulty"

import { useCreateDidYouKnow } from "../../hooks/useDidYouKnow"

const EditDidYouKnow = () => {
  const dispatch = useDispatch()
  const form = useSelector(selectEditedDidYouKnow)
  const { mutate: createDidYouKnow, isPending } = useCreateDidYouKnow()

  const handleChange = (field) => (event) => {
    const value =
      event.target.type === "file"
        ? event.target.multiple
          ? Array.from(event.target.files)
          : event.target.files[0]
        : event.target.value

    dispatch(
      updateEdited({
        [field]: value,

        ...(field === "contentIllustrationFile" && value
          ? {
              contentIllustrationPreview: URL.createObjectURL(value),
              removeContentIllustration: false,
            }
          : {}),

        ...(field === "answerImageFiles" && value
          ? {
              answerImagePreviews: value.map((file) =>
                URL.createObjectURL(file),
              ),
            }
          : {}),
      }),
    )
  }

  const handleRemoveIllustration = () => {
    dispatch(
      updateEdited({
        contentIllustrationFile: null,
        contentIllustrationPreview: null,
        removeContentIllustration: true,
      }),
    )
  }

  const handleRemoveAnswerImage = (urlToRemove) => {
    dispatch(
      updateEdited({
        answerImagePreviews: form.answerImagePreviews.filter(
          (url) => url !== urlToRemove,
        ),
        removedAnswerImageUrls: [
          ...form.removedAnswerImageUrls,
          urlToRemove,
        ],
      }),
    )
  }

  const handleSave = () => {
    const model = new DidYouKnowModel(form)

    if (!model.isValid()) {
      return
    }

    createDidYouKnow(model)
  }

  if (!form) {
    return null
  }

  return (
    <section className="container__edit-didyouknow">
      <div className="container__edit-didyouknow--form">
        <CustomTextField
          label="Theme"
          value={form.theme.name}
          onChange={handleChange("theme")}
        />

        <CustomTextField
          label="Domaine"
          value={form.domain.name}
          onChange={handleChange("domain")}
        />

        <CustomTextField
          label="Section"
          value={form.section.name}
          onChange={handleChange("section")}
        />

        <CustomTextField
          label="Family"
          value={form.family.name}
          onChange={handleChange("family")}
        />

        <CustomTextField
          label="Category"
          value={form.category.name}
          onChange={handleChange("category")}
        />

        <CustomTextField
          label="Topic"
          value={form.topic.name}
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

        <div className="illustration-field">
          <CustomFileSelect
            label="Illustration"
            value={form.contentIllustrationFile}
            onChange={handleChange("contentIllustrationFile")}
          />

          {form.contentIllustrationPreview && (
            <div className="illustration-preview">
              <button
                type="button"
                className="remove-btn"
                onClick={handleRemoveIllustration}
              >
                ✕
              </button>
            </div>
          )}
        </div>

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

        <div className="answer-images-field">
          <CustomFileSelect
            label="Images"
            value={form.answerImageFiles}
            onChange={handleChange("answerImageFiles")}
            multiple
          />

          {form.answerImagePreviews.length > 0 && (
            <div className="answer-images-preview">
              {form.answerImagePreviews.map((url) => (
                <div key={url} className="answer-image-item">
                  <img src={url} alt="" />
                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => handleRemoveAnswerImage(url)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

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