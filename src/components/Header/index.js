import {Link} from 'react-router-dom'

import './index.css'

const Header = () => (
  <nav className="nav-bar">
    <Link to="/" className="image-link">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
        alt=" website logo"
        className="website-logo"
      />
    </Link>
  </nav>
)

export default Header
