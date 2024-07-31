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
import { getTherapist } from "../../redux/therapistSlice";

const MatchCard = ({ therapistId }) => {
  const dispatch = useDispatch();
  const [therapist, setTherapist] = useState(null);

  useEffect(() => {
    const fetchTherapist = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/therapists/${therapistId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setTherapist(data);
        dispatch(getTherapist(data));
      } catch (error) {
        console.error("Error getting therapist", error);
      }
    };

    fetchTherapist();
  }, [dispatch, therapistId]);

  if (!therapist) {
    return <div>Loading...</div>;
  }

  return (
    <Accordion allowMultiple>
      <AccordionItem className="accordion">
        <AccordionButton>
          <div className="accordionContent">
            <div className="avatarTextContainer">
              <Avatar size="xl" src={therapist?.image} />
              <div className="alignLeft">
                <Text fontSize="xl" fontWeight="500">
                  {therapist?.name || ""}
                </Text>
                <Text>
                  {therapist?.location || ""}
                  {therapist?.onlineAvailability === "Yes" && " | Online ✔️"}
                </Text>
                <Text>
                  {therapist?.fee
                    ? `$${therapist?.fee}/session`
                    : "Fee not available"}
                </Text>
              </div>
            </div>
            <AccordionIcon />
          </div>
        </AccordionButton>
        <AccordionPanel>
          <div className="accordionPanel">
            <Text className="accordionPanelText">
              Description: {therapist?.description || "No description available"}
            </Text>
            <Text className="accordionPanelText">
              Specializes in: {therapist?.areaOfPractice?.join(", ") || ""}
            </Text>
            <Text className="accordionPanelText">
              Approaches Used: {therapist?.approachesUsed?.join(", ") || ""}
            </Text>
            <br></br>
            {therapist?.website && (
              <Button
                size="sm"
                leftIcon={<LinkIcon />}
                colorScheme="brand"
                variant="outline"
                className="leftButton"
                onClick={() => window.open(therapist?.website, "_blank")}
              >
                Therapist&apos;s website
              </Button>
            )}
            {therapist?.phone && (
              <Button
                size="sm"
                leftIcon={<PhoneIcon />}
                colorScheme="brand"
                variant="outline"
                className="middleButton"
              >
                {therapist.phone}
              </Button>
            )}
            {therapist?.contactFormUrl && (
              <Button
                size="sm"
                leftIcon={<LinkIcon />}
                colorScheme="brand"
                variant="outline"
                className="rightButton"
                onClick={() => window.open(therapist.contactFormUrl, "_blank")}
              >
                Contact therapist
              </Button>
            )}
          </div>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

MatchCard.propTypes = {
  therapistId: PropTypes.string.isRequired,
  therapist: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    contactFormUrl: PropTypes.string,
  }),
};

export default MatchCard;