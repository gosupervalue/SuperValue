import express from "express";
import { contactPostController } from "../controllers/queryController.js";

const queryRoute = express.Router();
queryRoute.post("/contact", contactPostController);

export default queryRoute;