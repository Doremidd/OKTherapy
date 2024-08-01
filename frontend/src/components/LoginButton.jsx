import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@chakra-ui/react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <Button
      colorScheme="brand"
      onClick={() =>
        loginWithRedirect({ redirectUri: `${window.location.origin}/home` })
      }
    >
      Login
    </Button>
  );
};

export default LoginButton;
