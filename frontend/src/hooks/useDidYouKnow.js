import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  fetchDidYouKnows,
  createDidYouKnow,
  deleteDidYouKnow,
  updateDidYouKnow,
} from "../api/didyouknows.api"
import DidYouKnowModel from "../models/DidYouKnowModel"
import { useNotification } from "./useNotification"

const invalidateDidYouKnows = (client) =>
  client.invalidateQueries({ queryKey: ["didyouknows"] })

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
        invalidateDidYouKnows(queryClient)
      }

      config.onSettled?.(data, error, variables, context)
    },
  })
}

// ----------------------------
// Fetch all didyouknows
// ----------------------------
export const useDidYouKnows = ({ enabled = true } = {}) => {
  return useQuery({
    queryKey: ["didyouknows"],
    queryFn: async () => {
      const didyouknows = await fetchDidYouKnows()

      return didyouknows.map((didyouknow) =>
        didyouknow instanceof DidYouKnowModel ? didyouknow : new DidYouKnowModel(didyouknow),
      )
    },

    enabled,

    keepPreviousData: true,
    staleTime: 1000 * 60,
    refetchInterval: 60000,
  })
}

// ----------------------------
// Create a new didyouknow
// ----------------------------
export const useCreateDidYouKnow = () =>
  useMutationWithNotification({
    mutationFn: createDidYouKnow,
    successMessage: "Did You Know added",
    errorMessage: "Error occurred while creating the Did You Know",
  })

// ----------------------------
// Delete a didyouknow
// ----------------------------
export const useDeleteDidYouKnow = () =>
  useMutationWithNotification({
    mutationFn: deleteDidYouKnow,
    successMessage: "Did You Know deleted",
    errorMessage: "Error occurred while deleting the Did You Know",
  })

// ----------------------------
// Update an existing didyouknow
// ----------------------------
export const useUpdateDidYouKnow = () => {
  const queryClient = useQueryClient()

  return useMutationWithNotification({
    mutationFn: ({ id, didyouknow }) => updateDidYouKnow({ id, didyouknow }),

    successMessage: "Did You Know updated",
    errorMessage: "Error occurred while updating the Did You Know",

    onMutate: async ({ id, didyouknow }) => {
      await queryClient.cancelQueries({ queryKey: ["didyouknows"] })

      const previousDidYouKnows = queryClient.getQueryData(["didyouknows"])

      queryClient.setQueryData(["didyouknows"], (old = []) =>
        old.map((dyk) =>
          String(dyk.id) === String(id)
            ? new DidYouKnowModel({ ...dyk, ...didyouknow })
            : dyk,
        ),
      )

      return { previousDidYouKnows }
    },

    onError: (error, _vars, context) => {
      if (context?.previousDidYouKnows) {
        queryClient.setQueryData(["didyouknows"], context.previousDidYouKnows)
      }
    },
  })
}
