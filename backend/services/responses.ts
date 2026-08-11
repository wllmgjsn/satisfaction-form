import { FormResponse, NewFormResponse, User } from "../types";
import { serialize, parse } from "../utils/json";
import path from "node:path";
import { readOneUserFromUsername } from "./users";

const jsonDbPath = path.join(__dirname, "../data/responses.json");

const defaultResponse: FormResponse[] = [
  {
    id: 1,
    userId: 1,
    responses: ["THESE", "ARE", "TESTS"],
  },
];
 
function getAllResponses() {
  const responses = parse(jsonDbPath, defaultResponse);
  return responses;
}

function addFormResponse(
  newFormResponse: NewFormResponse,
): FormResponse | undefined {
  const responses = parse(jsonDbPath, defaultResponse) as FormResponse[];
  console.log(responses);
  const user: User | undefined = readOneUserFromUsername(
    newFormResponse.username,
  );

  if (!user) return undefined;

  const lastResponseId = responses[responses.length - 1].id;

  const formResponse: FormResponse = {
    id: lastResponseId + 1,
    userId: user.id,
    responses: newFormResponse.responses,
  };

  const updatedResponses: FormResponse[] = [...responses, formResponse];

  serialize(jsonDbPath, updatedResponses);

  return formResponse;
}

export { addFormResponse, getAllResponses };
