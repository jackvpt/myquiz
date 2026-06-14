import { useQuery } from "@tanstack/react-query"
import { validateToken } from "../api/auth.api"

import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import { setUser, clearUser } from "../features/userSlice"

/**
 * Custom hook to validate the authentication token.
 *
 * - Retrieves token from localStorage or sessionStorage
 * - Validates the token via API
 * - Stores user data in Redux if valid
 * - Clears user state and redirects to login if invalid
 *
 * @returns {object} React Query result (status, data, error, etc.)
 */
export function useAuthToken() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Get token from browser storage (persistent or session-based)
  const token = localStorage.getItem("token") || sessionStorage.getItem("token")

  const query = useQuery({
    queryKey: ["authToken", token],

    queryFn: async () => {
      if (!token) {
        return null
      }

      return validateToken(token)
    },

    enabled: !!token,

    retry: false,

    onSuccess: (data) => {
      dispatch(setUser({ ...data, token }))
    },

    onError: () => {
      localStorage.removeItem("token")
      sessionStorage.removeItem("token")

      dispatch(clearUser())

      navigate("/login", { replace: true })
    },
  })

  return {
    ...query,
    token: query.isSuccess ? token : null,
  }
}
