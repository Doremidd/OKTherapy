import { Container, Text} from "@chakra-ui/react";
import MatchCard from "./MatchCard";
import "./style.css";

const TherapistList = () => {
  return (
    <Container maxW='80%' className="mainContainer">
        <Text fontSize="3xl" fontWeight="500" className="alignLeft">
          YOUR MATCHES
        </Text>
        <MatchCard therapistId="6690d8a581a75964a9c267b0" />
        <MatchCard therapistId="6690d8a581a75964a9c267b1" />
        <MatchCard therapistId="6690d8a581a75964a9c267b2" />
    </Container>
  );
};

export default TherapistList;
