const express = require("express")
const router = express.Router()

const upload = require("../middleware/upload/imageUpload")
const didyouknowsCtrl = require("../controllers/didyouknows")

router.get("/", didyouknowsCtrl.getAllDidYouKnows)

router.post(
  "/",
  upload.fields([
    { name: "contentIllustration", maxCount: 1 },
    { name: "answerImages", maxCount: 10 },
  ]),
  didyouknowsCtrl.createDidYouKnow
)

router.put(
  "/:id",
  upload.fields([
    { name: "contentIllustration", maxCount: 1 },
    { name: "answerImages", maxCount: 10 },
  ]),
  didyouknowsCtrl.updateDidYouKnow
)

module.exports = router