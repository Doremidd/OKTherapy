import { Box, Flex, Text, Button, Image } from '@chakra-ui/react';
import Hero from './Hero';
import Features from './Features';

const Landing = () => {
    return (
        <Box>
            <Hero />
            <Features />
        </Box>
    );
};

export default Landing;