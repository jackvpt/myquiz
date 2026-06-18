// CSS
import "./SideMenu.scss"

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faCircleQuestion,
  faLightbulb,
} from "@fortawesome/free-solid-svg-icons"

// Router
import { NavLink } from "react-router-dom"

const SideMenu = () => {
  return (
    <aside className="container__sidemenu">
      <nav className="container__sidemenu--nav">
        <NavLink
          to="/didyouknow"
          className={({ isActive }) =>
            isActive
              ? "container__sidemenu--nav-btn active"
              : "container__sidemenu--nav-btn"
          }          title="Did You Know"
        >
          <FontAwesomeIcon icon={faLightbulb} size="xl" />
        </NavLink>

        <NavLink
          to="/quiz"
          className={({ isActive }) =>
            isActive
              ? "container__sidemenu--nav-btn active"
              : "container__sidemenu--nav-btn"
          }          title="Quiz"
        >
          <FontAwesomeIcon icon={faCircleQuestion} size="xl" />
        </NavLink>
      </nav>
    </aside>
  )
}

export default SideMenu
