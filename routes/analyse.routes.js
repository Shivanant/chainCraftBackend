import express from "express"
import { analyseContract } from "../controller/analyse.controller.js";

const router = express.Router();

router.post('/', analyseContract )

export default router;