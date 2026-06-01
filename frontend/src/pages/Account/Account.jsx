// 📁 CSS imports
import "./Account.scss"

// 📦 React imports
import { useState } from "react"
import { useNavigate } from "react-router-dom"

// 🧩 MUI Core imports
import {
  Alert,
  Button,
  Divider,
  FormControl,
  FormLabel,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
} from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material"

// 🗃️ State & Data fetching
import { useSelector } from "react-redux"

// 👉 FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouse } from "@fortawesome/free-solid-svg-icons"

// 👉 Internal components
import ContactFormModal from "../../components/ContactFormModal/ContactFormModal"

// 🌐 React Query hooks
import { useUpdatePassword } from "../../hooks/useUpdatePassword"

/**
 * Account component
 * @returns {JSX.Element}
 */
const Account = () => {
  const user = useSelector((state) => state.user)

  const navigate = useNavigate()

  // Form state
  const [formData, setFormData] = useState({
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  })

  // States
  const [newPasswordError, setNewPasswordError] = useState(false)
  const [confirmNewPasswordError, setConfirmNewPasswordError] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [contactFormModalOpen, setContactFormModalOpen] = useState(false)
  const [isPasswordFormValid, setIsPasswordFormValid] = useState(false)
  const [messageStatus, setMessageStatus] = useState({
    message: "",
    severity: "success",
  }) // Alert message state

  /**
   * Updates form state on input change
   * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>} event
   */
  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  /**
   * Validates the entire form
   * @param {Object} formData
   * @param {boolean} newPasswordError
   * @param {boolean} confirmNewPasswordError
   * @returns {boolean}
   */
  const validateForm = (
    formData,
    newPasswordError,
    confirmNewPasswordError,
  ) => {
    let result = true
    if (
      !formData.currentPassword ||
      newPasswordError ||
      confirmNewPasswordError
    )
      result = false
    if (!formData.newPassword || !formData.confirmNewPassword) result = false
    return result
  }

  /**
   * Handles input blur event for validation
   * @param {React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>} event
   */
  const handleInputBlur = (event) => {
    const { name, value } = event.target

    let newPasswordErrorState = newPasswordError
    if (!formData.newPassword) newPasswordErrorState = false
    let confirmNewPasswordErrorState = confirmNewPasswordError
    if (!formData.confirmNewPassword) confirmNewPasswordErrorState = false

    if (name === "newPassword") {
      newPasswordErrorState = !validatePassword(value)
      setNewPasswordError(newPasswordErrorState)
    }

    if (name === "confirmNewPassword") {
      confirmNewPasswordErrorState = value !== formData.newPassword
      setConfirmNewPasswordError(confirmNewPasswordErrorState)
    }

    setIsPasswordFormValid(
      validateForm(
        formData,
        newPasswordErrorState,
        confirmNewPasswordErrorState,
      ),
    )
  }

  /**
   * React Query: Update Password Mutation
   */
  const updatePasswordMutation = useUpdatePassword({
    onSuccess: () => {
      setMessageStatus("Mot de passe mis à jour avec succès.")
    },
    onError: (error) => {
      if (error.status === 401)
        setMessageStatus({
          message: "Mot de passe incorrect.",
          severity: "error",
        })
      else
        setMessageStatus({
          message:
            "Une erreur est survenue lors de la modification du mot de passe.",
          severity: "error",
        })

      console.error("Error updating password:", error.response.data)
    },
  })

  /**
   * Toggles password visibility
   */
  const handleClickShowPassword = () => setShowPassword((show) => !show)

  /**
   * Handles password change submission
   */
  const handleChangePassword = () => {
    updatePasswordMutation.mutate({
      currentPassword: formData.currentPassword,
      newPassword: formData.newPassword,
      token: user.token,
    })
  }

  /**
   * Validates password complexity (example)
   * @param {string} password
   * @returns {boolean}
   */
  const validatePassword = (password) =>
    password.length >= 8 && /[A-Z]/.test(password) && /\d/.test(password)

  return (
    <section className="account">
      <div className="account__header">
        <div className="account__header__left">
          <IconButton onClick={() => navigate("/display")}>
            <FontAwesomeIcon icon={faHouse} />
          </IconButton>
        </div>
        <h1>COMPTE</h1>
      </div>

      {/* EMAIL FIELD */}
      <FormControl fullWidth>
        <FormLabel htmlFor="email" className="account__formlabel">
          Email
        </FormLabel>
        <TextField
          className="account__textfield"
          id="email"
          name="email"
          type="email"
          variant="outlined"
          value={formData.email}
          disabled={true}
          size="small"
        />
      </FormControl>

      {/* FIRST NAME FIELD */}
      <FormControl fullWidth>
        <FormLabel htmlFor="firstName" className="account__formlabel">
          Prénom
        </FormLabel>
        <TextField
          className="account__textfield"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          disabled={true}
          size="small"
        />
      </FormControl>

      {/* LAST NAME FIELD */}
      <FormControl fullWidth>
        <FormLabel htmlFor="lastName" className="account__formlabel">
          Nom
        </FormLabel>
        <TextField
          className="account__textfield"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          disabled={true}
          size="small"
        />
      </FormControl>

      <div className="account__modify">
        <p>Modifier le compte</p>
        <button
          type="button"
          className="account__link"
          onClick={() => setContactFormModalOpen(true)}
        >
          Contacter l'administrator
        </button>
      </div>

      <Divider sx={{ width: "100%", borderTop: "1px solid" }}></Divider>

      <h1>MODIFIER LE MOT DE PASSE</h1>

      {/* CURRENT PASSWORD FIELD */}
      <FormControl fullWidth>
        <FormLabel
          htmlFor="currentPassword"
          required
          className="account__formlabel"
        >
          Mot de passe actuel
        </FormLabel>
        <OutlinedInput
          className="account__textfield"
          type={showPassword ? "text" : "password"}
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={handleClickShowPassword}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          required
          size="small"
        />
      </FormControl>

      {/* NEW PASSWORD FIELD */}
      <FormControl fullWidth>
        <FormLabel
          htmlFor="newPassword"
          required
          className="account__formlabel"
        >
          Nouveau mot de passe
        </FormLabel>
        <OutlinedInput
          className="account__textfield"
          type={showPassword ? "text" : "password"}
          name="newPassword"
          value={formData.newPassword}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={handleClickShowPassword}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          error={!!newPasswordError}
          required
          size="small"
        />
        {newPasswordError && (
          <span className="account__error">
            Le mot de passe doit comporter au moins 8 caractères, inclure une
            majuscule et un chiffre.
          </span>
        )}
      </FormControl>

      {/* CONFIRM PASSWORD FIELD */}
      <FormControl fullWidth>
        <FormLabel
          htmlFor="confirmNewPassword"
          required
          className="account__formlabel"
        >
          Confirmer le nouveau mot de passe
        </FormLabel>
        <OutlinedInput
          className="account__textfield"
          type={showPassword ? "text" : "password"}
          name="confirmNewPassword"
          value={formData.confirmNewPassword}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={handleClickShowPassword}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          error={!!confirmNewPasswordError}
          required
          size="small"
        />
        {confirmNewPasswordError && (
          <span className="account__error">
            Les mots de passe ne correspondent pas.
          </span>
        )}
      </FormControl>

      {/** CHANGE PASSWORD BUTTON */}
      <Button
        className="account__buttons"
        onClick={handleChangePassword}
        variant="contained"
        color="primary"
        disabled={!isPasswordFormValid}
      >
        Modifier le mot de passe
      </Button>

      <div className="account__password-status">
        {/* Message status */}
        <Alert
          severity={messageStatus.severity}
          sx={{
            p: 0.5,
            py: 0,
            fontSize: "1rem",
            alignItems: "center",
            lineHeight: 1,
            width: "90%",
            visibility: messageStatus.message ? "visible" : "hidden",
          }}
        >
          {messageStatus.message}
        </Alert>
      </div>

      <ContactFormModal
        open={contactFormModalOpen}
        onClose={() => setContactFormModalOpen(false)}
      />
    </section>
  )
}

export default Account
