import { useState } from "react";
import {
  Button,
  Input,
  VStack,
  HStack,
  Text,
  Box,
  useToast,
  Icon,
} from "@chakra-ui/react";
import { FiLink, FiCopy } from "react-icons/fi";
import { generateInvite } from "../../api/batchApi";

const InviteLinkBox = ({ batchId }) => {
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleGenerate = async () => {
    try {
      setLoading(true);
      const { data } = await generateInvite(batchId);
      setLink(data.inviteLink);

      toast({
        title: "Invite link generated",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error generating link",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!link) return;

    await navigator.clipboard.writeText(link);

    toast({
      title: "Copied to clipboard",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Box>
      {/* Title */}
      <Text
        fontSize="xs"
        textTransform="uppercase"
        letterSpacing="wide"
        color="gray.400"
        mb={2}
      >
        Invite Link
      </Text>

      <Text fontSize="sm" color="gray.600" mb={4}>
        Generate and share this link with students to join the batch
      </Text>

      <VStack align="stretch" spacing={3}>
        {/* Generate Button */}
        <Button
          leftIcon={<Icon as={FiLink} />}
          onClick={handleGenerate}
          isLoading={loading}
          loadingText="Generating..."
          bg="blue.600"
          color="white"
          borderRadius="lg"
          fontSize="sm"
          _hover={{ bg: "blue.700" }}
          _active={{ bg: "blue.800" }}
        >
          Generate Invite Link
        </Button>

        {/* Link + Copy */}
        {link && (
          <HStack spacing={2}>
            <Input
              value={link}
              readOnly
              fontSize="sm"
              borderRadius="lg"
              bg="gray.50"
              border="1px solid"
              borderColor="gray.200"
              _focus={{ borderColor: "blue.400", bg: "white" }}
            />

            <Button
              onClick={handleCopy}
              borderRadius="lg"
              px={3}
              bg="gray.100"
              _hover={{ bg: "gray.200" }}
              _active={{ bg: "gray.300" }}
            >
              <Icon as={FiCopy} />
            </Button>
          </HStack>
        )}
      </VStack>
    </Box>
  );
};

export default InviteLinkBox;