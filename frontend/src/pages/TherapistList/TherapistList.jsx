import { Container, Text} from "@chakra-ui/react";
import MatchCard from "./MatchCard";
import "./style.css";

const TherapistList = () => {
  return (
    <Container maxW='80%' className="mainContainer">
        <Text fontSize="3xl" fontWeight="500" className="alignLeft">
          YOUR MATCHES
        </Text>
        <MatchCard therapistId="668f2bb281a75964a9eedc81" />
        <MatchCard therapistId="668f2bb281a75964a9eedc82" />
        <MatchCard therapistId="668f2bb281a75964a9eedc83" />
    </Container>
  );
};

export default TherapistList;
