import { useEffect, useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import { Heading, Flex } from "@chakra-ui/react";
import SummaryCard from "../../components/common/SummaryCard";
import { getProgrammeSummary } from "../../api/summaryApi";

const MonitorDashboard = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    try {
      const res = await getProgrammeSummary();
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <DashboardLayout>
      <Heading mb={6}>Monitoring Dashboard</Heading>

      <Flex gap={4} wrap="wrap">
        <SummaryCard label="Batches" value={data.totalBatches} />
        <SummaryCard label="Students" value={data.totalStudents} />
        <SummaryCard label="Sessions" value={data.totalSessions} />
        <SummaryCard label="Attendance" value={data.totalAttendance} />
        <SummaryCard
          label="Attendance %"
          value={`${data.attendancePercentage || 0}%`}
        />
      </Flex>
    </DashboardLayout>
  );
};

export default MonitorDashboard;