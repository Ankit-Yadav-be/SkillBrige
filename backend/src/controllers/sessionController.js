import Session from "../models/sessionModel.js";
import BatchStudent from "../models/batchStudentModel.js";
import Attendance from "../models/attendenceModel.js";


//  Create Session (Trainer)
export const createSession = async (req, res) => {
  try {
    const { batchId, title, date, startTime, endTime } = req.body;

    console.log(req.body);

    const session = await Session.create({
      batchId,
      trainerId: req.user._id,
      title,
      date,
      startTime,
      endTime,
    });

    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//  Mark Attendance (Student)
export const markAttendance = async (req, res) => {
  try {
    const { sessionId } = req.body;

    //  Already marked check
    const existing = await Attendance.findOne({
      sessionId,
      studentId: req.user._id,
    });

    if (existing) {
      return res.status(400).json({ message: "Already marked" });
    }

    const session = await Session.findById(sessionId);

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    //  TIME LOGIC
    const now = new Date();
    const sessionDate = new Date(session.date);

    const [startH, startM] = session.startTime.split(":").map(Number);
    const [endH, endM] = session.endTime.split(":").map(Number);

    // start datetime
    const start = new Date(sessionDate);
    start.setHours(startH, startM, 0, 0);

    // end datetime
    const end = new Date(sessionDate);
    end.setHours(endH, endM, 0, 0);

    //  FIX: Cross-midnight handling
    if (end <= start) {
      end.setDate(end.getDate() + 1);
    }

    //  STATUS DECISION
    let status = "absent";

    if (now >= start && now <= end) {
      const diffMinutes = (now - start) / (1000 * 60);

      if (diffMinutes <= 10) {
        status = "present";   // within 10 minutes
      } else {
        status = "late";      // after 10 minutes
      }
    }

    //  Batch validation
    const isStudentInBatch = await BatchStudent.findOne({
      batchId: session.batchId,
      studentId: req.user._id,
    });

    if (!isStudentInBatch) {
      return res.status(403).json({ message: "Not part of batch" });
    }

    //  Create attendance
    const attendance = await Attendance.create({
      sessionId,
      studentId: req.user._id,
      status,
    });

    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//  Get Session Attendance (Trainer)
export const getSessionAttendance = async (req, res) => {
  try {
    const { id } = req.params;

    const attendance = await Attendance.find({ sessionId: id })
      .populate("studentId", "name email");

    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get Sessions (Student)
export const getSessions = async (req, res) => {
  try {
    const studentId = req.user._id;

    const studentBatches = await BatchStudent.find({
      studentId,
    });

    const batchIds = studentBatches.map((b) => b.batchId);

    const sessions = await Session.find({
      batchId: { $in: batchIds },
    })
      .populate("trainerId", "name")
      .sort({ date: -1 });

    const now = new Date();

    //  get all attendance of this student
    const attendances = await Attendance.find({
      studentId,
    });

    // convert to map for fast lookup
    const attendanceMap = {};
    attendances.forEach((a) => {
      attendanceMap[a.sessionId.toString()] = a.status;
    });

    const updatedSessions = sessions.map((s) => {
      const sessionDate = new Date(s.date);

      const [startHour, startMin] = s.startTime.split(":");
      const [endHour, endMin] = s.endTime.split(":");

      const startDateTime = new Date(sessionDate);
      startDateTime.setHours(startHour, startMin);

      const endDateTime = new Date(sessionDate);
      endDateTime.setHours(endHour, endMin);

      const isActive =
        now >= startDateTime && now <= endDateTime;

      return {
        ...s._doc,
        isActive,
        attendanceStatus:
          attendanceMap[s._id.toString()] || null,
      };
    });

    res.json(updatedSessions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getSessionsByBatch = async (req, res) => {
  try {
    const { batchId } = req.params;

    const sessions = await Session.find({ batchId })
      .sort({ date: -1 });

    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};