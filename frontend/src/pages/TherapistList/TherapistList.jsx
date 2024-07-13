import { Container, Text} from "@chakra-ui/react";
import MatchCard from "./MatchCard";
import "./style.css";

const TherapistList = () => {
  return (
    <Container maxW='80%' className="mainContainer">
        <Text fontSize="3xl" fontWeight="500" className="alignLeft">
          YOUR MATCHES
        </Text>
        <MatchCard therapistId="668f2bb281a75964a9eedc9d" />
        <MatchCard therapistId="6690da1681a75964a9c52a01" />
        <MatchCard therapistId="668f2bb281a75964a9eedc81" />
    </Container>
  );
};

export default TherapistList;
