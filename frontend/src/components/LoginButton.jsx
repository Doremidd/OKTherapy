import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@chakra-ui/react";

const LoginButton = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
  return isAuthenticated ? (
    <Button colorScheme="brand" onClick={() => logout()}>
      Sign out
    </Button>
  ) : (
    <Button
      colorScheme="brand"
      onClick={() =>
        loginWithRedirect({ redirectUri: `${import.meta.env.VITE_CLIENT_URL}/home` })
      }
    >
      Login
    </Button>
  );
};

export default LoginButton;
