import { Box, Grid, Text } from '@chakra-ui/react';
import FeatureStep from './FeatureStep'; // Adjust the import path as needed

const Features = () => {
    return (
        <Box
            width="100%"
            bg="#F7F7F7"
            padding="50px 0"
            position="relative"
        >
            <Box
                maxWidth="1200px"
                margin="0 auto"
                padding="0 20px"
                position="relative"
            >
                <Text
                    position="relative"
                    width="693px"
                    height="57px"
                    margin="0 auto"
                    marginTop="50px"
                    fontStyle="normal"
                    fontWeight="500"
                    fontSize="36px"
                    lineHeight="48px"
                    color="#000000"
                    textAlign="center"
                >
                    How OkTherapy Works
                </Text>
                <Grid
                    templateColumns="repeat(2, 1fr)"
                    gap="20px"
                    marginTop="50px"
                    justifyItems="center"
                    alignItems="center"
                >
                    <FeatureStep
                        number="1"
                        title="Take Our Questionnaire"
                        description="Our carefully crafted questionnaire will help us understand your unique needs, preferences, and therapy goals. It takes just a few minutes to complete and provides us with valuable insights to match you with the right therapist."
                    />
                    <FeatureStep
                        number="2"
                        title="Get Your Matches"
                        description="Based on your responses, we'll present you with a list of therapists who are best suited to meet your needs. Each therapist profile includes detailed information about their specialties, experience, and approach to therapy."
                    />
                    <FeatureStep
                        number="3"
                        title="Connect with Therapists"
                        description="Review your matches and choose the therapists you’re interested in. You can message them directly through our platform to ask questions, discuss your needs, and arrange an initial consultation."
                    />
                    <FeatureStep
                        number="4"
                        title="Start Your Therapy Journey"
                        description="Once you’ve found the right therapist, you can begin your sessions and start working towards your mental health goals. Our platform is designed to make the process seamless and supportive, ensuring you have the best possible experience."
                    />
                </Grid>
            </Box>
        </Box>
    );
};

export default Features;
