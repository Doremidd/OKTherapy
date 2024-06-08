import { Box, Flex, Text, Link, IconButton } from '@chakra-ui/react';
import { FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    return (
        <Box
            width="100%"
            bg="#F0ECF7"
            padding="30px 0"
            mt="30px"
        >
            <Flex
                maxWidth="1200px"
                margin="0 auto"
                padding="0 20px"
                justifyContent="space-between"
                alignItems="center"
            >
                <Text
                    textAlign="left"
                    fontFamily="'Red Hat Text'"
                    fontStyle="normal"
                    fontWeight="400"
                    fontSize="16px"
                    lineHeight="24px"
                    color="#000000"
                >
                    © 2024 OKTherapy. All rights reserved.
                </Text>
                <Flex>
                    <Link href="#" isExternal>
                        <IconButton
                            icon={<FaTwitter />}
                            aria-label="Twitter"
                            variant="ghost"
                            color="#000000"
                            _hover={{ bg: "#E2E8F0" }}
                            marginRight="4"
                        />
                    </Link>
                    <Link href="#" isExternal>
                        <IconButton
                            icon={<FaFacebook />}
                            aria-label="Facebook"
                            variant="ghost"
                            color="#000000"
                            _hover={{ bg: "#E2E8F0" }}
                            marginRight="4"
                        />
                    </Link>
                    <Link href="#" isExternal>
                        <IconButton
                            icon={<FaInstagram />}
                            aria-label="Instagram"
                            variant="ghost"
                            color="#000000"
                            _hover={{ bg: "#E2E8F0" }}
                        />
                    </Link>
                </Flex>
            </Flex>
        </Box>
    );
};

export default Footer;
