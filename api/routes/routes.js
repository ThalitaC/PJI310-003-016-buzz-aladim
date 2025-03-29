import express  from "express";
import {getItens} from "../controller/controller.js";

const router = express.Router();

router.get("/", getItens);

export default router;