import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@chakra-ui/react";
import axios from "axios";

const LoginButton = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const API_URL = 'http://localhost:3001/users';

  const handleLogin = async () => {
    try {
      const response = await axios.get(`${API_URL}/${encodeURIComponent(user?.sub)}`);
      const { existedUser } = response.data;
      const redirectUri = existedUser 
        ? "http://localhost:5173/profile" 
        : "http://localhost:5173/form";
      loginWithRedirect({ redirectUri });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        loginWithRedirect({ redirectUri: "http://localhost:5173/form" });
      } else {
        console.error('Error during login:', error);
      }
    }
  };

  return isAuthenticated ? (
    <Button colorScheme="brand" onClick={() => logout()}>
      Sign out
    </Button>
  ) : (
    <Button colorScheme="brand" onClick={handleLogin}>
      Login
    </Button>
  );
};

export default LoginButton;