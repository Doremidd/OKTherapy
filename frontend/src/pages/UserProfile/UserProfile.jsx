import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { updateProfile } from "../../redux/reducer";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Textarea,
  Select,
  Input,
  Checkbox,
  Stack,
  HStack,
  VStack,
  Box,
  Text,
} from "@chakra-ui/react";
import {
  genders,
  sexualities,
  therapyFocus as therapyFocuses,
  therapyModes,
  therapistGender,
  therapyMethods,
  certification,
} from "../../constants/formOptions";
import { useSelector, useDispatch } from "react-redux";

const UserProfile = () => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const value = useSelector((state) => state.user.value);
  const [profileValues, setProfileValues] = useState(value);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setProfileValues(value);
  };

  const handleSave = () => {
    setIsEditing(false);
    dispatch(updateProfile(profileValues));
  };

  const handleCheckboxChange = (category, item, checked) => {
    const updatedList = checked
      ? [...profileValues[category], item]
      : profileValues[category].filter((i) => i !== item);
    setProfileValues({ ...profileValues, [category]: updatedList });
  };

  return (
    <>
      <Header isEditing={isEditing} onEdit={handleEdit} />
      <div>
        <Box mt="48px" mb="48px">
          <VStack
            spacing="40px"
            alignItems="start"
            paddingLeft="20%"
            paddingRight="20%"
            textAlign="left"
          >
            <HStack as="section" justifyContent="space-between" width="100%">
              <HStack width="40%">
                <Text>Age</Text>
                <NumberInput
                  size="sm"
                  value={profileValues.age}
                  onChange={(valueString) =>
                    setProfileValues({
                      ...profileValues,
                      age: parseInt(valueString),
                    })
                  }
                  min={0}
                  max={100}
                  w="100px"
                  disabled={!isEditing}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </HStack>
              <HStack width="40%">
                <Text>Gender</Text>
                <Select
                  value={profileValues.gender}
                  onChange={(e) =>
                    setProfileValues({
                      ...profileValues,
                      gender: e.target.value,
                    })
                  }
                  disabled={!isEditing}
                >
                  {genders.map((gender, index) => (
                    <option key={index} value={gender}>
                      {gender}
                    </option>
                  ))}
                  <option value="Other">Other</option>
                </Select>
              </HStack>
            </HStack>
            <HStack as="section" justifyContent="space-between" width="100%">
              <HStack width="40%">
                <Text>Sexuality</Text>
                <Select
                  value={profileValues.sexuality}
                  onChange={(e) =>
                    setProfileValues({
                      ...profileValues,
                      sexuality: e.target.value,
                    })
                  }
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
              <HStack width="40%">
                <Text>Location</Text>
                <Input
                  value={profileValues.location}
                  onChange={(e) =>
                    setProfileValues({
                      ...profileValues,
                      location: e.target.value,
                    })
                  }
                  disabled={!isEditing}
                />
              </HStack>
            </HStack>
            <HStack as="section" justifyContent="space-between" width="100%">
              <HStack width="40%">
                <Text>Min Budget</Text>
                <NumberInput
                  size="sm"
                  step={5}
                  value={profileValues.budget[0]}
                  onChange={(valueString) =>
                    setProfileValues((prevValues) => ({
                      ...prevValues,
                      budget: [parseInt(valueString), prevValues.budget[1]],
                    }))
                  }
                  min={100}
                  max={300}
                  w="100px"
                  disabled={!isEditing}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </HStack>
              <HStack width="40%">
                <Text>Max Budget</Text>
                <NumberInput
                  size="sm"
                  step={5}
                  value={profileValues.budget[1]}
                  onChange={(valueString) =>
                    setProfileValues((prevValues) => ({
                      ...prevValues,
                      budget: [prevValues.budget[0], parseInt(valueString)],
                    }))
                  }
                  min={100}
                  max={300}
                  w="100px"
                  disabled={!isEditing}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </HStack>
            </HStack>
            <HStack as="section" justifyContent="space-between" width="100%">
              <HStack width="40%">
                <Text>Therapy Mode</Text>
                <Select
                  value={profileValues.therapistModes}
                  onChange={(e) =>
                    setProfileValues({
                      ...profileValues,
                      therapistModes: e.target.value,
                    })
                  }
                  disabled={!isEditing}
                >
                  {therapyModes.map((mode, index) => (
                    <option key={index} value={mode}>
                      {mode}
                    </option>
                  ))}
                </Select>
              </HStack>
              <HStack width="40%">
                <Text>Therapist Gender</Text>
                <Select
                  value={profileValues.therapistGender}
                  onChange={(e) =>
                    setProfileValues({
                      ...profileValues,
                      therapistGender: e.target.value,
                    })
                  }
                  disabled={!isEditing}
                >
                  {therapistGender.map((gender, index) => (
                    <option key={index} value={gender}>
                      {gender}
                    </option>
                  ))}
                </Select>
              </HStack>
            </HStack>
            {(profileValues.therapyFocus.length > 0 || isEditing) && (
              <Box>
                <HStack>
                  {" "}
                  <Text>Therapy Focus:</Text>
                  {!isEditing && (
                    <Textarea
                      placeholder={profileValues.therapyFocus.join(", ")}
                      disabled={true}
                    />
                  )}
                </HStack>
                {isEditing && (
                  <Stack direction="column" spacing="10px" ml="16px">
                    {therapyFocuses.map((focus, index) => (
                      <Checkbox
                        key={index}
                        defaultChecked={profileValues.therapyFocus.includes(
                          focus
                        )}
                        onChange={(e) =>
                          handleCheckboxChange(
                            "therapyFocus",
                            focus,
                            e.target.checked
                          )
                        }
                        disabled={!isEditing}
                      >
                        {focus}
                      </Checkbox>
                    ))}
                  </Stack>
                )}
              </Box>
            )}
            {(profileValues.therapyMethods.length > 0 || isEditing) && (
              <Box>
                <HStack>
                  {" "}
                  <Text>Therapy Methods:</Text>
                  {!isEditing && (
                    <Textarea
                      placeholder={profileValues.therapyMethods.join(", ")}
                      disabled={true}
                    />
                  )}
                </HStack>
                {isEditing && (
                  <Stack direction="column" spacing="10px" ml="16px">
                    {therapyMethods.map((method, index) => (
                      <Checkbox
                        key={index}
                        defaultChecked={profileValues.therapyMethods.includes(
                          method
                        )}
                        onChange={(e) =>
                          handleCheckboxChange(
                            "therapyMethods",
                            method,
                            e.target.checked
                          )
                        }
                        disabled={!isEditing}
                      >
                        {method}
                      </Checkbox>
                    ))}
                  </Stack>
                )}
              </Box>
            )}
            {(profileValues.certification.length > 0 || isEditing) && (
              <Box>
                <HStack>
                  {" "}
                  <Text>Therapist Certifications:</Text>
                  {!isEditing && (
                    <Textarea
                      placeholder={profileValues.certification.join(", ")}
                      disabled={true}
                    />
                  )}
                </HStack>
                {isEditing && (
                  <Stack direction="column" spacing="10px" ml="16px">
                    {certification.map((cert, index) => (
                      <Checkbox
                        key={index}
                        defaultChecked={profileValues.certification.includes(
                          cert
                        )}
                        onChange={(e) =>
                          handleCheckboxChange(
                            "certification",
                            cert,
                            e.target.checked
                          )
                        }
                        disabled={!isEditing}
                      >
                        {cert}
                      </Checkbox>
                    ))}
                  </Stack>
                )}
              </Box>
            )}
          </VStack>
        </Box>
      </div>
      {isEditing && <Footer onCancel={handleCancel} onSave={handleSave} />}
    </>
  );
};

export default UserProfile;
