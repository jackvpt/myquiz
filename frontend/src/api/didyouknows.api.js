import axios from "axios"
import DidYouKnowModel from "../models/DidYouKnowModel"
import { COMMON_API_URL } from "./common_url"

const API_URL = COMMON_API_URL

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token")

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

const mapToDidYouKnowModel = (items) =>
  items.map((item) => new DidYouKnowModel(item))

// ----------------------------
// Fetch all didyouknows
// ----------------------------
export const fetchDidYouKnows = async () => {
  const { data } = await api.get("/didyouknows")

  return mapToDidYouKnowModel(data)
}

// ----------------------------
// Create a new didyouknow
// ----------------------------
export const createDidYouKnow = async (didyouknow) => {
  const model =
    didyouknow instanceof DidYouKnowModel
      ? didyouknow
      : new DidYouKnowModel(didyouknow)

  if (!model.isValid()) {
    throw new Error("Data invalid")
  }

  const formData = model.toFormData()

  const { data } = await api.post("/didyouknows", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })

  return new DidYouKnowModel(data)
}

// ----------------------------
// Update existing didyouknow
// ----------------------------
export const updateDidYouKnow = async ({ id, didyouknow }) => {
  const model =
    didyouknow instanceof DidYouKnowModel
      ? didyouknow
      : new DidYouKnowModel(didyouknow)

  if (!model.isValid()) {
    throw new Error("Data invalid")
  }

  const formData = model.toFormData()

  const { data } = await api.put(`/didyouknows/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })

  return new DidYouKnowModel(data)
}

// ----------------------------
// Delete one didyouknow
// ----------------------------
export const deleteDidYouKnow = async (id) => {
  await api.delete(`/didyouknows/${id}`)

  return id
}
