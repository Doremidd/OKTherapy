import { Container, Text} from "@chakra-ui/react";
import MatchCard from "./MatchCard";
import "./style.css";

const TherapistList = () => {
  return (
    <Container maxW='80%' className="mainContainer">
        <Text fontSize="3xl" fontWeight="500" className="alignLeft">
          YOUR MATCHES
        </Text>
        <MatchCard />
        <MatchCard />
        <MatchCard />
    </Container>
  );
};

export default TherapistList;
