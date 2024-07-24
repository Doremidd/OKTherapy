import { Box, Heading, Text, Avatar, HStack, Button } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";

// eslint-disable-next-line react/prop-types
export default function Header({ isEditing, onEdit }) {
  const { user } = useAuth0();
  return (
    <Box as="section" background="#F0ECF7" w="100%" height="240px" pt="80px">
      <HStack spacing="40px" ml="20%" mr="20%">
        <Avatar size="xl"></Avatar>
        <Box style={{ textAlign: "left" }}>
          <Heading fontWeight="500" fontSize="30px" color="#000000">
            {user?.given_name} {user?.family_name}
          </Heading>
        </Box>
        {!isEditing && (
          <Button ml="30%" colorScheme="teal" size="md" onClick={onEdit}>
            Edit
          </Button>
        )}
      </HStack>
    </Box>
  );
}
