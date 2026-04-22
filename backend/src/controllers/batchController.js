import Batch from "../models/batchModel.js";
import BatchTrainer from "../models/batchTrainerModel.js";
import BatchStudent from "../models/batchStudentModel.js";
import Invite from "../models/inviteModel.js";
import generateInviteToken from "../utils/inviteToken.js";


//  Create Batch
export const createBatch = async (req, res) => {
  try {
    const { name } = req.body;
    console.log(req.user.institutionId)

    //  validation
    if (!req.user.institutionId) {
      return res.status(400).json({
        message: "Trainer is not assigned to any institution",
      });
    }

    //  create batch using logged-in trainer's institution
    const batch = await Batch.create({
      name,
      institutionId: req.user.institutionId,
    });

    //  assign trainer automatically
    await BatchTrainer.create({
      batchId: batch._id,
      trainerId: req.user._id,
    });

    res.status(201).json(batch);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getTrainerBatches = async (req, res) => {
  try {
    const batches = await BatchTrainer.find({
      trainerId: req.user._id,
    }).populate("batchId");

    const result = batches.map((b) => b.batchId);

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Generate Invite Link
export const generateInvite = async (req, res) => {
  try {
    const { id } = req.params;

    const token = generateInviteToken();

    const invite = await Invite.create({
      batchId: id,
      token,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hr
      isReusable: true,
    });

    const inviteLink = `${process.env.FRONTEND_URL}/join/${token}`;

    res.json({ inviteLink });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 🎓 Join Batch via Invite
export const joinBatch = async (req, res) => {
  try {
    const { token } = req.body;

    const invite = await Invite.findOne({ token });

    if (!invite) {
      return res.status(400).json({ message: "Invalid invite" });
    }

    if (invite.expiresAt && invite.expiresAt < new Date()) {
      return res.status(400).json({ message: "Invite expired" });
    }

    // add student
    await BatchStudent.create({
      batchId: invite.batchId,
      studentId: req.user._id,
    });

    res.json({ message: "Joined batch successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getInstitutionBatches = async (req, res) => {
  try {
    const institutionId = req.user.institutionId;

    const batches = await Batch.find({ institutionId });

    res.json(batches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};