import { useLocation } from "react-router-dom";
import "./style.css";
import LoginButton from "./LoginButton";
import DrawerMenu from "./DrawerMenu";

// eslint-disable-next-line react/prop-types
const NavBar = ({ page }) => {
  let location = useLocation();

  if (page !== "form" || location.pathname == "/") {
    return (
      <div
        className="navbar"
        style={{ background: location.pathname == "/" ? "#F0ECF7" : "none" }}
      >
        <DrawerMenu />
        {location.pathname == "/" && <LoginButton />}
      </div>
    );
  }
};

export default NavBar;
