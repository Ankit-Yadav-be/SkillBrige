import {
  Box,
  Button,
  Input,
  VStack,
  Heading,
  Select,
  Text,
  FormControl,
  FormLabel,
  useToast,
  Flex,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { signupUser } from "../../api/authApi";
import { getInstitutions } from "../../api/institutionApi";
import useAuth from "../../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { getDashboardRoute } from "../../utils/roleRedirect";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
    institutionId: "",
  });

  const [institutions, setInstitutions] = useState([]);
  const toast = useToast();

  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchInstitutions();
  }, []);

  const fetchInstitutions = async () => {
    try {
      const { data } = await getInstitutions();
      setInstitutions(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (
        ["trainer", "institution"].includes(form.role) &&
        !form.institutionId
      ) {
        return toast({
          title: "Select an institution",
          status: "warning",
          duration: 2000,
        });
      }

      const payload = ["trainer", "institution"].includes(form.role)
        ? form
        : { ...form, institutionId: undefined };

      const { data } = await signupUser(payload);

      login(data);

      toast({
        title: "Signup successful 🎉",
        status: "success",
        duration: 2000,
      });

      navigate(getDashboardRoute(data.user.role));
    } catch (error) {
      toast({
        title: error.response?.data?.message || "Signup failed",
        status: "error",
        duration: 2000,
      });
    }
  };

  return (
    <Flex minH="100vh">
      {/* LEFT SIDE (Design Section) */}
      <Flex
        flex={1}
        display={{ base: "none", md: "flex" }}
        direction="column"
        justify="center"
        align="center"
        bg="linear-gradient(135deg, #2563eb, #1e3a8a)"
        color="white"
        p={10}
      >
        <Heading size="lg" mb={4}>
          Welcome to Smart Attendance 
        </Heading>

        <Text fontSize="sm" opacity={0.9} textAlign="center" maxW="300px">
          Manage batches, sessions, and attendance with a modern
          dashboard experience built for institutions and trainers.
        </Text>

        <Box mt={10} textAlign="center">
          <Text fontSize="xs" opacity={0.7}>
            ✔ Track attendance in real-time
          </Text>
          <Text fontSize="xs" opacity={0.7}>
            ✔ Manage sessions easily
          </Text>
          <Text fontSize="xs" opacity={0.7}>
            ✔ Role-based dashboards
          </Text>
        </Box>
      </Flex>

      {/* RIGHT SIDE (Form Section) */}
      <Flex
        flex={1}
        align="center"
        justify="center"
        bg="gray.50"
        px={4}
      >
        <Box
          w="100%"
          maxW="380px"
          bg="white"
          p={6}
          borderRadius="2xl"
          boxShadow="lg"
          border="1px solid"
          borderColor="gray.100"
        >
          <VStack spacing={5} align="stretch">
            {/* Header */}
            <Box textAlign="center">
              <Heading size="md" color="gray.700">
                Create Account
              </Heading>
              <Text fontSize="xs" color="gray.500" mt={1}>
                Get started with your dashboard
              </Text>
            </Box>

            {/* Name */}
            <FormControl>
              <FormLabel fontSize="xs" color="gray.500">
                Full Name
              </FormLabel>
              <Input
                name="name"
                value={form.name}
                onChange={handleChange}
                fontSize="sm"
                borderRadius="lg"
                bg="gray.50"
              />
            </FormControl>

            {/* Email */}
            <FormControl>
              <FormLabel fontSize="xs" color="gray.500">
                Email
              </FormLabel>
              <Input
                name="email"
                value={form.email}
                onChange={handleChange}
                fontSize="sm"
                borderRadius="lg"
                bg="gray.50"
              />
            </FormControl>

            {/* Password */}
            <FormControl>
              <FormLabel fontSize="xs" color="gray.500">
                Password
              </FormLabel>
              <Input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                fontSize="sm"
                borderRadius="lg"
                bg="gray.50"
              />
            </FormControl>

            {/* Role */}
            <FormControl>
              <FormLabel fontSize="xs" color="gray.500">
                Role
              </FormLabel>
              <Select
                name="role"
                value={form.role}
                onChange={handleChange}
                fontSize="sm"
                borderRadius="lg"
                bg="gray.50"
              >
                <option value="student">Student</option>
                <option value="trainer">Trainer</option>
                <option value="institution">Institution</option>
                <option value="manager">Programme Manager</option>
                <option value="monitor">Monitoring Officer</option>
              </Select>
            </FormControl>

            {/* Institution */}
            {["trainer", "institution"].includes(form.role) && (
              <FormControl>
                <FormLabel fontSize="xs" color="gray.500">
                  Institution
                </FormLabel>
                <Select
                  name="institutionId"
                  value={form.institutionId}
                  onChange={handleChange}
                  fontSize="sm"
                  borderRadius="lg"
                  bg="gray.50"
                >
                  {institutions.map((inst) => (
                    <option key={inst._id} value={inst._id}>
                      {inst.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
            )}

            {/* Button */}
            <Button
              mt={2}
              bg="blue.600"
              color="white"
              fontSize="sm"
              borderRadius="lg"
              _hover={{ bg: "blue.700" }}
              onClick={handleSubmit}
            >
              Create Account
            </Button>

            {/* Footer */}
            <Text fontSize="xs" textAlign="center" color="gray.500">
              Already have an account?{" "}
              <Text as="span" color="blue.500">
                <Link to="/auth/login">Login</Link>
              </Text>
            </Text>
          </VStack>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Signup;