import formidable from "formidable";
import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import Project from "@/models/project.model.js";
import ExpressError from "@/utils/ExpressError.util.js";

// Helper to sanitize project title
function sanitizeTitle(title) {
  return title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, "");
}

export async function AddProjects(req) {
  try {
    // Ensure upload directory exists
    const uploadDir = path.join(process.cwd(), "assets/projects");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    // Create formidable form
    const form = formidable({
      uploadDir,
      keepExtensions: true,
      maxFileSize: 5 * 1024 * 1024, // 5MB
    });

    // Parse form data
    const { fields, files } = await form.parse(req);

    const { title, shortDes, description, demoLink } = fields;
    const imageFile = files.imageFile;

    if (!title || !shortDes || !description || !demoLink || !imageFile) {
      throw new ExpressError(400, "All fields are required");
    }

    // Rename uploaded image file
    const ext = path.extname(imageFile.newFilename || imageFile.originalFilename);
    const sanitizedTitle = sanitizeTitle(title);
    const newFileName = `${sanitizedTitle}${ext}`;
    const newPath = path.join(uploadDir, newFileName);
    fs.renameSync(imageFile.filepath, newPath);

    // Save project to MongoDB
    const project = new Project({
      title,
      shortDes,
      description,
      demoLink,
      imagePath: `/projects/${newFileName}`,
    });

    await project.save();

    return NextResponse.json({
      success: true,
      message: "Project added successfully",
      data: project,
    });
  } catch (err) {
    console.error(err);

    // Use ExpressError if thrown, otherwise 500
    const status = err instanceof ExpressError ? err.status : 500;
    const message = err.message || "Failed to add project";

    return NextResponse.json({
      success: false,
      message,
    }, { status });
  }
}


export function GetProjects() {}