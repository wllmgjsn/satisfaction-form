import { ChangeEvent, SyntheticEvent, useState } from "react";
import { AuthenticatedUser, PotentialUser } from "../../../types";

interface LoginFormProps {
  authenticatedUser: AuthenticatedUser | undefined;
  login: (credentials: PotentialUser) => Promise<boolean>;
  logout: () => void;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

const LoginForm = ({
  authenticatedUser,
  login,
  logout,
  setError,
}: LoginFormProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    setError("");
    e.preventDefault();

    if (!(await login({ username, password }))) {
      setError("Erreur : nom d'utilisateur ou mot de passe incorrect");
    }
  };

  return (
    <div
      style={{
        margin: "1em",
      }}
    >
      {!authenticatedUser && (
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "1em",
            gap: "1em",
          }}
        >
          <input
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            required
            onChange={handleUsernameInputChange}
          ></input>
          <input
            id="password"
            type="passsword"
            placeholder="Password"
            value={password}
            required
            onChange={handlePasswordInputChange}
          ></input>
          <button onClick={handleSubmit}>Login</button>
        </form>
      )}

      {authenticatedUser && <button onClick={logout}>Logout</button>}
    </div>
  );
};

export default LoginForm;
