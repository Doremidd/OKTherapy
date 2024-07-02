import React from 'react'
import { Box, Heading, Text } from '@chakra-ui/react'
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import { Stack, HStack, VStack } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'


export default function Header({isEditing,onEdit}) {
  return (
    <Box as='section' background='#F0ECF7'
    w='100%' height='240px' pt='80px'>
      <HStack spacing='40px'>
        <Avatar size="xl" ml = '15%'></Avatar>
        <Box style={{textAlign: "left"}}>
          <Heading fontWeight='500' fontSize='30px' color='#000000'>
            First Name Last Name
          </Heading>
          <Text fontWeight='400' fontSize='20px' color='#000000'>
            Joined (Date)
          </Text>
        </Box>
        {!isEditing &&  <Button  ml = '20%' colorScheme='teal' size='md' onClick={onEdit}>Edit</Button>}
      </HStack>

    </Box>
  )
}
