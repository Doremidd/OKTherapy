import {
  Text,
  Avatar,
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionIcon,
  AccordionPanel,
  Button,
  Box,
  Flex,
} from "@chakra-ui/react";
import "./style.css";
import { LinkIcon, PhoneIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { getTherapist } from "../../redux/therapistSlice";
import { useMediaQuery } from "@chakra-ui/react";

const MatchCard = ({ therapistId }) => {
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");
  const dispatch = useDispatch();
  const [therapist, setTherapist] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);

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
                  {therapist?.onlineAvailability === "Yes" && " | Online ✔️ "}
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
              <strong>Description:</strong>{" "}
              {showFullDescription
                ? therapist?.description || "No description available"
                : `${(therapist?.description || "No description available").slice(0, 100)}...`}
            </Text>
            {showFullDescription && (
              <>
                <Text className="accordionPanelText">
                  <strong>Specializes in:</strong> {therapist?.areaOfPractice?.join(", ") || ""}
                </Text>
                <Text className="accordionPanelText">
                  <strong>Approaches Used:</strong> {therapist?.approachesUsed?.join(", ") || ""}
                </Text>
              </>
            )}
            <br />
            <Flex
              justifyContent="space-between"
              alignItems="center"
              flexWrap="wrap"
            >
              <Box flex="1">
                <Flex
                  gap="8px"
                  flexDirection={isLargerThan800 ? "row" : "column"}
                  justifyContent="flex-start"
                  alignItems="flex-start"
                >
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
                      marginLeft="0px"
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
                      marginLeft="0px"
                      onClick={() =>
                        window.open(therapist.contactFormUrl, "_blank")
                      }
                    >
                      Contact therapist
                    </Button>
                  )}
                </Flex>
              </Box>
              <Box>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFullDescription(!showFullDescription)}
                >
                  {showFullDescription ? "Less..." : "More..."}
                </Button>
              </Box>
            </Flex>
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