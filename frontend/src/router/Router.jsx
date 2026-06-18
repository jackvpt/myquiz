import { Routes, Route, Navigate } from "react-router-dom"

import Layout from "../Layout/Layout"
import Quiz from "../pages/Quiz/Quiz"
import DidYouKnow from "../pages/DidYouKnow/DidYouKnow"

import Home from "../pages/Home/Home"
import Error from "../pages/Error/Error"
import Login from "../pages/Login/Login"
import Account from "../pages/Account/Account"
import Signup from "../pages/Signup/Signup"

const Router = () => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token")

  return (
    <Routes>
      {!token ? (
        <>
          <Route path="/login" element={<Login />} />

          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      ) : (
        <Route element={<Layout />}>
          <Route path="/" element={<DidYouKnow />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/didyouknow" element={<DidYouKnow />} />

          <Route path="/account" element={<Account />} />

          <Route path="/signup" element={<Signup />} />

          <Route path="/login" element={<Login />} />

          <Route path="*" element={<Error />} />
        </Route>
      )}
    </Routes>
  )
}

export default Router
