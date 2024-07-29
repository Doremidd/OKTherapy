import { useDispatch } from "react-redux";
import { getUserAsync } from "../redux/thunk";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import TherapistList from "./TherapistList/TherapistList";
import TherapyForm from "./Form/Form";
import { Flex, Spinner } from "@chakra-ui/react";
import { setUser } from "../redux/reducer";

const Home = () => {
  const dispatch = useDispatch();
  const { isLoading, isAuthenticated, error, user } = useAuth0();
  const [page, setPage] = useState("form");

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user?.sub) {
        dispatch(setUser(user));
        const result = await dispatch(getUserAsync(user.sub));
        if (result?.payload && result?.payload?.message != "User not found") {
          setPage("matches");
        }
      }
    };
    if (!isLoading && isAuthenticated && user) {
      fetchUserProfile();
    }
  }, [dispatch, user, isLoading, isAuthenticated, error]);

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
