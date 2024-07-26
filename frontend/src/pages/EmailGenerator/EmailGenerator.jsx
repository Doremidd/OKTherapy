import { Container, Text, Button } from "@chakra-ui/react";
import "./style.css";
import { useState, useRef, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import { getUserAsync } from "../../redux/thunk";
import { generateTemplate } from "./generateTemplates";

const EmailGenerator = () => {
  const dispatch = useDispatch();
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  const [profile, setProfile] = useState();
  const textareaRef = useRef(null);
  const [textAreaValue, setTextAreaValue] = useState("");
  const { user } = useAuth0();

  useEffect(() => {
    if (profile && user) {
      setTextAreaValue(generateTemplate(selectedTemplate, profile, user));
    }
  }, [selectedTemplate, profile, user]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user?.sub) {
        const result = await dispatch(getUserAsync(user.sub));
        if (result?.payload) {
          setProfile(result.payload.profile);
        }
      }
    };
    fetchUserProfile();
  }, [dispatch, user]);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // Reset height
      textarea.style.height = `${textarea.scrollHeight}px`; // Set new height based on content
    }
  };

  useEffect(() => {
    adjustTextareaHeight(); // Adjust height whenever textAreaValue changes
  }, [textAreaValue]);

  useEffect(() => {
    adjustTextareaHeight(); // Adjust height on initial load
  }, []);

  const copyContent = () => {
    navigator.clipboard.writeText(textAreaValue).catch((err) => {
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
