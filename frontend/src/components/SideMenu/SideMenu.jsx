// CSS
import "./SideMenu.scss"

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleQuestion, faLightbulb } from "@fortawesome/free-solid-svg-icons"


const SideMenu = () => {
  return (
    <aside className="container__sidemenu">
      <nav className="container__sidemenu--nav">
        <button className="container__sidemenu--nav-btn" title="Did You Know">
          <FontAwesomeIcon icon={faLightbulb} size="xl" />
        </button>
        <button className="container__sidemenu--nav-btn" title="Quiz">
          <FontAwesomeIcon icon={faCircleQuestion} size="xl" />
        </button>
      </nav>
    </aside>
  )
}

export default SideMenu
