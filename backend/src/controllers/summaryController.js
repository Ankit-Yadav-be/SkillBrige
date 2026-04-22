import Batch from "../models/batchModel.js";
import Session from "../models/sessionModel.js";
import Attendance from "../models/attendenceModel.js";
import BatchStudent from "../models/batchStudentModel.js";

//  Batch Summary (Institution)
export const getBatchSummary = async (req, res) => {
  try {
    const { id } = req.params;

    const students = await BatchStudent.find({ batchId: id }).populate(
      "studentId",
      "name email",
    );

    const sessions = await Session.find({ batchId: id });
    const sessionIds = sessions.map((s) => s._id);

    const attendance = await Attendance.find({
      sessionId: { $in: sessionIds },
    });

    //  STUDENT-WISE DATA WITH REAL STATUS
    const studentStats = students.map((s) => {
      const records = attendance.filter(
        (a) => a.studentId.toString() === s.studentId._id.toString(),
      );

      const present = records.filter((r) => r.status === "present").length;
      const absent = records.filter((r) => r.status === "absent").length;
      const late = records.filter((r) => r.status === "late").length;

      const total = records.length;

      return {
        studentId: s.studentId._id,
        name: s.studentId.name,
        email: s.studentId.email,

        total,
        present,
        absent,
        late,

        percentage: total === 0 ? 0 : ((present / total) * 100).toFixed(1),
      };
    });

    const totalAttendance = attendance.length;

    //  overall stats (correct)
    const presentCount = attendance.filter(
      (a) => a.status === "present",
    ).length;
    const absentCount = attendance.filter((a) => a.status === "absent").length;
    const lateCount = attendance.filter((a) => a.status === "late").length;

    const percentage =
      totalAttendance === 0 ? 0 : (presentCount / totalAttendance) * 100;

    res.json({
      totalStudents: students.length,
      totalSessions: sessions.length,
      totalAttendance,

      //  overall stats
      presentCount,
      absentCount,
      lateCount,

      attendancePercentage: percentage.toFixed(2),

      //  student-wise stats (REAL)
      studentStats,

      //  OPTIONAL (best practice)
      rawAttendance: attendance,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Institution Summary (Manager)
export const getInstitutionSummary = async (req, res) => {
  try {
    const { id } = req.params;

    const batches = await Batch.find({ institutionId: id });

    let totalStudents = 0;
    let totalSessions = 0;
    let totalAttendance = 0;

    let presentCount = 0;
    let absentCount = 0;
    let lateCount = 0;

    //  NEW: batch-wise breakdown
    const batchStats = [];

    for (let batch of batches) {
      const students = await BatchStudent.countDocuments({
        batchId: batch._id,
      });

      const sessions = await Session.find({ batchId: batch._id });

      const sessionIds = sessions.map((s) => s._id);

      const attendance = await Attendance.find({
        sessionId: { $in: sessionIds },
      });

      const present = attendance.filter(a => a.status === "present").length;
      const absent = attendance.filter(a => a.status === "absent").length;
      const late = attendance.filter(a => a.status === "late").length;

      const batchTotalAttendance = attendance.length;

      totalStudents += students;
      totalSessions += sessions.length;
      totalAttendance += batchTotalAttendance;

      presentCount += present;
      absentCount += absent;
      lateCount += late;

      //  push batch level stats
      batchStats.push({
        batchId: batch._id,
        batchName: batch.name,
        students,
        sessions: sessions.length,
        attendance: batchTotalAttendance,
        present,
        absent,
        late,
        percentage:
          batchTotalAttendance === 0
            ? 0
            : ((present / batchTotalAttendance) * 100).toFixed(1),
      });
    }

    const percentage =
      totalAttendance === 0
        ? 0
        : (presentCount / totalAttendance) * 100;

    res.json({
      totalBatches: batches.length,
      totalStudents,
      totalSessions,
      totalAttendance,

      presentCount,
      absentCount,
      lateCount,

      attendancePercentage: percentage.toFixed(2),

      //  NEW DATA
      batchStats,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//  Programme Summary (Manager + Monitor)
export const getProgrammeSummary = async (req, res) => {
  try {
    const batches = await Batch.find();

    let totalStudents = 0;
    let totalSessions = 0;
    let totalAttendance = 0;
    let presentCount = 0;

    for (let batch of batches) {
      const students = await BatchStudent.countDocuments({
        batchId: batch._id,
      });

      const sessions = await Session.find({ batchId: batch._id });

      const sessionIds = sessions.map((s) => s._id);

      const attendance = await Attendance.find({
        sessionId: { $in: sessionIds },
      });

      totalStudents += students;
      totalSessions += sessions.length;
      totalAttendance += attendance.length;
      presentCount += attendance.filter((a) => a.status === "present").length;
    }

    const percentage =
      totalAttendance === 0 ? 0 : (presentCount / totalAttendance) * 100;

    res.json({
      totalBatches: batches.length,
      totalStudents,
      totalSessions,
      totalAttendance,
      presentCount,
      attendancePercentage: percentage.toFixed(2),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
