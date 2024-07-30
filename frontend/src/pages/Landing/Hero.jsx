import { Box, Text, Button, Image, Flex } from "@chakra-ui/react";
import therapyImage from "../../assets/therapy.png";
import { useAuth0 } from "@auth0/auth0-react";

const Hero = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <Box
      position="relative"
      width="100%"
      height="650px"
      bg="#F0ECF7"
      padding="100px 0 100px 0"
      display="flex"
      justifyContent="center"
    >
      <Box maxWidth="1200px" width="100%" padding="0 20px">
        <Flex alignItems="center" height="100%">
          <Box flex="1" textAlign="left" padding="0 20px">
            <Text
              fontStyle="normal"
              fontWeight="600"
              fontSize="48px"
              lineHeight="64px"
              color="#000000"
            >
              Find the Perfect Therapist For You
            </Text>
            <Text
              marginTop="20px"
              fontStyle="normal"
              fontWeight="400"
              fontSize="24px"
              lineHeight="32px"
              color="#000000"
            >
              Take our personalized questionnaire and connect with the
              best-matched therapists in your area. Start your journey to better
              mental health today
            </Text>
            <Button
              marginTop="30px"
              bg="#69877D"
              borderRadius="6.75px"
              color="#FFFFFF"
              fontWeight="600"
              fontSize="18px"
              lineHeight="28px"
              _hover={{ bg: "#55695E" }}
              onClick={() =>
                loginWithRedirect({ redirectUri: `${window.location.origin}/home` })
              }
            >
              Get Started
            </Button>
          </Box>
          <Box flex="1" padding="0 20px">
            <Image src={therapyImage} alt="Therapy" height="auto" maxW="100%" />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Hero;
