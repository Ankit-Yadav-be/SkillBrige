import { Box, Flex } from "@chakra-ui/react";
import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <Flex>
      <Sidebar />
      <Box flex="1">
        <Navbar />
        <Box p={4}>{children}</Box>
      </Box>
    </Flex>
  );
};

export default DashboardLayout;