import { useState } from "react";
import {
  Box,
  Input,
  Button,
  VStack,
  FormControl,
  FormLabel,
  Text,
  useToast,
  HStack,
} from "@chakra-ui/react";
import { createSession } from "../../api/sessionApi";

const CreateSessionForm = ({ batchId }) => {
  const [form, setForm] = useState({
    title: "",
    date: "",
    startTime: "",
    endTime: "",
  });

  const toast = useToast();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (!batchId) {
        return toast({
          title: "Please select a batch first",
          status: "warning",
          duration: 2000,
          isClosable: true,
        });
      }

      await createSession({ ...form, batchId });

      toast({
        title: "Session Created Successfully 🎉",
        status: "success",
        duration: 2000,
        isClosable: true,
      });

      setForm({
        title: "",
        date: "",
        startTime: "",
        endTime: "",
      });
    } catch (error) {
      toast({
        title: error.response?.data?.message || "Error creating session",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      mt={6}
      p={5}
      borderRadius="xl"
      bg="white"
      border="1px solid"
      borderColor="gray.200"
      boxShadow="sm"
    >
      {/* Header */}
      <Text fontSize="sm" fontWeight="semibold" color="gray.700" mb={1}>
        Create New Session
      </Text>

      <Text fontSize="xs" color="gray.500" mb={4}>
        Schedule a session for your batch
      </Text>

      <VStack spacing={4}>
        {/* Title */}
        <FormControl>
          <FormLabel fontSize="sm">Title</FormLabel>
          <Input
            placeholder="Enter session title"
            name="title"
            value={form.title}
            onChange={handleChange}
            size="md"
            bg="gray.50"
            borderRadius="lg"
            _focus={{ bg: "white", borderColor: "blue.400" }}
          />
        </FormControl>

        {/* Date */}
        <FormControl>
          <FormLabel fontSize="sm">Date</FormLabel>
          <Input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            size="md"
            bg="gray.50"
            borderRadius="lg"
            _focus={{ bg: "white", borderColor: "blue.400" }}
          />
        </FormControl>

        {/* Time Row */}
        <HStack spacing={3} w="full">
          <FormControl>
            <FormLabel fontSize="sm">Start</FormLabel>
            <Input
              type="time"
              name="startTime"
              value={form.startTime}
              onChange={handleChange}
              size="md"
              bg="gray.50"
              borderRadius="lg"
              _focus={{ bg: "white", borderColor: "blue.400" }}
            />
          </FormControl>

          <FormControl>
            <FormLabel fontSize="sm">End</FormLabel>
            <Input
              type="time"
              name="endTime"
              value={form.endTime}
              onChange={handleChange}
              size="md"
              bg="gray.50"
              borderRadius="lg"
              _focus={{ bg: "white", borderColor: "blue.400" }}
            />
          </FormControl>
        </HStack>

        {/* Button */}
        <Button
          w="full"
          mt={2}
          colorScheme="blue"
          size="md"
          borderRadius="lg"
          fontWeight="semibold"
          _hover={{ transform: "translateY(-1px)", boxShadow: "md" }}
          _active={{ transform: "scale(0.98)" }}
          transition="all 0.2s"
          onClick={handleSubmit}
          isDisabled={!form.title || !form.date}
        >
          Create Session
        </Button>
      </VStack>
    </Box>
  );
};

export default CreateSessionForm;