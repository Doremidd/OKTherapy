import { Box, Text } from "@chakra-ui/react";
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
  therapyModes,
} from "../Form/FormOption";

// eslint-disable-next-line react/prop-types
export default function Body({ isEditing }) {
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
                  defaultValue={23}
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
                <Select placeholder="Male" width="250px" disabled={!isEditing}>
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
                  placeholder="Asexual"
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
                  placeholder="Single"
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
                  placeholder="Christian"
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
                  placeholder="English"
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
                  defaultValue={100}
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
                  defaultValue={100}
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
                placeholder="Surrey, BC"
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
              <Select placeholder="Online" width="200px" disabled={!isEditing}>
                {therapyModes.map((mode, index) => (
                  <Radio key={index} value={mode}>
                    {mode}
                  </Radio>
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
                 <Checkbox key={index} disabled={!isEditing}>{focus}</Checkbox>
              ))}
              <Input placeholder="Other" width="400px" disabled={!isEditing} />
            </Stack>
          </Box>
        </VStack>
      </Box>
    </div>
  );
}
