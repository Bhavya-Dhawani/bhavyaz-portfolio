import wrapAsync from "@/utils/wrapAsync.util";
import {
    AddProjects,
    GetProjects
} from "@/controllers/project.controller";

export const POST = wrapAsync(AddProjects);
export const GET = wrapAsync(GetProjects);