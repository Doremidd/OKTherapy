import { Box, Heading, Avatar, HStack, Button } from "@chakra-ui/react";
import PropTypes from 'prop-types';

export default function Header({ isEditing, onEdit, profileValues }) {
  return (
    <Box as="section" background="#F0ECF7" w="100%" height="240px" pt="80px">
      <HStack spacing="40px" ml="20%" mr="20%">
        <Avatar size="xl"></Avatar>
        <Box style={{ textAlign: "left" }}>
          <Heading fontWeight="500" fontSize="30px" color="#000000">
            {profileValues?.firstName} {profileValues?.lastName}
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

Header.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
  profileValues: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
  }).isRequired,
};