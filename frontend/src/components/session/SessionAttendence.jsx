import { useEffect, useState } from "react";
import {
  Box,
  Text,
  Badge,
  SimpleGrid,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { getSessionAttendance } from "../../api/sessionApi";

const SessionAttendance = ({ sessionId }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (sessionId) fetchAttendance();
  }, [sessionId]);

  const fetchAttendance = async () => {
    try {
      const { data } = await getSessionAttendance(sessionId);
      setData(data);
    } catch (err) {
      console.log(err);
    }
  };

  //  stats
  const present = data.filter((d) => d.status === "present").length;
  const absent = data.filter((d) => d.status === "absent").length;
  const late = data.filter((d) => d.status === "late").length;
  const total = data.length;

  const getColor = (status) => {
    if (status === "present") return "green";
    if (status === "absent") return "red";
    if (status === "late") return "yellow";
  };

  //  format time
  const formatTime = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Box>
      {/* 🔥 STATS */}
      <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4} mb={5}>
        <Box bg="green.50" p={4} borderRadius="xl" border="1px solid #C6F6D5">
          <Text fontSize="xs" color="gray.600">Present</Text>
          <Text fontWeight="bold" fontSize="lg">{present}</Text>
        </Box>

        <Box bg="red.50" p={4} borderRadius="xl" border="1px solid #FED7D7">
          <Text fontSize="xs" color="gray.600">Absent</Text>
          <Text fontWeight="bold" fontSize="lg">{absent}</Text>
        </Box>

        <Box bg="yellow.50" p={4} borderRadius="xl" border="1px solid #FEFCBF">
          <Text fontSize="xs" color="gray.600">Late</Text>
          <Text fontWeight="bold" fontSize="lg">{late}</Text>
        </Box>

        <Box bg="blue.50" p={4} borderRadius="xl" border="1px solid #BEE3F8">
          <Text fontSize="xs" color="gray.600">Total</Text>
          <Text fontWeight="bold" fontSize="lg">{total}</Text>
        </Box>
      </SimpleGrid>

      {/* 🔥 TABLE */}
      <TableContainer
        border="1px solid"
        borderColor="gray.200"
        borderRadius="xl"
        overflow="hidden"
      >
        <Table variant="simple" size="sm">
          <Thead bg="gray.100">
            <Tr>
              <Th>#</Th>
              <Th>Student Name</Th>
              <Th>Status</Th>
              <Th>Marked At</Th>
            </Tr>
          </Thead>

          <Tbody>
            {data.map((a, index) => (
              <Tr
                key={a._id}
                _hover={{ bg: "gray.50" }}
                bg={index % 2 === 0 ? "white" : "gray.50"}
              >
                <Td>{index + 1}</Td>

                <Td fontWeight="medium">
                  {a.studentId?.name || "N/A"}
                </Td>

                <Td>
                  <Badge
                    colorScheme={getColor(a.status)}
                    borderRadius="full"
                    px={3}
                    py={1}
                    textTransform="capitalize"
                  >
                    {a.status}
                  </Badge>
                </Td>

                <Td color="gray.600">
                  {formatTime(a.createdAt)}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SessionAttendance;