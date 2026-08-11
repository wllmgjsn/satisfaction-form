import { Router } from "express";
import { authorize, isAdmin } from "../utils/auths";
import { addFormResponse, getAllResponses } from "../services/responses";
import { NewFormResponse } from "../types";

const router = Router();

router.get("/", authorize, isAdmin, (_req, res) => {
  const responses = getAllResponses();
  return res.json(responses);
});

router.post("/", authorize, (req, res) => {
  const body: unknown = req.body;

  if (
    !body ||
    typeof body !== "object" ||
    !("username" in body) ||
    !("responses" in body) ||
    typeof body.username !== "string"
  ) {
    return res.sendStatus(400);
  }

  const newFormResponse: NewFormResponse = req.body;

  return res.json(addFormResponse(newFormResponse));
});

export default router;
