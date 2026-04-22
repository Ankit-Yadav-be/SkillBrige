import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Text,
  VStack,
  HStack,
  Badge,
  useToast,
} from "@chakra-ui/react";
import { getSessions } from "../../api/sessionApi";
import { markAttendance } from "../../api/attendenceApi";

const SessionList = () => {
  const [sessions, setSessions] = useState([]);
  const [timeNow, setTimeNow] = useState(new Date());
  const toast = useToast();

  useEffect(() => {
    fetchSessions();

    const interval = setInterval(fetchSessions, 30000);
    return () => clearInterval(interval);
  }, []);

  //  live clock for countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const fetchSessions = async () => {
    try {
      const { data } = await getSessions();
      setSessions(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleMark = async (sessionId) => {
    try {
      const res = await markAttendance({ sessionId });

      const status = res.data.status;

      toast({
        title: `Marked as ${status.toUpperCase()} ✅`,
        status:
          status === "present"
            ? "success"
            : status === "late"
            ? "warning"
            : "error",
        duration: 2000,
      });

      fetchSessions();
    } catch (err) {
      toast({
        title:
          err.response?.data?.message ||
          "Already marked or error",
        status: "error",
        duration: 2000,
      });
    }
  };

  //  countdown function
  const getCountdown = (date, startTime) => {
    const sessionDate = new Date(date);
    const [h, m] = startTime.split(":");

    const start = new Date(sessionDate);
    start.setHours(h, m);

    const diff = start - timeNow;

    if (diff <= 0) return null;

    const hrs = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    return `${hrs}h ${mins}m ${secs}s`;
  };

  return (
    <VStack spacing={4} mt={4}>
      {sessions.map((s) => {
        const now = new Date();

const sessionDate = new Date(s.date);

const [startH, startM] = s.startTime.split(":");
const [endH, endM] = s.endTime.split(":");

const start = new Date(sessionDate);
start.setHours(startH, startM);

const end = new Date(sessionDate);
end.setHours(endH, endM);

//  handle midnight crossing (VERY IMPORTANT)
if (end < start) {
  end.setDate(end.getDate() + 1);
}

let sessionStatus = "upcoming";

if (now >= start && now <= end) {
  sessionStatus = "live";
} else if (now > end) {
  sessionStatus = "completed";
}

        const countdown =
          sessionStatus === "upcoming"
            ? getCountdown(s.date, s.startTime)
            : null;

        return (
          <Box
            key={s._id}
            p={5}
            borderRadius="xl"
            bg="white"
            border="1px solid"
            borderColor="gray.200"
            boxShadow="sm"
            w="100%"
            transition="0.2s"
            _hover={{
              boxShadow: "md",
              transform: "translateY(-2px)",
            }}
          >
            {/* Header */}
            <HStack justify="space-between" mb={2}>
              <Text fontWeight="semibold" fontSize="md">
                {s.title}
              </Text>

              <HStack>
                <Badge
                  colorScheme={
                    sessionStatus === "live"
                      ? "green"
                      : sessionStatus === "completed"
                      ? "gray"
                      : "blue"
                  }
                >
                  {sessionStatus.toUpperCase()}
                </Badge>

                <Badge
                  colorScheme={
                    s.attendanceStatus === "present"
                      ? "green"
                      : s.attendanceStatus === "late"
                      ? "yellow"
                      : s.attendanceStatus === "absent"
                      ? "red"
                      : "gray"
                  }
                >
                  {s.attendanceStatus
                    ? s.attendanceStatus.toUpperCase()
                    : "NOT MARKED"}
                </Badge>
              </HStack>
            </HStack>

            {/* Date */}
            <Text fontSize="sm" color="gray.500">
              {new Date(s.date).toDateString()}
            </Text>

            {/* Time */}
            <Text fontSize="sm" color="gray.600">
              {s.startTime} - {s.endTime}
            </Text>

            {/*  Countdown */}
            {countdown && (
              <Text
                mt={2}
                fontSize="xs"
                color="blue.400"
                fontWeight="extrabold"
              >
                Starts in {countdown}
              </Text>
            )}

            {/* Trainer */}
            <Text fontSize="sm" color="gray.600" mt={1}>
              Trainer:{" "}
              <Text as="span" fontWeight="medium">
                {s.trainerId?.name || "N/A"}
              </Text>
            </Text>

            {/* Action */}
            <Button
              mt={3}
              size="sm"
              borderRadius="base"
              colorScheme="blue"
              onClick={() => handleMark(s._id)}
              isDisabled={
                sessionStatus !== "live" || s.attendanceStatus
              }
            >
              {s.attendanceStatus
                ? "Already Marked"
                : sessionStatus === "live"
                ? "Mark Attendance"
                : sessionStatus === "completed"
                ? "Session Ended"
                : "Not Started"}
            </Button>
          </Box>
        );
      })}
    </VStack>
  );
};

export default SessionList;