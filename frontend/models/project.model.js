import mongoose from "mongoose";

const projectSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        shortDes: {
            type: String,
            required: true
        },
        demoLink: {
            type: String,
            required: true
        },
        imagePath: {
            type: String,
            required: true
        }
    }
);

const Project = mongoose.models.Project || mongoose.model("Project", projectSchema);
export default Project