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
  CheckboxGroup,
  Checkbox,
} from "@chakra-ui/react";
import BudgetSlider from "../../components/BudgetSlider";
import {
  certification,
  genders,
  sexualities,
  therapistGender,
  therapyFocus,
  therapyMethods,
  therapyModes,
} from "../../constants/formOptions";
import { useDispatch } from "react-redux";
import { createUserAsync } from "../../redux/thunk";
import { useSelector } from "react-redux";
import { updateUserProfile } from "../../util/updateUserProfile";

const TherapyForm = () => {
  const auth0User = useSelector((state) => state.user.auth0User);
  const dispatch = useDispatch();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    sexuality: "",
    location: "",
    budget: [],
    therapyMode: "",
    therapyFocus: [],
    therapistGender: "",
    therapyMethods: [],
    certification: [],
  });

  const isOtherGender =
    !genders.includes(formData.gender) && formData.gender !== "";
  const isOtherSexuality =
    !sexualities.includes(formData.sexuality) && formData.sexuality !== "";
  const steps = [
    {
      label: "First Name",
      component: (
        <FormControl id="firstName" isRequired>
          <FormLabel>First Name</FormLabel>
          <Input
            type="text"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            placeholder="Your First Name"
          />
        </FormControl>
      ),
    },
    {
      label: "Last Name",
      component: (
        <FormControl id="lastName" isRequired>
          <FormLabel>Last Name</FormLabel>
          <Input
            type="text"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            placeholder="Your Last Name"
          />
        </FormControl>
      ),
    },
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
            <option value="other">No preference</option>
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
      label: "Location",
      component: (
        <FormControl id="location" isRequired>
          <FormLabel>Where are you located?</FormLabel>
          <Input
            placeholder="Where are you located?"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
          />
        </FormControl>
      ),
    },
    {
      label: "Budget",
      component: (
        <FormControl id="budget" isRequired>
          <FormLabel>What is your budget?</FormLabel>
          <BudgetSlider formData={formData} setFormData={setFormData} />
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
      label: "Therapy focus",
      component: (
        <FormControl id="therapyFocus" isRequired>
          <FormLabel>What are the main issues you want to address in therapy?</FormLabel>
          <CheckboxGroup
            value={formData.therapyFocus}
            onChange={(values) =>
              setFormData({ ...formData, therapyFocus: values })
            }
          >
            <Stack>
              {therapyFocus.map((mode, index) => (
                <Checkbox
                  key={index}
                  value={mode}
                  style={{ textAlign: "left" }}
                  isRequired={false}
                >
                  {mode}
                </Checkbox>
              ))}
            </Stack>
          </CheckboxGroup>
        </FormControl>
      ),
    },
    {
      label: "Preferred Therapy Methods",
      component: (
        <FormControl id="therapyMethods" isRequired>
          <FormLabel>
          What type of therapy are you interested in?
          </FormLabel>
          <CheckboxGroup
            value={formData.therapyMethods}
            onChange={(values) =>
              setFormData({ ...formData, therapyMethods: values })
            }
          >
            <Stack>
              {therapyMethods.map((mode, index) => (
                <Checkbox
                  key={index}
                  value={mode}
                  style={{ textAlign: "left" }}
                  isRequired={false}
                >
                  {mode}
                </Checkbox>
              ))}
            </Stack>
          </CheckboxGroup>
        </FormControl>
      ),
    },
    {
      label: "Preferred Therapist Gender",
      component: (
        <FormControl id="therapistGender" isRequired>
          <FormLabel>
          Do you have a preference for the therapist&apos;s gender?
          </FormLabel>
          <Select
            placeholder="Do you have a preference for the therapist&apos;s gender?"
            value={formData.therapistGender}
            onChange={(e) =>
              setFormData({ ...formData, therapistGender: e.target.value })
            }
          >
            {therapistGender.map((gender, index) => (
              <option key={index} value={gender}>
                {gender}
              </option>
            ))}
          </Select>
        </FormControl>
      ),
    },
    {
      label: "Certification",
      component: (
        <FormControl id="certification" isRequired>
          <FormLabel>
            Do you have a preference for the therapist&apos;s certification?
          </FormLabel>
          <CheckboxGroup
            value={formData.certification}
            onChange={(values) =>
              setFormData({ ...formData, certification: values })
            }
          >
            <Stack>
              {certification.map((mode, index) => (
                <Checkbox
                  key={index}
                  value={mode}
                  style={{ textAlign: "left" }}
                  isRequired={false}
                >
                  {mode}
                </Checkbox>
              ))}
            </Stack>
          </CheckboxGroup>
        </FormControl>
      ),
    },
    // {
    //   label: "Filler",
    //   component: <></>,
    // },
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createUserAsync({ userProfile: formData, username: auth0User?.sub }));
      await updateUserProfile(auth0User?.sub);
      console.log("Form submitted:", formData);
    } catch (error) {
      console.error(error);
    }
    window.location.reload();
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