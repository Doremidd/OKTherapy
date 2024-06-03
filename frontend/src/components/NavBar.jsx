import { useLocation } from "react-router-dom";
import "./style.css";
import { Button, Avatar } from "@chakra-ui/react";

const NavBar = () => {
  let location = useLocation();
  return (
    <div
      className="navbar"
      style={{ background: location.pathname == "/" ? "#F0ECF7" : "none" }}
    >
      <img src="/assets/OKTherapy.png" alt="Logo" style={{ height: 20 }} />
      {location.pathname == "/" ? (
        <Button colorScheme="brand">Login</Button>
      ) : (
        <Avatar size="sm"></Avatar>
      )}
    </div>
  );
};

export default NavBar;
