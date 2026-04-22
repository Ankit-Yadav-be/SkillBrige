import { useEffect, useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import {
  Heading,
  Flex,
  Select,
  Box,
  Text,
  SimpleGrid,
  Badge,
  Icon,
} from "@chakra-ui/react";
import {
  FiUsers,
  FiCalendar,
  FiBarChart,
  FiCheckCircle,
} from "react-icons/fi";

import SummaryCard from "../../components/common/SummaryCard";

import { getInstitutionSummary } from "../../api/summaryApi";
import { getInstitutions } from "../../api/institutionApi";

const ManagerDashboard = () => {
  const [data, setData] = useState({});
  const [institutions, setInstitutions] = useState([]);
  const [selectedInstitution, setSelectedInstitution] = useState("");

  useEffect(() => {
    fetchInstitutions();
  }, []);

  const fetchInstitutions = async () => {
    try {
      const { data } = await getInstitutions();
      setInstitutions(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (selectedInstitution) {
      fetchSummary(selectedInstitution);
    }
  }, [selectedInstitution]);

  const fetchSummary = async (id) => {
    try {
      const res = await getInstitutionSummary(id);
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <DashboardLayout>
      {/* 🔥 HEADER */}
      <Flex justify="space-between" align="center" mb={8} wrap="wrap" gap={4}>
        <Box>
          <Text
            fontSize="xs"
            textTransform="uppercase"
            letterSpacing="wide"
            color="gray.400"
          >
            Analytics
          </Text>

          <Heading size="md" color="gray.800">
            Manager Dashboard
          </Heading>

          <Text fontSize="sm" color="gray.500" mt={1}>
            Track institution performance and attendance insights
          </Text>
        </Box>

        {/* Institution Selector */}
        <Box
          bg="white"
          px={4}
          py={2}
          borderRadius="xl"
          border="1px solid"
          borderColor="gray.200"
          minW="250px"
        >
          <Select
            placeholder="Select Institution"
            border="none"
            _focus={{ boxShadow: "none" }}
            onChange={(e) => setSelectedInstitution(e.target.value)}
          >
            {institutions.map((inst) => (
              <option key={inst._id} value={inst._id}>
                {inst.name}
              </option>
            ))}
          </Select>
        </Box>
      </Flex>

      {/* EMPTY STATE */}
      {!selectedInstitution && (
        <Flex
          justify="center"
          align="center"
          direction="column"
          py={20}
          bg="gray.50"
          borderRadius="2xl"
          border="1px dashed"
          borderColor="gray.200"
        >
          <Text fontSize="md" color="gray.500">
            No institution selected
          </Text>
          <Text fontSize="sm" color="gray.400">
            Select an institution to view analytics
          </Text>
        </Flex>
      )}

      {/* CONTENT */}
      {selectedInstitution && (
        <>
          {/* 🔥 SUMMARY CARDS */}
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 5 }} spacing={5} mb={6}>
            <SummaryCard
              label="Batches"
              value={data.totalBatches}
              icon={FiBarChart}
            />
            <SummaryCard
              label="Students"
              value={data.totalStudents}
              icon={FiUsers}
            />
            <SummaryCard
              label="Sessions"
              value={data.totalSessions}
              icon={FiCalendar}
            />
            <SummaryCard
              label="Attendance"
              value={data.totalAttendance}
              icon={FiCheckCircle}
            />
            <SummaryCard
              label="Attendance %"
              value={`${data.attendancePercentage || 0}%`}
              icon={FiBarChart}
              highlight
            />
          </SimpleGrid>

          {/* 🔥 STATUS CARDS (UPGRADED) */}
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} mb={8}>
            <Box bg="green.50" p={4} borderRadius="xl">
              <Text fontSize="xs" color="gray.600">Present</Text>
              <Text fontSize="lg" fontWeight="bold" color="green.600">
                {data.presentCount}
              </Text>
            </Box>

            <Box bg="red.50" p={4} borderRadius="xl">
              <Text fontSize="xs" color="gray.600">Absent</Text>
              <Text fontSize="lg" fontWeight="bold" color="red.500">
                {data.absentCount}
              </Text>
            </Box>

            <Box bg="yellow.50" p={4} borderRadius="xl">
              <Text fontSize="xs" color="gray.600">Late</Text>
              <Text fontSize="lg" fontWeight="bold" color="yellow.500">
                {data.lateCount}
              </Text>
            </Box>
          </SimpleGrid>

          {/* 🔥 BATCH PERFORMANCE */}
          <Box
            bg="white"
            p={6}
            borderRadius="2xl"
            border="1px solid"
            borderColor="gray.200"
            boxShadow="sm"
          >
            <Flex justify="space-between" align="center" mb={6}>
              <Heading size="sm" color="gray.700">
                Batch Performance
              </Heading>

              <Text fontSize="xs" color="gray.400">
                Performance overview
              </Text>
            </Flex>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
              {data.batchStats?.map((b) => (
                <Box
                  key={b.batchId}
                  p={5}
                  borderRadius="2xl"
                  border="1px solid"
                  borderColor="gray.200"
                  _hover={{
                    transform: "translateY(-4px)",
                    boxShadow: "lg",
                  }}
                  transition="0.25s"
                >
                  {/* TOP */}
                  <Flex justify="space-between" align="center" mb={3}>
                    <Box>
                      <Text fontWeight="semibold">{b.batchName}</Text>
                      <Text fontSize="xs" color="gray.500">
                        {b.students} students • {b.sessions} sessions
                      </Text>
                    </Box>

                    <Text
                      fontWeight="bold"
                      fontSize="lg"
                      color={
                        b.percentage > 75
                          ? "green.500"
                          : b.percentage > 40
                          ? "yellow.500"
                          : "red.500"
                      }
                    >
                      {b.percentage}%
                    </Text>
                  </Flex>

                  {/* PROGRESS BAR */}
                  <Box mb={4}>
                    <Box h="8px" bg="gray.100" borderRadius="full">
                      <Box
                        w={`${b.percentage}%`}
                        h="100%"
                        borderRadius="full"
                        bg={
                          b.percentage > 75
                            ? "green.400"
                            : b.percentage > 40
                            ? "yellow.400"
                            : "red.400"
                        }
                      />
                    </Box>
                  </Box>

                  {/* STATUS */}
                  <Flex gap={3} wrap="wrap">
                    <Badge colorScheme="green" borderRadius="full" px={3}>
                      ✔ {b.present}
                    </Badge>

                    <Badge colorScheme="red" borderRadius="full" px={3}>
                      ✖ {b.absent}
                    </Badge>

                    <Badge colorScheme="yellow" borderRadius="full" px={3}>
                      ⏱ {b.late}
                    </Badge>
                  </Flex>
                </Box>
              ))}
            </SimpleGrid>
          </Box>
        </>
      )}
    </DashboardLayout>
  );
};

export default ManagerDashboard;