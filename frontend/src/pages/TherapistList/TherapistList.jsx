import { Container, Text } from "@chakra-ui/react";
import MatchCard from "./MatchCard";
import "./style.css";

const TherapistList = () => {
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
      <MatchCard therapistId="668f2bb281a75964a9eedc81" />
      <MatchCard therapistId="668f2bb281a75964a9eedc81" />
      <MatchCard therapistId="668f2bb281a75964a9eedc81" />
    </Container>
  );
};

export default TherapistList;
