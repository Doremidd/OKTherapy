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
import { LinkIcon, PhoneIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { getTherapistAsync } from "../../redux/thunk";

const MatchCard = ({ therapistId }) => {
  const dispatch = useDispatch();
  const [therapist, setTherapist] = useState(null);

  useEffect(() => {
    const fetchTherapist = async () => {
      const result = await dispatch(getTherapistAsync(therapistId));
      if (result?.payload) {
        setTherapist(result.payload.profile);
      }
    };
    fetchTherapist();
  }, [dispatch, therapistId]);

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
              leftIcon={<LinkIcon />}
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
