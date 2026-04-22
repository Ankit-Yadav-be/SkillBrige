import {
  Box,
  VStack,
  Button,
  Text,
  Flex,
  Icon,
  Divider,
  Avatar,
} from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import {
  FiHome,
  FiUser,
  FiLayers,
  FiCheckCircle,
} from "react-icons/fi";

const Sidebar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const menu = {
    student: [
      { name: "Dashboard", path: "/student/dashboard", icon: FiHome },
    ],
    trainer: [
      { name: "Dashboard", path: "/trainer/dashboard", icon: FiLayers },
    ],
    institution: [
      { name: "Dashboard", path: "/institution/dashboard", icon: FiUser },
    ],
    manager: [
      { name: "Dashboard", path: "/manager/dashboard", icon: FiLayers },
    ],
    monitor: [
      { name: "Dashboard", path: "/monitor/dashboard", icon: FiHome },
    ],
  };

  const roleGuide = {
    trainer: [
      "Create a batch",
      "Invite students",
      "Schedule sessions",
      "Track attendance",
    ],
    student: [
      "Join batch",
      "Attend sessions",
      "View attendance",
      "Track progress",
    ],
    institution: [
      "Manage trainers",
      "Monitor batches",
      "View reports",
      "Analyze performance",
    ],
    manager: [
      "Oversee operations",
      "Manage users",
      "Monitor analytics",
      "Approve batches",
    ],
    monitor: [
      "View system stats",
      "Audit data",
      "Track usage",
      "Generate reports",
    ],
  };

  return (
    <Flex
      direction="column"
      w="270px"
      minH="100vh"
      px={5}
      py={6}
      bg="linear-gradient(180deg, #0f172a, #020617)"
      color="gray.300"
      borderRight="1px solid rgba(255,255,255,0.08)"
    >
      {/* LOGO */}
      <Flex align="center" mb={8} gap={3}>
        <Box
          w="10px"
          h="10px"
          bg="blue.400"
          borderRadius="full"
          boxShadow="0 0 10px rgba(96,165,250,0.8)"
        />
        <Text
          fontSize="lg"
          fontWeight="bold"
          letterSpacing="wide"
          bgGradient="linear(to-r, blue.400, cyan.400)"
          bgClip="text"
        >
          SkillBridge
        </Text>
      </Flex>

      {/* NAVIGATION */}
      <Box mb={4}>
        <Text
          fontSize="10px"
          textTransform="uppercase"
          letterSpacing="wider"
          color="gray.500"
        >
          Navigation
        </Text>
      </Box>

      <VStack align="stretch" spacing={2}>
        {menu[user?.role]?.map((item, i) => {
          const isActive = location.pathname === item.path;

          return (
            <Button
              key={i}
              justifyContent="flex-start"
              leftIcon={
                <Icon
                  as={item.icon}
                  boxSize={4.5}
                  color={isActive ? "blue.300" : "gray.500"}
                />
              }
              variant="ghost"
              px={4}
              py={3}
              borderRadius="xl"
              fontSize="sm"
              fontWeight="medium"
              bg={
                isActive
                  ? "linear-gradient(135deg, rgba(59,130,246,0.2), rgba(6,182,212,0.15))"
                  : "transparent"
              }
              color={isActive ? "white" : "gray.400"}
              _hover={{
                bg: "whiteAlpha.200",
                color: "white",
                transform: "translateX(4px)",
              }}
              _active={{ transform: "scale(0.97)" }}
              transition="all 0.2s ease"
              onClick={() => navigate(item.path)}
            >
              {item.name}
            </Button>
          );
        })}
      </VStack>

      {/* DIVIDER */}
      <Divider my={6} borderColor="whiteAlpha.200" />

      {/* GUIDE */}
      <Box mb={2}>
        <Text
          fontSize="10px"
          textTransform="uppercase"
          letterSpacing="wider"
          color="gray.500"
        >
          Quick Guide
        </Text>
      </Box>

      <VStack align="stretch" spacing={2}>
        {roleGuide[user?.role]?.map((step, i) => (
          <Flex
            key={i}
            align="center"
            gap={2}
            fontSize="xs"
            color="gray.400"
            _hover={{ color: "gray.200" }}
          >
            <Icon as={FiCheckCircle} color="green.400" />
            <Text>{step}</Text>
          </Flex>
        ))}
      </VStack>

      {/*  STUDENT ATTENDANCE RULE */}
      {user?.role === "student" && (
        <Box
          mt={6}
          p={4}
          borderRadius="xl"
          bg="linear-gradient(135deg, rgba(25, 41, 67, 0.15), rgba(6,182,212,0.1))"
          
        >
          <Text
            fontSize="10px"
            textTransform="uppercase"
            letterSpacing="wider"
            color="blue.300"
            mb={2}
          >
            Attendance Rule
          </Text>

          <VStack align="stretch" spacing={2}>
            <Flex align="center" gap={2}>
              <Icon as={FiCheckCircle} color="green.400" />
              <Text fontSize="xs">
                Within 10 min → <b>Present</b>
              </Text>
            </Flex>

            <Flex align="center" gap={2}>
              <Icon as={FiCheckCircle} color="yellow.400" />
              <Text fontSize="xs">
                After 10 min → <b>Late</b>
              </Text>
            </Flex>

            <Flex align="center" gap={2}>
              <Icon as={FiCheckCircle} color="red.400" />
              <Text fontSize="xs">
                After session → <b>Absent</b>
              </Text>
            </Flex>
          </VStack>
        </Box>
      )}

      {/* PROFILE CARD */}
      <Box mt="auto" pt={8}>
        <Box
          px={4}
          py={4}
          borderRadius="2xl"
          bg="rgba(255,255,255,0.05)"
          backdropFilter="blur(10px)"
          border="1px solid rgba(255,255,255,0.1)"
          transition="0.2s"
          _hover={{
            borderColor: "blue.400",
            boxShadow: "0 0 20px rgba(59,130,246,0.2)",
          }}
        >
          <Flex align="center" gap={3} mb={2}>
            <Avatar size="sm" name={user?.name} bg="blue.500" />
            <Box>
              <Text fontSize="sm" fontWeight="semibold">
                {user?.name}
              </Text>
              <Text fontSize="xs" color="gray.500">
                {user?.role}
              </Text>
            </Box>
          </Flex>

          <Text fontSize="xs" color="gray.500">
            You're logged in and ready to go 
          </Text>
        </Box>
      </Box>
    </Flex>
  );
};

export default Sidebar;