import { useEffect, useState } from "react";
import {
  Box,
  Text,
  VStack,
  Flex,
  Badge,
} from "@chakra-ui/react";

import { getSessionsForBatch } from "../../api/sessionApi";

const SessionList = ({ batchId, onSelectSession }) => {
  const [sessions, setSessions] = useState([]);
  const [active, setActive] = useState("");

  useEffect(() => {
    if (batchId) fetchSessions();
  }, [batchId]);

  const fetchSessions = async () => {
    try {
      const { data } = await getSessionsForBatch(batchId);
      setSessions(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = (id) => {
    setActive(id);
    onSelectSession(id);
  };

  //  REAL STATUS LOGIC (DATE + TIME)
  const getStatus = (date, startTime, endTime) => {
    const now = new Date();

    // combine date + time
    const start = new Date(`${date}T${startTime}`);
    const end = new Date(`${date}T${endTime}`);

    if (now < start) return "Upcoming";
    if (now >= start && now <= end) return "Live";
    return "Completed";
  };

  const getStatusColor = (status) => {
    if (status === "Completed") return "green";
    if (status === "Live") return "purple"; 
    return "blue";
  };

  return (
    <VStack spacing={3} align="stretch">
      {sessions.map((s) => {
        const status = getStatus(s.date, s.startTime, s.endTime);

        return (
          <Flex
            key={s._id}
            p={4}
            bg={active === s._id ? "blue.50" : "white"}
            borderRadius="xl"
            border="1px solid"
            borderColor={active === s._id ? "blue.400" : "gray.200"}
            cursor="pointer"
            transition="0.2s"
            align="center"
            justify="space-between"
            _hover={{
              bg: "blue.50",
              transform: "translateY(-2px)",
              boxShadow: "md",
            }}
            onClick={() => handleClick(s._id)}
          >
            {/* LEFT */}
            <Box>
              <Text fontWeight="semibold" fontSize="sm">
                {s.title}
              </Text>

              <Text fontSize="xs" color="gray.500" mt={1}>
                {s.date}
              </Text>

              <Text fontSize="xs" color="gray.400">
                {s.startTime} - {s.endTime}
              </Text>
            </Box>

            {/* RIGHT */}
            <Badge
              colorScheme={getStatusColor(status)}
              borderRadius="full"
              px={3}
              py={1}
              fontSize="0.7rem"
            >
              {status}
            </Badge>
          </Flex>
        );
      })}
    </VStack>
  );
};

export default SessionList;