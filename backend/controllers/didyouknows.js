/** Imports */
const mongoose = require("mongoose")
const DidYouKnow = require("../models/DidYouKnow")

// Scripts
const buildClassification = (value, type) => {
  if (!value || typeof value !== "string") return undefined

  return {
    name: value,
    slug: value.toLowerCase().trim().replace(/\s+/g, "-"),
    type,
  }
}

const {
  buildSingleImageUrl,
  buildMultipleImageUrls,
} = require("../services/upload/image.service")

const parseClassification = (value) => {
  if (!value) return undefined

  try {
    return JSON.parse(value)
  } catch {
    return value
  }
}

/** GET All Did You Know */
exports.getAllDidYouKnows = async (req, res) => {
  try {
    const allDidYouKnows = await DidYouKnow.find()

    res.status(200).json(allDidYouKnows)

    console.log(`${allDidYouKnows.length} did you know items retrieved`)
  } catch (error) {
    res.status(400).json({
      error: error.message || "Error retrieving did you know items.",
    })
  }
}

/** POST New Did You Know */
exports.createDidYouKnow = async (req, res) => {
  try {
    const baseUrl = process.env.BASE_URL

    const {
      theme,
      domain,
      section,
      family,
      category,
      topic,
      text,
      difficulty,
      referenceId,
      documentationRef,
      order,
    } = req.body

    const contentIllustrationUrl = buildSingleImageUrl(
      req.files?.contentIllustration?.[0],
      baseUrl,
    )

    const answerImageUrls = buildMultipleImageUrls(
      req.files?.answerImages,
      baseUrl,
    )

    const didYouKnow = new DidYouKnow({
      theme: parseClassification(req.body.theme),
      domain: parseClassification(req.body.domain),
      section: parseClassification(req.body.section),
      family: parseClassification(req.body.family),
      category: parseClassification(req.body.category),
      topic: parseClassification(req.body.topic),
      text,
      difficulty,
      referenceId,
      documentationRef,
      order,
      contentIllustrationUrl,
      answerImageUrls,
    })

    await didYouKnow.save()

    return res.status(201).json(didYouKnow)
  } catch (error) {
    console.error(error)

    return res.status(400).json({
      error: error.message || "Error creating item",
    })
  }
}

/** PUT Update Did You Know */
exports.updateDidYouKnow = async (req, res) => {
  try {
    const didYouKnowObject = req.body

    if (req.files?.contentIllustration) {
      didYouKnowObject.contentIllustrationUrl = `/uploads/${req.files.contentIllustration[0].filename}`
    }

    if (req.files?.answerImages) {
      didYouKnowObject.answerImageUrls = req.files.answerImages.map(
        (file) => `/uploads/${file.filename}`,
      )
    }

    const updatedDidYouKnow = await DidYouKnow.findByIdAndUpdate(
      req.params.id,
      {
        ...didYouKnowObject,
        _id: req.params.id,
      },
      {
        new: true,
      },
    )

    if (!updatedDidYouKnow) {
      return res.status(404).json({
        message: "Did You Know item not found",
      })
    }

    return res.status(200).json(updatedDidYouKnow)
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    })
  }
}

/** DELETE One Did You Know */
exports.deleteDidYouKnow = async (req, res) => {
  try {
    await DidYouKnow.deleteOne({ _id: req.params.id })

    res.status(200).json({ message: "Did You Know item deleted successfully!" })
    console.log(`Did You Know item deleted: ${req.params.id}`)
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message || "Error deleting did you know item!" })
  }
}

/** DELETE Multiple Did You Know Items */
exports.deleteDidYouKnowItems = async (req, res) => {
  const { ids } = req.body

  if (!Array.isArray(ids) || ids.length === 0) {
    return res
      .status(400)
      .json({ error: "A non-empty array of IDs is required." })
  }

  try {
    const result = await DidYouKnow.deleteMany({ _id: { $in: ids } })

    res.status(200).json({
      message: "Did You Know items deleted successfully!",
      deletedCount: result.deletedCount,
    })

    console.log(
      `Deleted ${result.deletedCount} did you know items: ${ids.join(", ")}`,
    )
  } catch (error) {
    res.status(500).json({
      error: error.message || "Error deleting did you know items!",
    })
  }
}
