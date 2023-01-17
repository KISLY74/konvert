import "../styles/header.scss"
import { NavLink } from "react-router-dom"
import home from "../assets/home.png"

const Header = () => {
  return <header className="header">
    <nav className="nav">
      <NavLink to="/home" className="nav__element">
        <img src={home} alt="nav-to-home" />
      </NavLink>
      <NavLink to="/learning" className="nav__element">Обучение</NavLink>
      <NavLink to="/events" className="nav__element">Анонсы мероприятий</NavLink>
      <NavLink to="/contacts" className="nav__element">Контакты</NavLink>
    </nav>
  </header>
}

export default Header