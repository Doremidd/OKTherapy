import { useLocation } from "react-router-dom";
import "./style.css";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import {
  Button,
  Avatar,
  Link,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";

const NavBar = () => {
  let location = useLocation();
  return (
    <div
      className="navbar"
      style={{ background: location.pathname == "/" ? "#F0ECF7" : "none" }}
    >
      <img src="/assets/OKTherapy.png" alt="Logo" style={{ height: 20 }} />
      {location.pathname == "/" ? (
        <Link href="/form">
          <Button colorScheme="brand">Login</Button>
          <LoginButton />
          <LogoutButton />
        </Link>
      ) : (
        <Menu>
          <MenuButton>
            <Avatar size="sm"></Avatar>
          </MenuButton>
          <MenuList>
            <Link href="/profile">
              <MenuItem>Profile</MenuItem>
            </Link>
            <Link href="/">
              <MenuItem>Log out</MenuItem>
            </Link>
          </MenuList>
        </Menu>
      )}
    </div>
  );
};

export default NavBar;
