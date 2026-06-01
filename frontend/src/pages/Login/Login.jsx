// 📁 CSS imports
import "./Login.scss"

// 🧩 MUI Core imports
import {
  Alert,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Snackbar,
  TextField,
} from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material"

// 📦 React imports
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

// 🌐 React Query
import { useMutation } from "@tanstack/react-query"

// 🧰 API functions
import { login } from "../../api/auth.api"

// 👉 Internal components
import CustomButton from "../../components/Buttons/CustomButton"
import ContactFormModal from "../../components/ContactFormModal/ContactFormModal"
import ForgotPasswordModal from "../../components/ForgotPasswordModal/ForgotPasswordModal"

/**
 * Login component
 *
 * Handles user login with email and password,
 * displays errors and success notifications,
 * and updates user info in Redux store.
 *
 * @component
 * @returns {JSX.Element} Login form
 */
const Login = () => {
  const navigate = useNavigate() // Hook to redirect the user
  const dispatch = useDispatch() // Hook to dispatch Redux actions

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  })

  // States
  const [emailError, setEmailError] = useState("") // Email validation error
  const [showPassword, setShowPassword] = useState(false) // Toggle password visibility
  const [toast, setToast] = useState({ message: "", severity: "success" }) // Toast message state
  const [toastOpen, setToastOpen] = useState(false) // Toast visibility
  const [loginError, setLoginError] = useState(false) // Login failure indicator
  const [rememberMe, setRememberMe] = useState(false) // Remember me checkbox
  const [contactFormModalOpen, setContactFormModalOpen] = useState(false)
  const [forgotPasswordModalOpen, setForgotPasswordModalOpen] = useState(false)

  // Toggle password visibility
  const handleClickShowPassword = () => {
    setShowPassword((show) => !show)
  }

  // Handle form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  // Validate input on blur
  const handleInputBlur = (event) => {
    const { name, value } = event.target
    if (name === "email") isValidEmail(value)
  }

  /**
   * Validate email format
   * @param {string} email
   * @returns {boolean} True if valid, false otherwise
   */
  const isValidEmail = (email) => {
    if (!email) {
      setEmailError("Email requis.")
      return false
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setEmailError("Format email invalide.")
      return false
    }
    setEmailError("")
    return true
  }

  /**
   * Check if the form is valid
   * @returns {boolean} True if valid
   */
  const isFormValid = () => isValidEmail(formData.email)

  /**
   * Submit the login form
   */
  const submitForm = () => {
    if (!isFormValid()) return
    setLoginError(false)
    loginMutation.mutate(formData)
  }

  /**
   * Mutation to log in the user via API
   */
  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      // Show success toast
      showToast(`Connecté avec succès. Bienvenue ${data.firstName}!`)

      // Save token in sessionStorage or localStorage if "remember me" is checked
      sessionStorage.setItem("token", data.token)
      if (rememberMe) localStorage.setItem("token", data.token)

      // Update Redux user state
      dispatch({
        type: "user/setUser",
        payload: {
          userId: data.userId,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
        },
      })

      // Reset form
      setFormData({
        email: "",
        password: "",
      })

      navigate("/") // Redirect to main page
    },
    onError: (error) => {
      console.error("Error while logging in:", error)
      if (error.message === "UserID/Password incorrect") setLoginError(true)
    },
  })

  /**
   * Display a toast notification
   * @param {string} message
   * @param {("success"|"error"|"info"|"warning")} severity
   */
  const showToast = (message, severity = "success") => {
    setToast({ message, severity })
    setToastOpen(true)
  }

  /**
   * Close the toast notification
   * @param {Event} event
   * @param {string} reason
   */
  const handleToastClose = (event, reason) => {
    if (reason === "clickaway") return
    setToastOpen(false)
  }

  return (
    <section className="login">
      <h1>LOGIN</h1>

      {/* EMAIL FIELD */}
      <div className="login__textField">
        <label htmlFor="email" className="login__textField__formlabel">
          Email <span aria-hidden="true">*</span>
        </label>

        <div className="login__textField__input-wrapper">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            required
            aria-describedby="email-helper"
            className={`login__textField__input ${emailError ? "login__textField__input--error" : ""}`}
          />
        </div>

        {emailError && (
          <span id="email-helper" className="login__textField__helper-text">
            {emailError}
          </span>
        )}
      </div>

      {/* PASSWORD FIELD */}
      <div className="login__textField">
        <label htmlFor="password" className="login__textField__formlabel">
          Password <span aria-hidden="true">*</span>
        </label>

        <div className="login__textField__input-wrapper">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleInputChange}
            required
            autoComplete="new-password"
            aria-describedby="password-helper"
            className="login__textField__input"
          />

          <button
            type="button"
            className="toggle-password-visibility"
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </button>
        </div>
      </div>

      <div className="login__forgotten-password">
        <button
          type="button"
          className="login__link"
          onClick={() => setForgotPasswordModalOpen(true)}
        >
          Mot de passe oublié ?
        </button>
      </div>

      {/* LOGIN BUTTON */}
      <button
        type="button"
        className="login__button"
        onClick={submitForm}
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending ? (
          <span className="login__spinner"></span>
        ) : (
          "Se connecter"
        )}
      </button>

      {/* REMEMBER ME CHECKBOX */}
      <label className="login__checkbox">
        <input
          type="checkbox"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
        />
        <span>Se souvenir de moi</span>
      </label>

      {/** NO ACCOUNT LINK */}
      <div className="login__noaccount">
        <p>Pas de compte ?</p>
        <button
          type="button"
          className="login__link"
          onClick={() => setContactFormModalOpen(true)}
        >
          Contactez l'administrateur
        </button>
      </div>

      {/* LOGIN ERROR MESSAGE */}
      {loginError && (
        <Alert className="login__error" severity="error" sx={{ width: "100%" }}>
          Email et/ou mot de passe incorrect
        </Alert>
      )}

      {/* SUCCESS TOAST */}
      <Snackbar
        open={toastOpen}
        autoHideDuration={3000}
        onClose={handleToastClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleToastClose}
          severity={toast.severity}
          sx={{ width: "100%" }}
        >
          {toast.message}
        </Alert>
      </Snackbar>

      {/** CONTACT FORM MODAL */}
      <ContactFormModal
        open={contactFormModalOpen}
        onClose={() => setContactFormModalOpen(false)}
      />

      {/** FORGOT PASSWORD MODAL */}
      <ForgotPasswordModal
        open={forgotPasswordModalOpen}
        onClose={() => setForgotPasswordModalOpen(false)}
      />
    </section>
  )
}

export default Login
