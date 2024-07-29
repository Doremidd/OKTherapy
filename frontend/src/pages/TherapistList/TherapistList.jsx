import { Container, Text } from "@chakra-ui/react";
import MatchCard from "./MatchCard";
import "./style.css";
import { useDispatch } from "react-redux";
import { getUserAsync } from "../../redux/thunk";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const TherapistList = () => {
  const dispatch = useDispatch();
  const [matches, setMatches] = useState([]);
  const auth0User = useSelector((state) => state.user.auth0User);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (auth0User?.sub) {
        const result = await dispatch(getUserAsync(auth0User.sub));
        if (result?.payload) {
          setMatches(result.payload.matchedTherapists);
        }
      }
    };
    fetchUserProfile();
  }, [dispatch, auth0User]);

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
          <Link to="/email-generator">
            OkTherapy&apos;s email generation tool{" "}
          </Link>
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
