import StudentAttendanceTable from "../../components/institution/Attendence";
import { useEffect, useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import {
  Heading,
  Flex,
  Select,
  Box,
  Text,
  SimpleGrid,
} from "@chakra-ui/react";
import { FiUsers, FiCalendar, FiCheckCircle, FiBarChart } from "react-icons/fi";

import SummaryCard from "../../components/common/SummaryCard";

import { getBatchSummary } from "../../api/summaryApi";
import { getInstitutionBatches } from "../../api/batchApi";

const InstitutionDashboard = () => {
  const [data, setData] = useState({});
  const [batches, setBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState("");

  useEffect(() => {
    fetchBatches();
  }, []);

  const fetchBatches = async () => {
    try {
      const { data } = await getInstitutionBatches();
      setBatches(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (selectedBatch) {
      fetchSummary(selectedBatch);
    }
  }, [selectedBatch]);

  const fetchSummary = async (id) => {
    try {
      const res = await getBatchSummary(id);
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <Flex
        justify="space-between"
        align="center"
        mb={10}
        wrap="wrap"
        gap={4}
      >
        <Box>
          <Text
            fontSize="xs"
            textTransform="uppercase"
            letterSpacing="wide"
            color="gray.400"
            mb={1}
          >
            Overview
          </Text>

          <Heading size="md" fontWeight="semibold" color="gray.800">
            Institution Dashboard
          </Heading>

          <Text fontSize="sm" color="gray.500" mt={1}>
            Track attendance insights and batch performance
          </Text>
        </Box>

        {/* Batch Selector */}
        <Box
          bg="white"
          px={4}
          py={2.5}
          borderRadius="xl"
          border="1px solid"
          borderColor="gray.200"
          minW="240px"
        >
          <Select
            placeholder="Select Batch"
            border="none"
            fontSize="sm"
            _focus={{ boxShadow: "none" }}
            onChange={(e) => setSelectedBatch(e.target.value)}
          >
            {batches.map((b) => (
              <option key={b._id} value={b._id}>
                {b.name}
              </option>
            ))}
          </Select>
        </Box>
      </Flex>

      {/* Empty State */}
      {!selectedBatch && (
        <Flex
          justify="center"
          align="center"
          direction="column"
          py={24}
          bg="gray.50"
          borderRadius="2xl"
          border="1px dashed"
          borderColor="gray.200"
        >
          <Text>No batch selected</Text>
        </Flex>
      )}

      {/* Summary Cards */}
      {selectedBatch && (
        <>
          <SimpleGrid
            columns={{ base: 1, sm: 2, md: 3, lg: 5 }}
            spacing={5}
          >
            <SummaryCard label="Students" value={data.totalStudents} icon={FiUsers} />
            <SummaryCard label="Sessions" value={data.totalSessions} icon={FiCalendar} />
            <SummaryCard label="Attendance" value={data.totalAttendance} icon={FiBarChart} />
            <SummaryCard label="Present" value={data.presentCount} icon={FiCheckCircle} />
            <SummaryCard
              label="Attendance %"
              value={`${data.attendancePercentage || 0}%`}
              icon={FiBarChart}
              highlight
            />
          </SimpleGrid>

          {/* 🔥 NEW SECTION (IMPORTANT) */}
          {data.studentStats && (
            <Box mt={8}>
              <Text
                fontSize="sm"
                fontWeight="semibold"
                mb={3}
                color="gray.700"
              >
                Student Attendance Details
              </Text>

              <StudentAttendanceTable data={data.studentStats} />
            </Box>
          )}
        </>
      )}
    </DashboardLayout>
  );
};

export default InstitutionDashboard;