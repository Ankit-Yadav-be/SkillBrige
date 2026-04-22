import { useEffect, useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import {
  Heading,
  Select,
  Box,
  Text,
  Flex,
  SimpleGrid,
} from "@chakra-ui/react";

import CreateBatchForm from "../../components/forms/CreateBatchForm";
import InviteLinkBox from "../../components/batch/InviteLinkBox";
import CreateSessionForm from "../../components/forms/CreateSessionForm";

//  SAME IMPORTS
import SessionList from "../../components/session/TrainerSessionList";
import SessionAttendance from "../../components/session/SessionAttendence";

import { getTrainerBatches } from "../../api/batchApi";

const TrainerDashboard = () => {
  const [batches, setBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedSession, setSelectedSession] = useState("");

  useEffect(() => {
    fetchBatches();
  }, []);

  const fetchBatches = async () => {
    try {
      const { data } = await getTrainerBatches();
      setBatches(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleBatchCreated = () => {
    fetchBatches();
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <Flex justify="space-between" align="center" mb={10} wrap="wrap" gap={4}>
        <Box>
          <Heading size="md" fontWeight="semibold" color="gray.800">
            Trainer Dashboard
          </Heading>

          <Text fontSize="sm" color="gray.500" mt={1}>
            Manage batches, sessions and invite students
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
            onChange={(e) => {
              setSelectedBatch(e.target.value);
              setSelectedSession(""); // reset
            }}
          >
            {batches.map((b) => (
              <option key={b._id} value={b._id}>
                {b.name}
              </option>
            ))}
          </Select>
        </Box>
      </Flex>

      {/* Create Batch */}
      <Box
        bg="white"
        p={5}
        borderRadius="xl"
        border="1px solid"
        borderColor="gray.200"
        mb={6}
      >
        <CreateBatchForm onBatchCreated={handleBatchCreated} />
      </Box>

      {/* Empty State */}
      {!selectedBatch && (
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
            No batch selected
          </Text>
          <Text fontSize="sm" color="gray.400" mt={1}>
            Select a batch to manage sessions & invites
          </Text>
        </Flex>
      )}

      {/* When batch selected */}
      {selectedBatch && (
        <>
          {/* Top Actions (UNCHANGED) */}
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            <Box
              bg="white"
              p={5}
              borderRadius="xl"
              border="1px solid"
              borderColor="gray.200"
            >
              <Text fontSize="sm" fontWeight="medium" mb={3} color="gray.700">
                Invite Students
              </Text>
              <InviteLinkBox batchId={selectedBatch} />
            </Box>

            <Box
              bg="white"
              p={5}
              borderRadius="xl"
              border="1px solid"
              borderColor="gray.200"
            >
              <Text fontSize="sm" fontWeight="medium" mb={3} color="gray.700">
                Create Session
              </Text>
              <CreateSessionForm batchId={selectedBatch} />
            </Box>
          </SimpleGrid>

          {/* 🔥 NEW PROFESSIONAL LAYOUT */}
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mt={6}>
            {/* LEFT PANEL → Sessions */}
            <Box
              bg="white"
              p={5}
              borderRadius="xl"
              border="1px solid"
              borderColor="gray.200"
              h="500px"
              overflowY="auto"
            >
              <Text fontSize="sm" fontWeight="medium" mb={3} color="gray.700">
                Sessions
              </Text>

              <SessionList
                batchId={selectedBatch}
                onSelectSession={setSelectedSession}
              />
            </Box>

            {/* RIGHT PANEL → Attendance */}
            <Box
              bg="white"
              p={5}
              borderRadius="xl"
              border="1px solid"
              borderColor="gray.200"
              h="500px"
              overflowY="auto"
            >
              <Text fontSize="sm" fontWeight="medium" mb={3} color="gray.700">
                Attendance
              </Text>

              {!selectedSession ? (
                <Flex
                  justify="center"
                  align="center"
                  h="100%"
                  direction="column"
                  color="gray.400"
                >
                  <Text>Select a session</Text>
                  <Text fontSize="sm">to view attendance</Text>
                </Flex>
              ) : (
                <SessionAttendance sessionId={selectedSession} />
              )}
            </Box>
          </SimpleGrid>
        </>
      )}
    </DashboardLayout>
  );
};

export default TrainerDashboard;