import {
  Box,
  Heading,
  Avatar,
  HStack,
  Button,
  useMediaQuery,
} from "@chakra-ui/react";
import PropTypes from 'prop-types';
import { useSelector } from "react-redux";

export default function Header({ isEditing, onEdit, profileValues }) {
  const [isLargerThan600] = useMediaQuery("(min-width: 600px)");
  const auth0User = useSelector((state) => state.user.auth0User);
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
          <Avatar src={auth0User?.picture} alt="profile-picture" size="xl"></Avatar>
          <Box style={{ textAlign: "left" }}>
            <Heading fontWeight="500" fontSize="30px" color="#000000">
              {profileValues?.firstName} {profileValues?.lastName}
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

Header.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
  profileValues: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
  }).isRequired,
};