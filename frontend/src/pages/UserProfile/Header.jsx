import React from 'react'
import { Box, Heading, Text } from '@chakra-ui/react'
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import { Stack, HStack, VStack } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'


export default function Header({isEditing,onEdit}) {
  return (
    <Box as='section' background='#F0ECF7'
      width='1440px' height='240px' pt='80px'>
      <HStack spacing='40px'>
        <Avatar size="xl" ml = '200px'></Avatar>
        <Box ml ='30px'>
          <Heading fontWeight='500' fontSize='30px' color='#000000'>
            First Name Last Name
          </Heading>
          <Text fontWeight='400' fontSize='20px' color='#000000' pr = '200px'>
            Joined (Date)
          </Text>
        </Box>
        {!isEditing &&  <Button colorScheme='teal' size='md' ml = '350px' mt = '-20px' onClick={onEdit}>Edit</Button>}
      </HStack>

    </Box>
  )
}
