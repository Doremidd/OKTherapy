import {
  Text,
  Avatar,
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionIcon,
  AccordionPanel,
  Button,
} from "@chakra-ui/react";
import "./style.css";
import { EmailIcon, PhoneIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const MatchCard = ({ therapistId }) => {
  const [therapist, setTherapist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTherapist = async () => {
      try {
        const response = await fetch(`http://localhost:3001/therapists/${therapistId}`, {
          method: "GET",
        });
        const data = await response.json();
        setTherapist(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching therapist data:', error);
        setLoading(false);
      }
    };
    fetchTherapist();
  }, [therapistId]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!therapist) {
    return <Text>Therapist not found</Text>;
  }

  return (
    <Accordion allowMultiple>
      <AccordionItem className="accordion">
        <AccordionButton>
          <div className="accordionContent">
            <div className="avatarTextContainer">
              <Avatar size="xl" src={therapist.image} />
              <div className="alignLeft">
                <Text fontSize="xl" fontWeight="500">
                  {therapist.name}
                </Text>
                <Text>{therapist.location} | {therapist.onlineAvailability === 'Yes' && 'Online ✔️'}</Text>
                <Text>{therapist.fee ? `$${therapist.fee}/session` : 'Fee not available'}</Text>
              </div>
            </div>
            <AccordionIcon />
          </div>
        </AccordionButton>
        <AccordionPanel>
          <div className="accordionPanel">
            <Text className="accordionPanelText">
              Specializes in: {therapist.areaOfPractice.join(', ')}
            </Text>
            <Text className="accordionPanelText">
              Approaches Used: {therapist.approachesUsed.join(', ')}
            </Text>
            <br></br>
            <Button
              size="sm"
              leftIcon={<EmailIcon />}
              colorScheme="brand"
              variant="outline"
              className="leftButton"
            >
              {therapist.website}
            </Button>
            <Button
              size="sm"
              leftIcon={<PhoneIcon />}
              colorScheme="brand"
              variant="outline"
              className="rightButton"
            >
              {therapist.phone}
            </Button>
          </div>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

MatchCard.propTypes = {
  therapistId: PropTypes.string.isRequired,
};

export default MatchCard;
