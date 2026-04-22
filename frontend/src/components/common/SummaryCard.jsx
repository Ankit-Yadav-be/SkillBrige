import { Box, Text } from "@chakra-ui/react";

const SummaryCard = ({ label, value }) => {
  return (
    <Box
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      textAlign="center"
      w="200px"
    >
      <Text fontSize="lg" fontWeight="bold">
        {value}
      </Text>
      <Text color="gray.500">{label}</Text>
    </Box>
  );
};

export default SummaryCard;