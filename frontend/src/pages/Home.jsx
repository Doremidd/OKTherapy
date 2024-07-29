import { useDispatch } from "react-redux";
import { getUserAsync } from "../redux/thunk";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import TherapistList from "./TherapistList/TherapistList";
import TherapyForm from "./Form/Form";
import { Flex, Spinner } from "@chakra-ui/react";
import { setAuth0User } from "../redux/reducer";
import { useSelector } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const { isLoading, isAuthenticated, user } = useAuth0();
  const [page, setPage] = useState("form");
  const auth0User = useSelector((state) => state.user.auth0User);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user?.sub) {
        if (!auth0User) {
          dispatch(setAuth0User(user));
        }
        const sub = auth0User?.sub || user.sub;
        const result = await dispatch(getUserAsync(sub));
        if (result?.payload?.message !== "User not found") {
          setPage("matches");
        }
      }
    };

    if (!isLoading && isAuthenticated && user) {
      fetchUserProfile();
    }
  }, [dispatch, user, isLoading, isAuthenticated, auth0User]);

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
