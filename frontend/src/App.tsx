import { useEffect, useState } from "react";
import "./App.css";
import { AuthenticatedUser, NewFormResponse, PotentialUser } from "./types";
import questions from "./questions";
import LoginForm from "./assets/components/LoginForm";
import QuestionBox from "./assets/components/QuestionBox";

function App() {
  const [authenticatedUser, setAuthenticatedUser] = useState<
    AuthenticatedUser | undefined
  >(undefined);

  const [actualQuestion, setActualQuestion] = useState<number>(0);

  const [responses, setResponses] = useState<string[]>(["", "", ""]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const sendFormResponse = async (
    formResponse: NewFormResponse,
  ): Promise<boolean> => {
    const token = authenticatedUser?.token;
    if (!token) throw new Error("Not authenticated!\n");

    const options: RequestInit = {
      method: "POST",
      headers: {
        Authorization: authenticatedUser.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formResponse),
    };

    const response = await fetch("/api/responses", options);

    if (!response.ok) return false;

    return true;
  };

  useEffect(() => {
    console.log(responses);
  }, [responses]);

  const handleSendFormResponse = async () => {
    setError("");
    const newFormResponse: NewFormResponse = {
      username: authenticatedUser!.username,
      responses: responses,
    };

    if (!(await sendFormResponse(newFormResponse))) {
      setError("An error has occured !");
    } else {
      setSuccess("Votre réponse a bien été enregistrée.\n");
      setTimeout(() => {
        clearState();
      }, 3000);
    }
  };

  const clearState = () => {
    setActualQuestion(0);
    setResponses(["", "", ""]);
    setError("");
    setSuccess("");
  };

  const login = async (credentials: PotentialUser): Promise<boolean> => {
    const response = await fetch("/api/auths/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) return false;
    const data = await response.json();
    setAuthenticatedUser(data);
    return true;
  };

  const logout = () => {
    setAuthenticatedUser(undefined);
  };

  const handleQuestionChange = (newQuestionIndex: number) => {
    if (newQuestionIndex >= 0 && newQuestionIndex < 3) {
      setActualQuestion(newQuestionIndex);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "darkcyan",
        width: "520px",
      }}
    >
      <h1>Survey App</h1>
      <QuestionBox
        question={questions[actualQuestion]}
        actualQuestion={actualQuestion}
        handleQuestionChange={handleQuestionChange}
        responses={responses}
        setResponses={setResponses}
        authenticatedUser={authenticatedUser}
        handleSendFormResponse={handleSendFormResponse}
        setError={setError}
      ></QuestionBox>
      <LoginForm
        authenticatedUser={authenticatedUser}
        login={login}
        logout={logout}
        setError={setError}
      ></LoginForm>
      {error && <p style={{ color: "darkred", fontWeight: "bold" }}>{error}</p>}
      {success && (
        <p style={{ color: "darkgreen", fontWeight: "bold" }}>{success}</p>
      )}
    </div>
  );
}

export default App;
