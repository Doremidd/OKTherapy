import React from 'react'
import { Box, Heading, Text } from '@chakra-ui/react'
import { Stack, HStack, VStack } from '@chakra-ui/react'
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'
import { Select } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import { Checkbox, CheckboxGroup } from '@chakra-ui/react'


export default function Body({isEditing}) {
  const [value, setValue] = React.useState('1')
  return (
    <div>
      <Box position = 'relative' width='80%'  justifyContent="center" height='800px' mt='476px' ml='10%' mr ='10%'>
        <VStack spacing='40px'>

          <HStack as='section' spacing='350px' mt = '-400px' ml = '0px'>
            <Box as='section' ml = '-1rem'>
              <HStack spacing='10px'>
                <Text fontWeight='400' fontSize='17px' color='#000000'>
                  Age
                </Text>
                <NumberInput size='sm' maxW={24} defaultValue={23} min={0} max={100} disabled = {!isEditing}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </HStack>
            </Box>

            <Box as='section' ml = '10px'>
              <HStack spacing='10px'>
                <Text fontWeight='400' fontSize='17px' color='#000000'>
                  Gender
                </Text>
                <Select placeholder='Male' width='250px' disabled = {!isEditing}>
                  <option value='female'>Female</option>
                  <option value='Genderqueer/Non-binary'>Genderqueer/Non-binary</option>
                  <option value='Prefer not to disclose'> Prefer not to disclose</option>
                  <option value='Other'> Other</option>
                </Select>
              </HStack>
            </Box>
          </HStack>

          <HStack as='section' spacing='250px'>
            <Box as='section' ml = '1rem'>
              <HStack spacing='10px'>
                <Text fontWeight='400' fontSize='17px' color='#000000'>
                  Sexuality
                </Text>
                <Select placeholder='Asexual' width='250px' disabled = {!isEditing}>
                  <option value='Bixesual'>Bisexual</option>
                  <option value='Gay'>Gay</option>
                  <option value='Heterosexual or straight'>Heterosexual or Straight</option>
                  <option value='Lesbian'>Lesbian</option>
                  <option value='Pansexual'>Pansexual</option>
                  <option value='Queer'>Queer</option>
                  <option value='Other'>Other</option>
                  <option value='Prefer not to disclose'> Prefer not to disclose</option>
                </Select>
              </HStack>
            </Box>

            <Box as='section' ml='-80px'>
              <HStack spacing='10px'>
                <Text fontWeight='400' fontSize='17px' color='#000000'>
                  Relationship Status
                </Text>
                <Select placeholder='Single' width='200px' disabled = {!isEditing}>
                  <option value='In a relationship'>In a relationship</option>
                  <option value='Married'>Married</option>
                  <option value='Divorced'>Divorced</option>
                  <option value='Widowed'>Widowed</option>
                  <option value='Other'>Other</option>
                </Select>
              </HStack>
            </Box>
          </HStack>

          <HStack as='section' spacing='250px'>
            <Box as='section' ml = '1rem'>
              <HStack spacing='10px'>
                <Text fontWeight='400' fontSize='17px' color='#000000'>
                  Religious beliefs
                </Text>
                <Select placeholder='Christian' width='250px' disabled = {!isEditing}>
                  <option value='Islam'>Islam</option>
                  <option value='Hinduism'>Hinduism</option>
                  <option value='Buddhism'>Buddhism</option>
                  <option value='Judaism'>Judaism</option>
                  <option value='Sikhism'>Sikhism</option>
                  <option value='Atheism/Agnosticism'>Atheism/Agnosticism</option>
                  <option value='Other'>Other</option>
                </Select>
              </HStack>
            </Box>

            <Box as='section' ml='-120px'>
              <HStack spacing='10px'>
                <Text fontWeight='400' fontSize='17px' color='#000000'>
                  Preferred Language
                </Text>
                <Select placeholder='English' width='200px' disabled = {!isEditing}>
                  <option value='Chinese'>Chinese</option>
                  <option value='French'>French</option>
                </Select>
              </HStack>
            </Box>
          </HStack>



          <HStack as='section' spacing='360px'>
          <Box as='section' ml = '-150px'>
              <HStack spacing='10px'>
                <Text fontWeight='400' fontSize='17px' color='#000000'>
                  Min Buldget
                </Text>
                <NumberInput size='sm' step={5} maxW={24} defaultValue={100}  min={100} max = {300} disabled = {!isEditing}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </HStack>
            </Box>

            <Box as='section'>
              <HStack spacing='10px' ml = '-2rem'>
                <Text fontWeight='400' fontSize='17px' color='#000000'>
                  Max Buldget
                </Text>
                <NumberInput size='sm' step={5} maxW={24} defaultValue={100} min={100} max = {300} disabled = {!isEditing}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </HStack>
            </Box>
          </HStack>

          <Box as='section' ml = '-600px'>
            <HStack spacing='10px'>
              <Text fontWeight='400' fontSize='17px' color='#000000'>
                Location
              </Text>
              <Input placeholder='Surray, BC' wdith='1000px' disabled = {!isEditing} />
            </HStack>
          </Box>

          <Box as='section' ml = '-480px'>
            <HStack spacing='10px'>
              <Text fontWeight='400' fontSize='17px' color='#000000'>
                Preferred Therapy Mode
              </Text>
              <Select placeholder='Online' width='200px' disabled = {!isEditing}>
                <option value='In-person'>In-person</option>
                <option value=' No preference'> No preference</option>
              </Select>
            </HStack>
          </Box>

          <Box ml = '-700px'>
            <Text fontWeight='400' fontSize='17px' color='#000000'>
              Current Therapy Focus
            </Text>

            <Stack direction='column' spacing='10px' mt='10px' ml='350px'>
              <Checkbox disabled = {!isEditing}>Abuse</Checkbox>
              <Checkbox disabled = {!isEditing}>Addiction</Checkbox>
              <Checkbox disabled = {!isEditing}>Disorder: OCD, ADHD, Bipolar, Borderline Personality, PTSD</Checkbox>
              <Checkbox disabled = {!isEditing}>Bullying</Checkbox>
              <Checkbox disabled = {!isEditing}>Chronic Illness or Pain</Checkbox>
              <Checkbox disabled = {!isEditing}>Grief or Death</Checkbox>
              <Checkbox disabled = {!isEditing}>Anxiety/Panic Attacks</Checkbox>
              <Checkbox disabled = {!isEditing}>Depression</Checkbox>
              <Checkbox disabled = {!isEditing}> Family conflicts or parental issues</Checkbox>
              <Checkbox disabled = {!isEditing}>Identity: First Nation, Gender, Sexuality, Racial, Spritiuality</Checkbox>
              <Checkbox disabled = {!isEditing}>Self Harm or Suicide ideation</Checkbox>
              <Checkbox disabled = {!isEditing}>Sexual Assault</Checkbox>
              <Checkbox disabled = {!isEditing}>Stress Management</Checkbox>
              <Checkbox disabled = {!isEditing}>Trauma</Checkbox>
              <Input placeholder='Other' wdith='1000px' disabled = {!isEditing}/> 
            </Stack>
          </Box>
        </VStack>
      </Box>
    </div>
  )
}
