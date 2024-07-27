import { useEffect, useState } from 'react';
import { Container, Text } from "@chakra-ui/react";
import MatchCard from "./MatchCard";
import "./style.css";
import { getUserAsync } from "../../redux/thunk";
import { useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

const TherapistList = () => {
  const dispatch = useDispatch();
  const [therapists, setTherapists] = useState([]);

  const { user } = useAuth0();

  useEffect(() => {
    const fetchUserMatches = async () => {
      if (user?.sub) {
        const result = await dispatch(getUserAsync(user.sub));
        if (result?.payload) {
          setTherapists(result.payload.matchedTherapists);
        }
      }
    };
    fetchUserMatches();
  }, [dispatch, user]);

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
          <a href="http://localhost:5173/email-generator">
            OkTherapy&apos;s email generation tool{" "}
          </a>
        </span>
        to quickly reach out to your therapist matches.
      </Text>
      {therapists.length > 0 ? (
        therapists.slice(0, 5).map((therapistId) => (
          <MatchCard key={therapistId} therapistId={therapistId} />
        ))
      ) : (
        <Text>No matches found.</Text>
      )}
    </Container>
  );
};

export default TherapistList;
