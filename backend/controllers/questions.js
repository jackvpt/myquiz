/** Imports */
const mongoose = require("mongoose")
const Question = require("../models/Question")
const bcrypt = require("bcrypt")

const fs = require("fs")


/** GET All Questions */
exports.getAllQuestions = async (req, res) => {
  try {
    const allQuestions = await Question.find()

    res.status(200).json(allQuestions)

    console.log(`${allQuestions.length} questions retrieved`)
  } catch (error) {
    res.status(400).json({
      error: error.message || "Error retrieving questions.",
    })
  }
}

/** POST New Question */
exports.createQuestion = async (req, res) => {
  const questionObject = req.body

  try {
    const question = new Question({
      ...questionObject,

    })

    await question.save()

    res.status(201).json(question)

    console.log(`Question created`)
  } catch (error) {
    res.status(400).json({
      error: error.message || "Error adding question!",
    })
  }
}

/** PUT Update Question */
exports.updateQuestion = async (req, res) => {
  try {
    const questionObject = req.body

    const updatedQuestion = await Question.findByIdAndUpdate(
      req.params.id,
      {
        ...questionObject,
        _id: req.params.id,
      },
      { new: true },
    )

    if (!updatedQuestion) {
      return res.status(404).json({ message: "Question not found" })
    }

    return res.status(200).json(updatedQuestion)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

/** DELETE One Question */
exports.deleteQuestion = async (req, res) => {
  try {
    await Question.deleteOne({ _id: req.params.id })

    res.status(200).json({ message: "Question deleted successfully!" })
    console.log(`Question deleted: ${req.params.id}`)
  } catch (error) {
    res.status(500).json({ error: error.message || "Error deleting question!" })
  }
}

/** DELETE Multiple Questions */
exports.deleteQuestions = async (req, res) => {
  const { ids } = req.body

  if (!Array.isArray(ids) || ids.length === 0) {
    return res
      .status(400)
      .json({ error: "A non-empty array of IDs is required." })
  }

  try {
    const result = await Question.deleteMany({ _id: { $in: ids } })

    res.status(200).json({
      message: "Questions deleted successfully!",
      deletedCount: result.deletedCount,
    })

    console.log(`Deleted ${result.deletedCount} questions: ${ids.join(", ")}`)
  } catch (error) {
    res.status(500).json({
      error: error.message || "Error deleting questions!",
    })
  }
}
