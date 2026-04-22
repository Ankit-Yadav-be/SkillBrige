import { useParams, useNavigate } from "react-router-dom";
import { Button, Box, Heading } from "@chakra-ui/react";
import API from "../api/axios";
import useAuth from "../hooks/useAuth";
import { getDashboardRoute } from "../utils/roleRedirect";

const JoinBatch = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleJoin = async () => {
    try {
      await API.post("/batches/join", { token });

      alert("Joined Batch ✅");

      //  redirect logic
      if (!user) {
        navigate("/auth/login");
      } else {
        navigate(getDashboardRoute(user.role));
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to join batch");
    }
  };

  return (
    <Box textAlign="center" mt="100px">
      <Heading mb={4}>Join Batch</Heading>

      <Button colorScheme="blue" onClick={handleJoin}>
        Join Now
      </Button>
    </Box>
  );
};

export default JoinBatch;