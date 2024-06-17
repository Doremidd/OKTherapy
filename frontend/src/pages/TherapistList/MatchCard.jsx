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

const MatchCard = () => {
  return (
    <Accordion allowMultiple>
      <AccordionItem className="accordion">
        <AccordionButton>
          <div className="accordionContent">
            <div className="avatarTextContainer">
              <Avatar size="xl" />
              <div className="alignLeft">
                <Text fontSize="xl" fontWeight="500">
                  FirstName LastName
                </Text>
                <Text>New Westminster | Online ✔️</Text>
                <Text>$150/session</Text>
              </div>
            </div>
            <AccordionIcon />
          </div>
        </AccordionButton>
        <AccordionPanel>
          <div className="accordionPanel">
            <Text className="accordionPanelText">
              Specializes in: Anxiety, Grief Counselling, Relationships
            </Text>
            <Text className="accordionPanelText">
              Languages Spoken: English, Mandarin, Cantonese
            </Text>
            <br></br>
            <Button
              size="sm"
              leftIcon={<EmailIcon />}
              colorScheme="brand"
              variant="outline"
              className="leftButton"
            >
              email@gmail.com
            </Button>
            <Button
              size="sm"
              leftIcon={<PhoneIcon />}
              colorScheme="brand"
              variant="outline"
              className="rightButton"
            >
              604-888-8888
            </Button>
          </div>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default MatchCard;
