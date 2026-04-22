import mongoose from "mongoose";
import dotenv from "dotenv";
import Institution from "../models/institutionModel.js";

dotenv.config({ path: "../../.env" });

const seedInstitutions = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected for Seeding...");

    // Optional: clear old data
    await Institution.deleteMany();

    const institutions = [
      {
        name: "Tech Skill Institute",
        address: "Delhi, India",
        contactEmail: "tech@skill.com",
      },
      {
        name: "Future Builders Academy",
        address: "Noida, India",
        contactEmail: "future@academy.com",
      },
      {
        name: "NextGen Coders Hub",
        address: "Gurgaon, India",
        contactEmail: "nextgen@coders.com",
      },
    ];

    const inserted = await Institution.insertMany(institutions);

    console.log("Institutions Seeded Successfully ✅");
    console.log(inserted);

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedInstitutions();