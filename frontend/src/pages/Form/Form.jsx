import { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  RadioGroup,
  Radio,
  Stack,
  Progress,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import BudgetSlider from "../../components/BudgetSlider";
import {
  genders,
  sexualities,
  relationshipStatuses,
  religiousBeliefs,
  languages,
  therapyModes,
  therapyFocus,
} from "./FormOption";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";

const TherapyForm = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    sexuality: "",
    relationshipStatus: "",
    religiousBeliefs: "",
    therapyMode: "",
    budget: "",
    location: "",
    language: "",
    noTimesPerWeek: "",
    therapyFocus: "",
  });
  const navigate = useNavigate();

  const isOtherGender =
    !genders.includes(formData.gender) && formData.gender !== "";
  const isOtherSexuality =
    !sexualities.includes(formData.sexuality) && formData.sexuality !== "";
  const isOtherReligion =
    !religiousBeliefs.includes(formData.religiousBeliefs) &&
    formData.religiousBeliefs !== "";
  const isOtherLanguage =
    !languages.includes(formData.language) && formData.language !== "";

  const steps = [
    {
      label: "Age",
      component: (
        <FormControl id="age" isRequired>
          <FormLabel>Age</FormLabel>
          <Input
            type="number"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            placeholder="Your Age"
          />
        </FormControl>
      ),
    },
    {
      label: "Gender",
      component: (
        <FormControl id="gender" isRequired>
          <FormLabel>Gender</FormLabel>
          <Select
            placeholder="What gender do you identify as?"
            value={formData.gender}
            onChange={(e) =>
              setFormData({ ...formData, gender: e.target.value })
            }
          >
            {genders.map((gender, index) => (
              <option key={index} value={gender}>
                {gender}
              </option>
            ))}
            <option value="other">Other</option>
          </Select>
          {isOtherGender && (
            <Input
              placeholder="Please specify"
              defaultValue=""
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
              mt={2}
            />
          )}
        </FormControl>
      ),
    },
    {
      label: "Sexuality",
      component: (
        <FormControl id="sexuality" isRequired>
          <FormLabel>Sexuality</FormLabel>
          <Select
            placeholder="What is your sexuality?"
            value={formData.sexuality}
            onChange={(e) =>
              setFormData({ ...formData, sexuality: e.target.value })
            }
          >
            {sexualities.map((sexuality, index) => (
              <option key={index} value={sexuality}>
                {sexuality}
              </option>
            ))}
            <option value="other">Other</option>
          </Select>
          {isOtherSexuality && (
            <Input
              placeholder="Please specify"
              defaultValue=""
              onChange={(e) =>
                setFormData({ ...formData, sexuality: e.target.value })
              }
              mt={2}
            />
          )}
        </FormControl>
      ),
    },
    {
      label: "Relationship Status",
      component: (
        <FormControl id="relationship-status" isRequired>
          <FormLabel>Relationship Status</FormLabel>
          <Select
            placeholder="Select your relationship status"
            value={formData.relationshipStatus}
            onChange={(e) =>
              setFormData({ ...formData, relationshipStatus: e.target.value })
            }
          >
            {relationshipStatuses.map((status, index) => (
              <option key={index} value={status}>
                {status}
              </option>
            ))}
          </Select>
        </FormControl>
      ),
    },
    {
      label: "Religious Beliefs",
      component: (
        <FormControl id="religiousBeliefs">
          <FormLabel>What are your religious/spiritual beliefs?</FormLabel>
          <Select
            placeholder="Select your religious/spirituality"
            value={formData.religiousBeliefs}
            onChange={(e) =>
              setFormData({ ...formData, religiousBeliefs: e.target.value })
            }
          >
            {religiousBeliefs.map((religion, index) => (
              <option key={index} value={religion}>
                {religion}
              </option>
            ))}
            <option value="Other">Other</option>
          </Select>
          {isOtherReligion && (
            <Input
              placeholder="Please specify"
              defaultValue=""
              onChange={(e) =>
                setFormData({ ...formData, religiousBeliefs: e.target.value })
              }
              mt={2}
            />
          )}
        </FormControl>
      ),
    },
    {
      label: "Preferred Therapy Mode",
      component: (
        <FormControl id="therapy-mode" isRequired>
          <FormLabel>Therapy Mode</FormLabel>
          <RadioGroup
            value={formData.therapyMode}
            onChange={(value) =>
              setFormData({ ...formData, therapyMode: value })
            }
          >
            <Stack direction="row">
              {therapyModes.map((mode, index) => (
                <Radio key={index} value={mode}>
                  {mode}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
        </FormControl>
      ),
    },
    {
      label: "Budget",
      component: (
        <FormControl id="budget" isRequired>
          <FormLabel>What’s your budget?</FormLabel>
          <BudgetSlider formData={formData} setFormData={setFormData} />
        </FormControl>
      ),
    },
    {
      label: "Location",
      component: (
        <FormControl id="location" isRequired>
          <FormLabel>Where are you located?</FormLabel>
          <Select
            placeholder="Select location"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
          >
            <option value="in-bc">In B.C</option>
            <option value="outside-bc">Outside B.C</option>
          </Select>
        </FormControl>
      ),
    },
    {
      label: "Language",
      component: (
        <FormControl id="language" isRequired>
          <FormLabel>Preferred Language</FormLabel>
          <Select
            placeholder="Select language"
            value={formData.language}
            onChange={(e) =>
              setFormData({ ...formData, language: e.target.value })
            }
          >
            {languages.map((language, index) => (
              <option key={index} value={language}>
                {language}
              </option>
            ))}
            <option value="Other">Other</option>
          </Select>
          {isOtherLanguage && (
            <Input
              placeholder="Please specify"
              defaultValue=""
              onChange={(e) =>
                setFormData({ ...formData, language: e.target.value })
              }
              mt={2}
            />
          )}
        </FormControl>
      ),
    },
    {
      label: "Current focus",
      component: (
        <FormControl id="therapyFocus">
          <FormLabel>What are you currently struggling with?</FormLabel>
          <AutoComplete
            openOnFocus
            value={formData.therapyFocus}
            onChange={(value) => {
              setFormData({ ...formData, therapyFocus: value });
            }}
          >
            <AutoCompleteInput variant="filled" />
            <AutoCompleteList>
              {therapyFocus.map((focus, cid) => (
                <AutoCompleteItem
                  style={{ textAlign: "left" }}
                  key={`option-${cid}`}
                  value={focus}
                  textTransform="capitalize"
                >
                  {focus}
                </AutoCompleteItem>
              ))}
            </AutoCompleteList>
          </AutoComplete>
        </FormControl>
      ),
    },
    {
      label: "Number of Times per week",
      component: (
        <FormControl id="noTimesPerWeek">
          <FormLabel>How many times per week are you looking for?</FormLabel>
          <Select
            placeholder=""
            value={formData.noTimesPerWeek}
            onChange={(e) =>
              setFormData({ ...formData, noTimesPerWeek: e.target.value })
            }
          >
            <option value="1-2">1-2</option>
            <option value="3-4">3-4</option>
            <option value="5-7">5-7</option>
          </Select>
        </FormControl>
      ),
    },
    {
      label: "Filler",
      component: <></>,
    },
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    navigate("/matches");
  };

  return (
    <div
      style={{
        minHeight: "70vh",
      }}
    >
      <Box
        maxW="md"
        mx="auto"
        mt={10}
        p={5}
        borderWidth={1}
        borderRadius="lg"
        boxShadow="lg"
      >
        <Progress
          value={(step + 1) * (100 / steps.length)}
          mb={5}
          sx={{
            "& > div:first-of-type": {
              bg: "brand.400",
            },
          }}
        />
        <form onSubmit={handleSubmit}>
          {steps[step].component}
          <Box mt={5} display="flex" justifyContent="space-between">
            {step > 0 && <Button onClick={handlePrevious}>Previous</Button>}
            {step < steps.length - 1 ? (
              <Button colorScheme="teal" onClick={handleNext}>
                Next
              </Button>
            ) : (
              <Button colorScheme="teal" type="submit">
                Submit
              </Button>
            )}
          </Box>
        </form>
      </Box>
    </div>
  );
};

export default TherapyForm;
