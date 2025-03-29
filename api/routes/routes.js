import express  from "express";
import {getAlunos, addAluno} from "../controller/controller.js";

const router = express.Router();

router.get("/", getAlunos);
router.post("/", addAluno);

export default router;