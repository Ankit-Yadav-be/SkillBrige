import crypto from "crypto";

const generateInviteToken = () => {
  return crypto.randomBytes(20).toString("hex");
};

export default generateInviteToken;