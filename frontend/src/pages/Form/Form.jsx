import { useState } from 'react';
import { Box, FormControl, FormLabel, Input, Select, Button, RadioGroup, Radio, Stack, Progress } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const TherapyForm = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    age: '',
    therapyType: '',
    therapyMode: '',
    therapistGender: '',
    budget: '',
    location: '',
    relationshipStatus: '',
    language: '',
    religiousBeliefs: '',
    noTimesPerWeek: '',
  });
  const navigate = useNavigate();

  const steps = [
    {
      label: 'Age',
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
      label: 'Therapy Type',
      component: (
        <FormControl id="therapy-type" isRequired>
          <FormLabel>Therapy Type</FormLabel>
          <Select
            placeholder="Select therapy type"
            value={formData.therapyType}
            onChange={(e) => setFormData({ ...formData, therapyType: e.target.value })}
          >
            <option value="individual">Individual Therapy</option>
            <option value="couples">Couples Therapy</option>
            <option value="family">Family Therapy</option>
            <option value="group">Group Therapy</option>
          </Select>
        </FormControl>
      ),
    },
    {
      label: 'Therapy Mode',
      component: (
        <FormControl id="therapy-mode" isRequired>
          <FormLabel>Therapy Mode</FormLabel>
          <RadioGroup
            value={formData.therapyMode}
            onChange={(value) => setFormData({ ...formData, therapyMode: value })}
          >
            <Stack direction="row">
              <Radio value="online">Online</Radio>
              <Radio value="in-person">In-Person</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>
      ),
    },
    {
      label: 'Preferred Gender of Therapist',
      component: (
        <FormControl id="therapist-gender" isRequired>
          <FormLabel>What gender of therapist do you prefer?</FormLabel>
          <RadioGroup
            value={formData.therapistGender}
            onChange={(value) => setFormData({ ...formData, therapistGender: value })}
          >
            <Stack direction="row">
              <Radio value="male">Male</Radio>
              <Radio value="female">Female</Radio>
              <Radio value="other">Other</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>
      ),
    },
    {
      label: 'Budget',
      component: (
        <FormControl id="budget" isRequired>
          <FormLabel>What’s your budget?</FormLabel>
          <Input
            type="text"
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            placeholder="Your Budget"
          />
        </FormControl>
      ),
    },
    {
      label: 'Location',
      component: (
        <FormControl id="location" isRequired>
          <FormLabel>Where are you located?</FormLabel>
          <Select
            placeholder="Select location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          >
            <option value="in-bc">In B.C</option>
            <option value="outside-bc">Outside B.C</option>
          </Select>
        </FormControl>
      ),
    },
    {
      label: 'Relationship Status',
      component: (
        <FormControl id="relationship-status" isRequired>
          <FormLabel>Relationship Status</FormLabel>
          <Select
            placeholder="Select your relationship status"
            value={formData.relationshipStatus}
            onChange={(e) => setFormData({ ...formData, relationshipStatus: e.target.value })}
          >
            <option value="single">Single</option>
            <option value="in-relationship">In a Relationship</option>
            <option value="married">Married</option>
            <option value="divorced">Divorced</option>
            <option value="widowed">Widowed</option>
          </Select>
        </FormControl>
      ),
    },
    {
      label: 'Language',
      component: (
        <FormControl id="language" isRequired>
          <FormLabel>Prefered Language</FormLabel>
          <Select
            placeholder="Select language"
            value={formData.language}
            onChange={(e) => setFormData({ ...formData, language: e.target.value })}
          >
            <option value="English">English</option>
            <option value="French">French</option>
            <option value="Spanish">Spanish</option>
            <option value="Punjabi">Punjabi</option>
            <option value="Other">Other</option>
          </Select>
        </FormControl>
      ),
    },
    {
      label: 'Religious Beliefs',
      component: (
        <FormControl id="religiousBeliefs">
          <FormLabel>What are your religious/spiritual beliefs?</FormLabel>
          <Select
            placeholder=""
            value={formData.religiousBeliefs}
            onChange={(e) => setFormData({ ...formData, religiousBeliefs: e.target.value })}
          >
            <option value="Christianity">Christianity</option>
            <option value="Judaism">Judaism</option>
            <option value="Islam">Islam</option>
            <option value="Hinduism">Hinduism</option>
            <option value="Buddhism">Buddhism</option>
            <option value="Other">Other</option>
          </Select>
        </FormControl>
      ),
    },
    {
      label: 'Number of Times per week',
      component: (
        <FormControl id="noTimesPerWeek">
          <FormLabel>How many times per week are you looking for?</FormLabel>
          <Select
            placeholder=""
            value={formData.noTimesPerWeek}
            onChange={(e) => setFormData({ ...formData, noTimesPerWeek: e.target.value })}
          >
            <option value="1-2">1-2</option>
            <option value="3-4">3-4</option>
            <option value="5-7">5-7</option>
          </Select>
        </FormControl>
      ),
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
    console.log('Form submitted:', formData);
    navigate('/matches');
  };

  return (
    <Box maxW="md" mx="auto" mt={10} p={5} borderWidth={1} borderRadius="lg" boxShadow="lg">
      <Progress value={(step + 1) * (100 / steps.length)} mb={5} />
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
  );
};

export default TherapyForm;