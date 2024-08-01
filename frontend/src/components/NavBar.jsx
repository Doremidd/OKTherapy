import { useLocation } from "react-router-dom";
import "./style.css";
import LoginButton from "./LoginButton";
import DrawerMenu from "./DrawerMenu";

const NavBar = () => {
  let location = useLocation();

  return (
    <div
      className="navbar"
      style={{ background: location.pathname == "/" ? "#F0ECF7" : "none" }}
    >
      <DrawerMenu />
      {location.pathname == "/" && <LoginButton />}
    </div>
  );
};

export default NavBar;
