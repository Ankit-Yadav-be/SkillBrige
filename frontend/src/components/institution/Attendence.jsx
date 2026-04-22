import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Badge,
  Progress,
  Text,
  Flex,
} from "@chakra-ui/react";

const StudentAttendanceTable = ({ data }) => {
  return (
    <TableContainer
      mt={6}
      bg="white"
      borderRadius="2xl"
      border="1px solid #e2e8f0"
      boxShadow="sm"
      overflowX="auto"
    >
      <Table size="sm">
        <Thead bg="gray.100">
          <Tr>
            <Th>#</Th>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Total</Th>
            <Th>Present</Th>
            <Th>Absent</Th>
            <Th>Late</Th>
            <Th minW="160px">Attendance</Th>
          </Tr>
        </Thead>

        <Tbody>
          {data?.map((s, index) => (
            <Tr
              key={s.studentId}
              _hover={{ bg: "gray.50" }}
              transition="0.2s"
            >
              {/* Index */}
              <Td fontSize="sm" color="gray.500">
                {index + 1}
              </Td>

              {/* Name */}
              <Td fontWeight="semibold" color="gray.700">
                {s.name}
              </Td>

              {/* Email */}
              <Td fontSize="sm" color="gray.500">
                {s.email}
              </Td>

              {/* Total */}
              <Td>{s.total}</Td>

              {/* Present */}
              <Td>
                <Badge colorScheme="green" px={2} borderRadius="md">
                  {s.present}
                </Badge>
              </Td>

              {/* Absent */}
              <Td>
                <Badge colorScheme="red" px={2} borderRadius="md">
                  {s.absent}
                </Badge>
              </Td>

              {/* Late */}
              <Td>
                <Badge colorScheme="yellow" px={2} borderRadius="md">
                  {s.late}
                </Badge>
              </Td>

              {/* Percentage */}
              <Td>
                <Flex direction="column" gap={1}>
                  <Text fontSize="xs" color="gray.500">
                    {s.percentage}%
                  </Text>

                  <Progress
                    value={s.percentage}
                    size="sm"
                    borderRadius="full"
                    colorScheme={
                      s.percentage > 75
                        ? "green"
                        : s.percentage > 40
                        ? "yellow"
                        : "red"
                    }
                  />
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default StudentAttendanceTable;