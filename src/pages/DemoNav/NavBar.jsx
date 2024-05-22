import logo from "../../assets/logo.png";
import "./NavBar.css";
const NavBar = () => {
  return (
    <nav className="menu-container">
      <input type="checkbox" aria-label="Toggle menu" />
      <span></span>
      <span></span>
      <span></span>

      <a href="#" className="menu-logo">
        <img src={logo} alt="My Awesome Website" />
      </a>

      <div className="menu">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/map">
              <i className="fas fa-search"></i>
            </a>
          </li>
        </ul>
        <ul>
          <li>
            <a href="/register">Sign-up</a>
          </li>
          <li>
            <a href="/login">Login</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
