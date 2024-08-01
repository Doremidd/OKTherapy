import { Button } from "@chakra-ui/react";
import { HStack } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";

// eslint-disable-next-line react/prop-types
export default function Footer({ onCancel, onSave }) {
  return (
    <div>
      <Box display="flex" justifyContent={["center", null, "start"]} ml={[null, null, "20%"]} mb="50px" mt="50px">
        <HStack spacing="40px">
          <Button colorScheme="teal" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button colorScheme="teal" onClick={onSave}>
            Save
          </Button>
        </HStack>
      </Box>
    </div>
  );
}
