export default class AnswerModel {
  constructor(data = {}) {
    this.text = data.text ?? ""
    this.isCorrect = data.isCorrect ?? false
  }

  toJSON() {
    return {
      text: this.text,
      isCorrect: this.isCorrect,
    }
  }
}
