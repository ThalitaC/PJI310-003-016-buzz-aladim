import express  from "express";
import {getAlunos, addAluno, deleteAluno, updateAluno} from "../controller/controller.js";

const router = express.Router();

router.get("/", getAlunos);
router.post("/", addAluno);
router.delete("/:id", deleteAluno);
router.put("/:id", updateAluno);

export default router;