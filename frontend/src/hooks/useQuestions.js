import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  fetchQuestions,
  createQuestion,
  deleteQuestion,
  updateQuestion,
} from "../api/questions.api"
import QuestionModel from "../models/QuestionModel"
import { useNotification } from "./useNotification"

const invalidateQuestions = (client) =>
  client.invalidateQueries({ queryKey: ["questions"] })

const useMutationWithNotification = (config) => {
  const queryClient = useQueryClient()
  const { notifySuccess, notifyError } = useNotification()

  return useMutation({
    ...config,

    onSuccess: (data, variables, context) => {
      if (config.successMessage) {
        notifySuccess(
          typeof config.successMessage === "function"
            ? config.successMessage(data)
            : config.successMessage,
        )
      }

      config.onSuccess?.(data, variables, context)
    },

    onError: (error, variables, context) => {
      const message =
        error?.message || config.errorMessage || "An error occurred"

      notifyError(message)
      config.onError?.(error, variables, context)
    },

    onSettled: (data, error, variables, context) => {
      if (config.invalidate !== false) {
        invalidateQuestions(queryClient)
      }

      config.onSettled?.(data, error, variables, context)
    },
  })
}

// ----------------------------
// Fetch all questions
// ----------------------------
export const useQuestions = ({ enabled = true } = {}) => {
  return useQuery({
    queryKey: ["questions"],
    queryFn: async () => {
      const questions = await fetchQuestions()

      return questions.map((question) =>
        question instanceof QuestionModel ? question : new QuestionModel(question),
      )
    },

    enabled,

    keepPreviousData: true,
    staleTime: 1000 * 60,
    refetchInterval: 60000,
  })
}

// ----------------------------
// Create a new question
// ----------------------------
export const useCreateQuestion = () =>
  useMutationWithNotification({
    mutationFn: createQuestion,
    successMessage: "Question added",
    errorMessage: "Error occurred while creating the question",
  })

// ----------------------------
// Delete a question
// ----------------------------
export const useDeleteQuestion = () =>
  useMutationWithNotification({
    mutationFn: deleteQuestion,
    successMessage: "Question deleted",
    errorMessage: "Error occurred while deleting the question",
  })

// ----------------------------
// Update an existing question
// ----------------------------
export const useUpdateQuestion = () => {
  const queryClient = useQueryClient()

  return useMutationWithNotification({
    mutationFn: ({ id, question }) => updateQuestion({ id, question }),

    successMessage: "Question updated",
    errorMessage: "Error occurred while updating the question",

    onMutate: async ({ id, question }) => {
      await queryClient.cancelQueries({ queryKey: ["questions"] })

      const previousQuestions = queryClient.getQueryData(["questions"])

      queryClient.setQueryData(["questions"], (old = []) =>
        old.map((q) =>
          String(q.id) === String(id)
            ? new QuestionModel({ ...q, ...question })
            : q,
        ),
      )

      return { previousQuestions }
    },

    onError: (error, _vars, context) => {
      if (context?.previousQuestions) {
        queryClient.setQueryData(["questions"], context.previousQuestions)
      }
    },
  })
}
