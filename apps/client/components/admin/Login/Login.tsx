import { memo, FC, useState, SyntheticEvent } from "react";
import { loginRequest } from "../../../api/requests";
import styles from "./Login.module.css";

const Login: FC = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (event: SyntheticEvent) => {
    event.preventDefault();
    await loginRequest({ login, password });
  };

  const handleChangeLogin = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    setLogin(target.value);
  };

  const handleChangePassword = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    setPassword(target.value);
  };
  return (
    <form onSubmit={handleLogin} className={styles.form}>
      <h3>Log in</h3>
      <div className={styles.formBlock}>
        <label>Login:</label>
        <input value={login} onChange={handleChangeLogin}></input>
      </div>
      <div className={styles.formBlock}>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChangePassword}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};
export default memo(Login);