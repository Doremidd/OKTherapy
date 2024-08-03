import TherapistList from "./TherapistList/TherapistList";
import TherapyForm from "./Form/Form";
import { Flex, Spinner } from "@chakra-ui/react";

// eslint-disable-next-line react/prop-types
const Home = ({isLoading, page}) => {
  return (
    <>
      {isLoading ? (
        <Flex height="100vh" alignItems="center" justifyContent="center">
          <Spinner size="xl" thickness="4px" color="brand.500" />
        </Flex>
      ) : page === "matches" ? (
        <TherapistList />
      ) : (
        <TherapyForm />
      )}
    </>
  );
};

export default Home;
