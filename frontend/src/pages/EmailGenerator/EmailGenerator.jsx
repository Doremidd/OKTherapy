import { Container, Text, Button } from "@chakra-ui/react";
import "./style.css";
import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserAsync } from "../../redux/thunk";
import {
  generateAITemplate,
  generateTemplate1,
  generateTemplate2,
} from "./generateTemplates";
import { useSelector } from "react-redux";

const EmailGenerator = () => {
  const dispatch = useDispatch();
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  const [profile, setProfile] = useState();
  const textareaRef = useRef(null);
  const [textAreaValue, setTextAreaValue] = useState("");
  const auth0User = useSelector((state) => state.user.auth0User);
  const [aiTemplate, setAiTemplate] = useState("");

  const generateTemplate = (template, userProfile, auth0User) => {
    if (auth0User && userProfile) {
      switch (template) {
        case 0:
          return generateTemplate1(userProfile, auth0User);
        case 1:
          return generateTemplate2(userProfile, auth0User);
        default:
          return aiTemplate;
      }
    }
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    const createAiTemplate = async () => {
      setAiTemplate(await generateAITemplate(profile, auth0User));
    };
    if (profile && auth0User) {
      createAiTemplate();
    }
  }, [profile, auth0User]);

  useEffect(() => {
    const generateAndSetTemplate = async () => {
      const template = generateTemplate(selectedTemplate, profile, auth0User);
      setTextAreaValue(template);
    };
    if (profile && auth0User) {
      generateAndSetTemplate();
    }
  }, [selectedTemplate, profile, auth0User, aiTemplate]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (auth0User?.sub) {
        const result = await dispatch(getUserAsync(auth0User.sub));
        if (result?.payload) {
          setProfile(result.payload.profile);
        }
      }
    };
    fetchUserProfile();
  }, [dispatch, auth0User]);

  useEffect(() => {
    adjustTextareaHeight();
  }, [textAreaValue]);

  const copyContent = () => {
    navigator.clipboard
      .writeText(textAreaValue)
      .then(() => {
        alert("Email template copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  return (
    <Container maxW="80%" className="mainContainer">
      <Text fontSize="3xl" fontWeight="500" className="alignLeft">
        EMAIL GENERATOR
      </Text>
      <Text className="alignLeft" fontSize="lg" marginBottom="16px">
        Stuck drafting that first email to a therapist? Select template below to
        start generating an email to your matched therapist.
      </Text>
      <div style={{ display: "flex", gap: "24px" }}>
        <Button
          color="black"
          size="lg"
          backgroundColor={selectedTemplate === 0 && "#41534D"}
          onClick={() => setSelectedTemplate(0)}
        >
          Template 1
        </Button>
        <Button
          color="black"
          size="lg"
          backgroundColor={selectedTemplate === 1 && "#41534D"}
          onClick={() => setSelectedTemplate(1)}
        >
          Template 2
        </Button>
        <Button
          color="black"
          size="lg"
          backgroundColor={selectedTemplate === 2 && "#41534D"}
          onClick={() => setSelectedTemplate(2)}
        >
          AI-generated
        </Button>
      </div>
      <br />
      <textarea
        ref={textareaRef}
        value={textAreaValue}
        onChange={(e) => setTextAreaValue(e.target.value)}
        onInput={adjustTextareaHeight}
        style={{
          width: "100%",
          resize: "none",
          overflow: "hidden",
          fontSize: "1rem",
          padding: "8px",
        }}
      />
      <Button onClick={copyContent}>Copy</Button>
    </Container>
  );
};

export default EmailGenerator;
