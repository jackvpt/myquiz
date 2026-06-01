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
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token")

  return useQuery({
    // Unique query key (re-runs if token changes)
    queryKey: ["authToken", token],

    // Function that validates the token via API
    queryFn: async () => {
      
      if (!token) {
        throw new Error("No token found")
      }
      
      return validateToken(token)
    },

    // Only run the query if a token exists
    enabled: !!token,

    // Consider data fresh for 5 minutes
    staleTime: 5 * 60 * 1000,

    // Keep cache in memory for 10 minutes
    cacheTime: 10 * 60 * 1000,

    // Always revalidate when component mounts
    refetchOnMount: "always",

    // Disable automatic refetch on window focus or reconnect
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,

    // Do not retry if the request fails (invalid token)
    retry: false,

    // Called when token is valid
    onSuccess: (data) => {
      console.log("✅ Token is valid")

      // Store user data + token in Redux
      dispatch(setUser({ ...data, token }))
    },

    // Called when token is invalid or request fails
    onError: (err) => {
      console.log("❌ Token is invalid:", err.message)

      // Remove invalid token from storage
      localStorage.removeItem("token")
      sessionStorage.removeItem("token")

      // Clear user state in Redux
      dispatch(clearUser())

      // Redirect to login page
      navigate("/login", { replace: true })
    },
  })
}