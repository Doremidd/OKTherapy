import { useLocation } from "react-router-dom";
import "./style.css";
import LoginButton from "./LoginButton";
import { Avatar, MenuButton, Menu, MenuList, MenuItem } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";

const NavBar = () => {
  let location = useLocation();
  const { logout } = useAuth0();

  return (
    <div
      className="navbar"
      style={{ background: location.pathname == "/" ? "#F0ECF7" : "none" }}
    >
      <Link to={location.pathname === "/" ? "/" : "/home"}>
        <img
          src="/assets/OKTherapy.png"
          alt="Logo"
          style={{ height: 20, cursor: "pointer" }}
        />
      </Link>
      {location.pathname == "/" ? (
        <LoginButton />
      ) : (
        <Menu>
          <MenuButton>
            <Avatar size="sm"></Avatar>
          </MenuButton>
          <MenuList>
            <ChakraLink as={Link} to="/profile">
              <MenuItem>Profile</MenuItem>
            </ChakraLink>
            <MenuItem onClick={() => logout()}>Log out</MenuItem>
          </MenuList>
        </Menu>
      )}
    </div>
  );
};

export default NavBar;
