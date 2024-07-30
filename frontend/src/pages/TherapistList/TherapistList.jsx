import { useEffect, useState } from "react";
import { Container, Text } from "@chakra-ui/react";
import MatchCard from "./MatchCard";
import "./style.css";
import { getUserAsync } from "../../redux/thunk";
import { useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

const TherapistList = () => {
  const dispatch = useDispatch();
  const [therapists, setTherapists] = useState([]);
  const auth0User = useSelector((state) => state.user.auth0User);

  useEffect(() => {
    const fetchUserMatches = async () => {
      if (auth0User?.sub) {
        const result = await dispatch(getUserAsync(auth0User.sub));
        if (result?.payload) {
          setTherapists(result.payload.matchedTherapists);
        }
      }
    };
    fetchUserMatches();
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
      {therapists.length > 0 ? (
        therapists.map((therapist) => (
          <MatchCard key={therapist._id} therapistId={therapist._id} />
        ))
      ) : (
        <Text>No matches found.</Text>
      )}
    </Container>
  );
};

export default TherapistList;
