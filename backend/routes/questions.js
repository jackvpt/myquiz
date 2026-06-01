/** Imports */
const express = require("express")
const router = express.Router()
// const auth = require("../middleware/auth")
const multer = require("multer")
const questionsCtrl = require("../controllers/questions")

/** Set routes */
router.get("/", questionsCtrl.getAllQuestions)
router.post("/", multer().none(), questionsCtrl.createQuestion)
router.put("/:id", multer().none(), questionsCtrl.updateQuestion)
router.delete("/:id", questionsCtrl.deleteQuestion)
router.post("/bulk-delete", questionsCtrl.deleteQuestions)

module.exports = router
