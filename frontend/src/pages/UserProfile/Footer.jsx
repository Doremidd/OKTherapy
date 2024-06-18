import React from 'react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Stack, HStack, VStack } from '@chakra-ui/react'
import { Box} from '@chakra-ui/react'

export default function Footer({onCancel,onSave}) {
  return (
	<div>
    <Box ml = '300px' mb = '50px' mt = '50px'>
    <HStack spacing = '40px'>
    <Button colorScheme='teal' variant='outline' onClick={onCancel}>Cancel</Button>
    <Button colorScheme='teal' onClick = {onSave}>Save</Button>  
    </HStack>
    </Box>
  </div>
  )
}
