// 🌐 React Query
import { useMutation, useQueryClient } from "@tanstack/react-query"

// 🧰 API functions
import { signup } from "../api/auth.api"

/**
 * Custom hook to add a new occupancy.
 *
 * @param {object} options - Options pour gérer le succès/erreur depuis le composant appelant
 * @returns {object} Mutation object (mutate, status, etc.)
 */
export const useSignUp = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: signup,
    onSuccess: (...args) => {
      // Invalidate the cache
      queryClient.invalidateQueries({ queryKey: ["occupancies"] })

      // If the component wants to handle a toast, callback, etc.
      if (onSuccess) onSuccess(...args)
    },
    onError: (error, ...rest) => {
      console.error("Error while submitting occupancy:", error)
      if (onError) onError(error, ...rest)
    },
  })
}
