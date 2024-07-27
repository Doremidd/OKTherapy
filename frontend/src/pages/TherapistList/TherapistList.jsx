import { Container, Text } from "@chakra-ui/react";
import MatchCard from "./MatchCard";
import "./style.css";
import { useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { getUserAsync } from "../../redux/thunk";
import { useEffect, useState } from "react";

const TherapistList = () => {
  const dispatch = useDispatch();
  const [matches, setMatches] = useState([]);
  const { isLoading, isAuthenticated, error, user } = useAuth0();

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user?.sub) {
        const result = await dispatch(getUserAsync(user.sub));
        if (result?.payload) {
          setMatches(result.payload.matchedTherapists);
        }
      }
    };
    fetchUserProfile();
  }, [dispatch, user, isLoading, isAuthenticated, error]);

  return (
    <Container maxW="80%" className="mainContainer">
      <Text fontSize="3xl" fontWeight="500" className="alignLeft">
        YOUR MATCHES
      </Text>
      <Text className="alignLeft" fontSize="lg">
        Meet your top 5 therapist matches, chosen to fit your needs and therapy
        goals.
        <br />
        Ready for the next step? Check out{" "}
        <span style={{ color: "#819792", fontWeight: "600" }}>
          <a href="/email-generator">
            OkTherapy&apos;s email generation tool{" "}
          </a>
        </span>
        to quickly reach out to your therapist matches.
      </Text>
      {matches.map((match) => (
        <MatchCard key={match._id} therapistId={match._id} />
      ))}
    </Container>
  );
};

export default TherapistList;
