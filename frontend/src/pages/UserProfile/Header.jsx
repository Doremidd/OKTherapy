import {
  Box,
  Heading,
  Avatar,
  HStack,
  Button,
  useMediaQuery,
} from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";

// eslint-disable-next-line react/prop-types
export default function Header({ isEditing, onEdit }) {
  const { user } = useAuth0();
  const [isLargerThan600] = useMediaQuery("(min-width: 600px)");
  return (
    <>
      <Box
        as="section"
        background="#F0ECF7"
        height={["280px", null, "240px"]}
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <HStack spacing="30px" ml="20%" mr="20%">
          <Avatar size="xl"></Avatar>
          <Box style={{ textAlign: "left" }}>
            <Heading fontWeight="500" fontSize="30px" color="#000000">
              {user?.given_name} {user?.family_name}
            </Heading>
          </Box>
          {!isEditing && isLargerThan600 && (
            <Button
              ml={isLargerThan600 ? "20%" : "0"}
              colorScheme="teal"
              size="md"
              onClick={onEdit}
            >
              Edit
            </Button>
          )}
        </HStack>
        {!isEditing && !isLargerThan600 && (
          <Button
            colorScheme="teal"
            size="md"
            width="60%"
            ml="20%"
            mr="20%"
            mt="40px"
            onClick={onEdit}
          >
            Edit
          </Button>
        )}
      </Box>
    </>
  );
}