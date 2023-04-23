import { memo, FC } from "react";
import { loginRequest } from "../../../api/requests";

const Login: FC = () => {
  const login = () => {
    loginRequest({ login: "admin", password: "admin" });
  };

  return (
    <div style={{ display: "flex" }}>
      <button onClick={login}>Login</button>
    </div>
  );
};
export default memo(Login);
