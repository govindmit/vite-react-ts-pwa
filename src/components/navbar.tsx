import { Link, useNavigate } from "react-router-dom";
import "../style/navbar.css";

function NavBar() {
  const checkToken: any = localStorage.getItem("vite-react-ts-pwa_token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("vite-react-ts-pwa_token");
    navigate("/");
  };

  return (
    <div className="nav-main-container">
      <div className="contain-container">
        <ul className="navbar-ul-style">
          <li className="navbar-li-style">
            {checkToken ? (
              <span className="active navbar-link-style" onClick={handleLogout}>
                Logout
              </span>
            ) : (
              <Link className="active navbar-link-style" to={"/"}>
                Login
              </Link>
            )}
          </li>
          <li className="navbar-li-style">
            {!checkToken ? (
              <span className="active navbar-link-style">
                Products
              </span>
            ) : (
              <Link className="active navbar-link-style" to={"/products"}>
                Products
              </Link>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
