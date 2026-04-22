import {
  Flex,
  Text,
  Button,
  Avatar,
  Box,
  HStack,
  Icon,
  Badge,
} from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <Flex
      justify="space-between"
      align="center"
      px={{ base: 4, md: 8 }}
      py={3}
      position="sticky"
      top="0"
      zIndex="100"
      bg="rgba(255, 255, 255, 0.75)"
      backdropFilter="blur(14px)"
      borderBottom="1px solid"
      borderColor="gray.100"
    >
      {/*  Logo Section */}
      <HStack spacing={3}>
        <Box
          w="12px"
          h="12px"
          bgGradient="linear(to-r, blue.500, purple.500)"
          borderRadius="full"
          boxShadow="0 0 10px rgba(66,153,225,0.6)"
        />

        <Text
          fontSize="lg"
          fontWeight="bold"
          letterSpacing="tight"
          bgGradient="linear(to-r, blue.600, purple.600)"
          bgClip="text"
        >
          SkillBridge
        </Text>
      </HStack>

      {/*  Right Section */}
      <HStack spacing={4}>
        
        {/* 👤 User Info Card */}
        <HStack
          spacing={3}
          px={3}
          py={2}
          borderRadius="xl"
          bg="white"
          border="1px solid"
          borderColor="gray.100"
          boxShadow="sm"
          _hover={{
            boxShadow: "md",
            transform: "translateY(-1px)",
          }}
          transition="all 0.2s ease"
        >
          <Avatar
            size="sm"
            name={user?.name}
            bgGradient="linear(to-br, blue.400, purple.500)"
            color="white"
            fontWeight="bold"
          />

          <Box lineHeight="1.1">
            <Text
              fontSize="sm"
              fontWeight="semibold"
              color="gray.700"
            >
              {user?.name}
            </Text>

            <HStack spacing={1}>
              <Badge
                fontSize="9px"
                px={2}
                py="2px"
                borderRadius="full"
                colorScheme="purple"
                textTransform="capitalize"
              >
                {user?.role}
              </Badge>
            </HStack>
          </Box>
        </HStack>

        {/*  Logout Button */}
        <Button
          size="sm"
          leftIcon={<Icon as={FiLogOut} boxSize={4} />}
          bgGradient="linear(to-r, pink.500, pink.500)"
          color="white"
          borderRadius="base"
          px={5}
          fontWeight="medium"
          letterSpacing="0.3px"
          _hover={{
            bgGradient: "linear(to-r, red.600, pink.600)",
            transform: "translateY(-2px)",
            boxShadow: "0 10px 20px rgba(244, 63, 94, 0.3)",
          }}
          _active={{
            transform: "scale(0.96)",
          }}
          transition="all 0.25s ease"
          onClick={logout}
        >
          Logout
        </Button>
      </HStack>
    </Flex>
  );
};

export default Navbar;