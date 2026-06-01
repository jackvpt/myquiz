import axios from "axios"
import QuestionModel from "../models/QuestionModel"
import { COMMON_API_URL } from "./common_url"

const API_URL = COMMON_API_URL

// Create an Axios instance for easier configuration
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Add a request interceptor to include the token in all requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token")

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

// Map raw API data to AccountModel instances
const mapToQuestionModel = (questions) =>
  questions.map((item) => new QuestionModel(item))

// ----------------------------
// Fetch all questions
// ----------------------------
export const fetchQuestions = async () => {
  const { data } = await api.get("/questions")

  const models = mapToQuestionModel(data)

  return models
}

// ----------------------------
// Create a new account
// ----------------------------
export const createQuestion = async (question) => {
  // Ensure we are working with an QuestionModel
  const model =
    question instanceof QuestionModel ? question : new QuestionModel(question)

  // Validate the item before sending to API
  if (!model.isValid()) throw new Error("Data invalid")

  // Encryption
  const payload = model.toEncryptedPayload()

  // POST request to /questions with JSON payload
  const { data } = await api.post("/questions", payload)

  // Return a new QuestionModel instance from backend response
  return new QuestionModel(data)
}

// ----------------------------
// Delete a question by ID
// ----------------------------
export const deleteQuestion = async (id) => {
  // DELETE request to /questions/:id
  await api.delete(`/questions/${id}`)

  // Return the deleted item ID for tracking
  return id
}

// ----------------------------
// Update an existing question
// ----------------------------
export const updateQuestion = async ({ id, question }) => {
  // Ensure we are working with an QuestionModel
  const model =
    question instanceof QuestionModel ? question : new QuestionModel(question)

  // Validate the item before sending to API
  if (!model.isValid()) throw new Error("Data invalid")

  // Encryption
  const payload = model.toEncryptedPayload()

  // POST request to /questions with JSON payload
  const { data } = await api.put(`/questions/${id}`, payload)
  // Return a new QuestionModel instance from backend response

  return new QuestionModel(data)
}
