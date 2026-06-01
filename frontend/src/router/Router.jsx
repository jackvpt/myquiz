import { Routes, Route } from "react-router-dom"
import { Navigate } from "react-router-dom"

import Home from "../pages/Home/Home"
import Error from "../pages/Error/Error"
import Header from "../components/Header/Header"
import Login from "../pages/Login/Login"
import Account from "../pages/Account/Account"
import Signup from "../pages/Signup/Signup"

/**
 * Application router component using React Router v6.
 *
 * @category Router
 * @component
 * @returns {JSX.Element} The main Router component for the application.
 */
const Router = () => {
  // Access the authentication token from the local storage or session storage
  const token = localStorage.getItem("token") || sessionStorage.getItem("token")

  return (
    <div className="app">
      {/* Header displayed on all pages */}
      <Header />
      {/* SEO compliant main landmark */}
      <main role="main">
        <Routes>
          {/* Routes for authenticated users */}
          {token ? (
            <>
              {/* Routes for authenticated users */}
              <Route path="/" element={<Home />} />
              <Route path="/account" element={<Account />} />

              {/* Allow admin/user to signup or login if needed */}
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />

              {/* Catch-all route for unknown paths */}
              <Route path="*" element={<Error />} />
            </>
          ) : (
            <>
              {/* Routes for unauthenticated users */}

              {/* Login page route */}
              <Route path="/login" element={<Login />} />

              {/* Redirect any unknown route to login */}
              <Route path="*" element={<Navigate to="/login" replace />} />
            </>
          )}
        </Routes>
      </main>

      {/* Footer displayed on all pages */}
      {/* <Footer /> */}
    </div>
  )
}

export default Router
