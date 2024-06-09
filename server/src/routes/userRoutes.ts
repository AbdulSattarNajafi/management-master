import { Router } from "express";
import { getUsers, createUser, getUser } from "../controllers/userController";

const router = Router();

router.get("/", getUsers);
router.post("/", createUser);
router.get("/:cognitoId", getUser);

export default router;
