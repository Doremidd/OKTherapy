import { Box, Text, useDisclosure } from "@chakra-ui/react";
import { Stack, HStack, VStack } from "@chakra-ui/react";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Radio,
} from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Checkbox } from "@chakra-ui/react";
import {
  genders,
  sexualities,
  relationshipStatuses,
  religiousBeliefs,
  languages,
  therapyFocus,
  therapyModes
} from "../Form/FormOption";
import { useSelector, useDispatch } from 'react-redux';
import { useState } from "react";


// eslint-disable-next-line react/prop-types
export default function Body({ isEditing }) {
  const value = useSelector(state => state.user.value);
  const [age,setAge] = useState(value.age);
  const [gender,setGender] = useState(value.gender);
  const [sexuality,setSexuality] = useState(value.sexuality);
  const [relationship,setRelationship] = useState(value.relationshipStatus);
  const [religous,setReglious] = useState(value.religiousBeliefs);
  const [min,setMin] = useState(value.minbudget);
  const [max,setMax] = useState(value.maxbudget);
  const [location,setLocation] = useState(value.location);
  const [language,setLanguage] = useState(value.language);
  const [therapyMode,setTherapyMode] = useState(value.therapyMode);
  const [therapyFocus,setTherapyFocus] = useState(value.therapyFocus);

  const dispatch = useDispatch();

  return (
    <div>
      <Box
        position="relative"
        width="80%"
        justifyContent="center"
        mt="476px"
        ml="10%"
        mr="10%"
      >
        <VStack spacing="40px">
          <HStack as="section" spacing="350px" mt="-400px" ml="0px">
            <Box as="section" ml="-1rem">
              <HStack spacing="10px">
                <Text fontWeight="400" fontSize="17px" color="#000000">
                  Age
                </Text>
                <NumberInput
                  size="sm"
                  maxW={24}
                  value={age}
                  onChange = {(valueString) => setAge(parse(valueString))}
                  min={0}
                  max={100}
                  disabled={!isEditing}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </HStack>
            </Box>

            <Box as="section" ml="10px">
              <HStack spacing="10px">
                <Text fontWeight="400" fontSize="17px" color="#000000">
                  Gender
                </Text>
                <Select value={gender} onChange = {(e) => setGender(e.target.value)} width="250px" disabled={!isEditing}>
                  {genders.map((gender, index) => (
                    <option key={index} value={gender}>
                      {gender}
                    </option>
                  ))}
                  <option value="Other"> Other</option>
                </Select>
              </HStack>
            </Box>
          </HStack>

          <HStack as="section" spacing="250px">
            <Box as="section" ml="1rem">
              <HStack spacing="10px">
                <Text fontWeight="400" fontSize="17px" color="#000000">
                  Sexuality
                </Text>
                <Select
                  value={sexuality} onChange = {(e) => setSexuality(e.target.value)}
                  width="250px"
                  disabled={!isEditing}
                >
                  {sexualities.map((sexuality, index) => (
                    <option key={index} value={sexuality}>
                      {sexuality}
                    </option>
                  ))}
                  <option value="Other">Other</option>
                </Select>
              </HStack>
            </Box>

            <Box as="section" ml="-80px">
              <HStack spacing="10px">
                <Text fontWeight="400" fontSize="17px" color="#000000">
                  Relationship Status
                </Text>
                <Select
                  value={relationship} onChange = {(e) => setRelationship(e.target.value)}
                  width="200px"
                  disabled={!isEditing}
                >
                  {relationshipStatuses.map((status, index) => (
                    <option key={index} value={status}>
                      {status}
                    </option>
                  ))}
                </Select>
              </HStack>
            </Box>
          </HStack>

          <HStack as="section" spacing="250px">
            <Box as="section" ml="1rem">
              <HStack spacing="10px">
                <Text fontWeight="400" fontSize="17px" color="#000000">
                  Religious beliefs
                </Text>
                <Select
                 value={religous} onChange = {(e) => setReglious(e.target.value)}
                  width="250px"
                  disabled={!isEditing}
                >
                  {religiousBeliefs.map((religion, index) => (
                    <option key={index} value={religion}>
                      {religion}
                    </option>
                  ))}
                  <option value="Other">Other</option>
                </Select>
              </HStack>
            </Box>

            <Box as="section" ml="-120px">
              <HStack spacing="10px">
                <Text fontWeight="400" fontSize="17px" color="#000000">
                  Preferred Language
                </Text>
                <Select
                  value={language} onChange = {(e) => setLanguage(e.target.value)}
                  width="200px"
                  disabled={!isEditing}
                >
                  {languages.map((language, index) => (
                    <option key={index} value={language}>
                      {language}
                    </option>
                  ))}
                </Select>
              </HStack>
            </Box>
          </HStack>

          <HStack as="section" spacing="360px">
            <Box as="section" ml="-150px">
              <HStack spacing="10px">
                <Text fontWeight="400" fontSize="17px" color="#000000">
                  Min Budget
                </Text>
                <NumberInput
                  size="sm"
                  step={5}
                  maxW={24}
                  value={min} 
                  onChange = {(valueString) => setMin(parse(valueString))}
                  min={100}
                  max={300}
                  disabled={!isEditing}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </HStack>
            </Box>

            <Box as="section">
              <HStack spacing="10px" ml="-2rem">
                <Text fontWeight="400" fontSize="17px" color="#000000">
                  Max Budget
                </Text>
                <NumberInput
                  size="sm"
                  step={5}
                  maxW={24}
                  value={max} 
                  onChange = {(valueString) => setMax(parse(valueString))}
                  min={100}
                  max={300}
                  disabled={!isEditing}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </HStack>
            </Box>
          </HStack>

          <Box as="section" ml="-600px">
            <HStack spacing="10px">
              <Text fontWeight="400" fontSize="17px" color="#000000">
                Location
              </Text>
              <Input
                value={location} onChange = {(e) => setLocation(e.target.value)}
                wdith="1000px"
                disabled={!isEditing}
              />
            </HStack>
          </Box>

          <Box as="section" ml="-480px">
            <HStack spacing="10px">
              <Text fontWeight="400" fontSize="17px" color="#000000">
                Preferred Therapy Mode
              </Text>
              <Select value={therapyMode} onChange = {(e) => setTherapyMode(e.target.value)} width="200px" disabled={!isEditing}>
                {therapyModes.map((mode, index) => (
                  <option key={index} value={mode}>
                    {mode}
                  </option>
                ))}
              </Select>
            </HStack>
          </Box>

          <Box ml="-700px">
            <Text fontWeight="400" fontSize="17px" color="#000000">
              Current Therapy Focus
            </Text>

            <Stack direction="column" spacing="10px" mt="10px" ml="350px">
            {therapyFocus.map((focus, index) => (
                 <Checkbox key={index}  isChecked={therapyFocus[index]}  onChange = {(e) => setTherapyFocus(e.target.value)[index]}
                 disabled={!isEditing}>{focus}</Checkbox>
              ))}
              <Input placeholder="Other" width="400px" disabled={!isEditing} />
            </Stack>
          </Box>
        </VStack>
      </Box>


    </div>
  );
}
