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
} from "@chakra-ui/react";
import { createBatch } from "../../api/batchApi";

const CreateBatchForm = ({ onBatchCreated }) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async () => {
    if (!name.trim()) {
      return toast({
        title: "Batch name is required",
        status: "warning",
        duration: 2000,
      });
    }

    try {
      setLoading(true);

      const res = await createBatch({ name });

      toast({
        title: "Batch created successfully ✅",
        status: "success",
        duration: 2000,
      });
      
      onBatchCreated && onBatchCreated();
      console.log(res.data);
      setName("");
    } catch (err) {
      toast({
        title: err.response?.data?.message || "Error creating batch",
        status: "error",
        duration: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      p={5}
      borderRadius="xl"
      bg="white"
      border="1px solid"
      borderColor="gray.200"
    >
    

      <Text fontSize="sm" color="gray.600" mb={4}>
        Create a new batch for students
      </Text>

      <VStack spacing={4} align="stretch">
        {/* Input */}
        <FormControl>
          <FormLabel fontSize="sm" color="gray.600">
            Batch Name
          </FormLabel>

          <Input
            placeholder="e.g. React Batch 2026"
            value={name}
            onChange={(e) => setName(e.target.value)}
            borderRadius="lg"
            fontSize="sm"
            bg="gray.50"
            border="1px solid"
            borderColor="gray.200"
            _focus={{
              borderColor: "blue.400",
              bg: "white",
            }}
          />
        </FormControl>

        {/* Button */}
        <Button
          onClick={handleSubmit}
          isLoading={loading}
          loadingText="Creating..."
          bg="blue.600"
          color="white"
          fontSize="sm"
          borderRadius="lg"
          _hover={{ bg: "blue.700" }}
          _active={{ bg: "blue.800" }}
          isDisabled={!name.trim()}
        >
          Create Batch
        </Button>
      </VStack>
    </Box>
  );
};

export default CreateBatchForm;