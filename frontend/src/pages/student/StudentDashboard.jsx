import DashboardLayout from "../../layout/DashboardLayout";
import {
  Box,
  Heading,
  Text,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Icon,
} from "@chakra-ui/react";
import { FiCalendar, FiCheckCircle, FiClock } from "react-icons/fi";
import SessionList from "../../components/session/SessionList";
import useAuth from "../../hooks/useAuth";

const StudentDashboard = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      {/* HEADER */}
      <Box mb={8}>
        <Text
          fontSize="xs"
          textTransform="uppercase"
          letterSpacing="wide"
          color="gray.400"
          mb={1}
        >
          Student Panel
        </Text>

        <Heading
          size="md"
          fontWeight="semibold"
          color="gray.800"
        >
          Welcome back, {user?.name} 👋
        </Heading>

        <Text fontSize="sm" color="gray.500" mt={1}>
          Track your sessions and attendance easily
        </Text>
      </Box>


      {/* SESSION SECTION */}
      <Box
        bg="white"
        p={5}
        borderRadius="2xl"
        border="1px solid"
        borderColor="gray.200"
        boxShadow="sm"
      >
        <Flex justify="space-between" align="center" mb={4}>
          <Heading size="sm" color="gray.700">
            Your Sessions
          </Heading>

          <Text fontSize="xs" color="gray.400">
            Updated in real-time
          </Text>
        </Flex>

        <SessionList />
      </Box>
    </DashboardLayout>
  );
};

export default StudentDashboard;