import {
  Box,
  Button,
  Input,
  VStack,
  Heading,
  Text,
  FormControl,
  FormLabel,
  useToast,
  Flex,
} from "@chakra-ui/react";
import { useState } from "react";
import { loginUser } from "../../api/authApi";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { getDashboardRoute } from "../../utils/roleRedirect";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const toast = useToast();
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const { data } = await loginUser(form);

      login(data);

      toast({
        title: "Login successful 🎉",
        status: "success",
        duration: 2000,
      });

      navigate(getDashboardRoute(data.user.role));
    } catch (error) {
      toast({
        title: error.response?.data?.message || "Login failed",
        status: "error",
        duration: 2000,
      });
    }
  };

  return (
    <Flex minH="100vh">
      
      {/* 🔥 LEFT SIDE (Design Section) */}
      <Flex
        flex="1"
        display={{ base: "none", md: "flex" }}
        align="center"
        justify="center"
        bgGradient="linear(to-br, blue.600, purple.600)"
        color="white"
        p={10}
      >
        <Box maxW="400px">
          <Heading size="lg" mb={4}>
            Welcome Back 👋
          </Heading>
          <Text fontSize="sm" opacity={0.9}>
            Manage your sessions, track attendance, and stay connected with your learning journey — all in one place.
          </Text>
        </Box>
      </Flex>

      {/* 🔥 RIGHT SIDE (Form Section) */}
      <Flex
        flex="1"
        align="center"
        justify="center"
        bg="gray.50"
        px={4}
      >
        <Box
          w="100%"
          maxW="360px"
          bg="white"
          p={6}
          borderRadius="2xl"
          boxShadow="lg"
        >
          <VStack spacing={5} align="stretch">
            
            {/* Header */}
            <Box textAlign="center">
              <Heading size="md" color="gray.700">
                Login
              </Heading>
              <Text fontSize="xs" color="gray.500">
                Continue to your dashboard
              </Text>
            </Box>

            {/* Email */}
            <FormControl>
              <FormLabel fontSize="xs" color="gray.500">
                Email
              </FormLabel>
              <Input
                placeholder="Enter email"
                name="email"
                onChange={handleChange}
                fontSize="sm"
                borderRadius="lg"
                bg="gray.50"
                border="1px solid"
                borderColor="gray.200"
                _focus={{
                  borderColor: "blue.400",
                  bg: "white",
                }}
              />
            </FormControl>

            {/* Password */}
            <FormControl>
              <FormLabel fontSize="xs" color="gray.500">
                Password
              </FormLabel>
              <Input
                placeholder="Enter password"
                type="password"
                name="password"
                onChange={handleChange}
                fontSize="sm"
                borderRadius="lg"
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
              mt={2}
              bg="blue.600"
              color="white"
              fontSize="sm"
              borderRadius="lg"
              _hover={{ bg: "blue.700" }}
              _active={{ bg: "blue.800" }}
              onClick={handleSubmit}
            >
              Login
            </Button>

            {/* Footer */}
            <Text fontSize="xs" color="gray.500" textAlign="center">
              Don’t have an account?{" "}
              <Text
                as="span"
                color="blue.500"
                cursor="pointer"
                fontWeight="medium"
              >
                <Link to="/auth/signup">Signup</Link>
              </Text>
            </Text>
          </VStack>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Login;