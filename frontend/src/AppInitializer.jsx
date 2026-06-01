import { useAuthToken } from "./hooks/useAuthToken"
import { useQuestions } from "./hooks/useQuestions"
import Loader from "./Components/Loader/Loader"
import PropTypes from "prop-types"

/**
 * Initializes the application by validating authentication and fetching user data.
 */
const AppInitializer = ({ children }) => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token")

  // Step 1: validate token / restore session
  const { isLoading: isAuthLoading } = useAuthToken()

  // 👉 Auth is resolved when loading is finished
  const isAuthResolved = !isAuthLoading

  const isAuthenticated = isAuthResolved && !!token

  // Step 2: fetch questions ONLY when auth is resolved AND user exists
  const {
    isLoading: questionsLoading,
    isError,
    error,
  } = useQuestions({
    enabled: isAuthenticated, // Only fetch questions if user is authenticated
  })

  // Global loading (only while auth is resolving OR questions loading)
  if (!isAuthResolved || (isAuthenticated && questionsLoading)) {
    return <Loader />
  }

  // Global error (only if user is authenticated)
  if (isAuthenticated && isError) {
    return <p>Error loading data: {error?.message}</p>
  }

  return children
}
AppInitializer.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AppInitializer
