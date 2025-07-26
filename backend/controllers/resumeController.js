import Resume from "../models/resumeModel.js";
import fs from "fs";
import path from "path";

export const createResume = async (req, res) => {
  console.log("in create")
  try {
    const { title } = req.body;
    const defaultResumeData = {
      thumbnailLink: "",
      template: {
        theme: "default",
        colorPalette: ["#000000", "#ffffff"],
      },
      profileInfo: {
        profilePreviewUrl: "",
        fullName: "",
        designation: "",
        summary: "",
      },
      contactInfo: {
        email: "",
        phone: "",
        loacation: "",
        website: "",
        linkedin: "",
        github: "",
      },
      workExperience: [
        {
          company: "",
          role: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
      education: [
        {
          degree: "",
          institution: "",
          startDate: "",
          endDate: "",
        },
      ],
      skills: [
        {
          name: "",
          progress: 0,
        },
      ],
      projects: [
        {
          title: "",
          description: "",
          github: "",
          liveDemo: "",
        },
      ],
      certifications: [
        {
          title: "",
          issuer: "",
          year: "",
        },
      ],
      languages: [
        {
          name: "",
          progress: 0,
        },
      ],
      interests: [],
    };
    const newResume = await Resume.create({
      userId: req.user._id,
      title: title || "Untitled Resume",
      ...defaultResumeData,
      ...req.body,
    });
    res.status(201).json({ newResume });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating resume", error: error.message });
  }
};

export const getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });
    res.json({ resumes });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching resumes", error: error.message });
  }
};

export const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      userId: req.user._id,
      _id: req.params.id,
    });
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }
    res.json({ resume });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching resume", error: error.message });
  }
};

export const updateResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!resume) {
      return res
        .status(404)
        .json({
          message: "Resume not found or you do not have permission to edit it",
        });
    }
    Object.assign(resume, req.body);
    const updatedResume = await resume.save();
    res.json({ updatedResume });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating resume", error: error.message });
  }
};

export const deleteResume = async (req, res) => {
  // console.log("in d1111eleteResume");
  try {
    // console.log("in deleteResume");
    const resume = await Resume.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });
    // console.log("resume",resume);
    
    if (!resume) {
      return res
        .status(404)
        .json({
          message:
            "Resume not found or you do not have permission to delete it",
        });
    }

    // Optionally delete the thumbnail file if it exists
    if (resume.thumbnailLink) {
      const thumbnailPath = path.join(
        process.cwd(),
        "uploads",
        resume.thumbnailLink
      );
      if (fs.existsSync(thumbnailPath)) {
        fs.unlinkSync(thumbnailPath);
      }
    }
    if (resume.profileInfo?.profilePreviewUrl) {
      const oldProfile = path.join(
        uploadsFolder,
        path.basename(resume.profileInfo.profilePreviewUrl)
      );
      if (fs.existsSync(oldProfile)) {
        fs.unlinkSync(oldProfile);
      }
    }



    res.json({ message: "Resume deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting resume", error: error.message });
  }
};
