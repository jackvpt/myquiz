// CSS
import "./Layout.scss"

import { Outlet } from "react-router-dom"

import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"
import SideMenu from "../components/SideMenu/SideMenu"

const Layout = () => {
  return (
    <div className="app">
      <Header />

      <div className="container__layout">
        <SideMenu />

        <main role="main" className="main">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  )
}

export default Layout
