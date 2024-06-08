import { Box, Text } from '@chakra-ui/react';

const FeatureStep = ({ number, title, description }) => {
    return (
        <Box
            width={{ base: "100%", md: "85%" }}
            padding="20px"
            bg="#D5CFE1"
            borderRadius="10px"
            position="relative"
        >
            <Box
                position="absolute"
                top="10px"
                left="10px"
                width="40px"
                height="40px"
                bg="white"
                borderRadius="50%"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontWeight="bold"
                fontSize="20px"
            >
                {number}
            </Box>
            <Text
                marginTop="40px"
                fontFamily="'Red Hat Display'"
                fontStyle="normal"
                fontWeight="600"
                fontSize="24px"
                lineHeight="32px"
                color="#000000"
            >
                {title}
            </Text>
            <Text
                marginTop="10px"
                fontFamily="'Red Hat Text'"
                fontStyle="normal"
                fontWeight="400"
                fontSize="18px"
                lineHeight="28px"
                color="#000000"
            >
                {description}
            </Text>
        </Box>
    );
};

export default FeatureStep;