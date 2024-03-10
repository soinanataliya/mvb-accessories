import { FC, useState, SyntheticEvent, memo } from "react";
import { loginRequest } from "../../../api/requests";
import styles from "./Login.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  TextField,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

interface IProps {
  onLogin: (login: string) => void;
}

const Login: FC<IProps> = ({ onLogin }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const client = useQueryClient();

  const { mutate: logIn } = useMutation({
    mutationFn: loginRequest,
    onSuccess: (response: any) => {
      if (response?.user) {
        onLogin(response?.user);
        client.invalidateQueries({ queryKey: ["accessories"] });
      }
    },
  });

  const handleLogin = (event: SyntheticEvent) => {
    event.preventDefault();
    void logIn({ login, password });
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
    <Card variant="outlined" style={{ margin: '24px 0' }}>
      <CardContent>
        <form onSubmit={handleLogin}>
          <Typography variant="h5" marginBottom="12px">
            Log in
          </Typography>
          <div className={styles.formBlock}>
            <TextField
              label="Login"
              value={login}
              onChange={handleChangeLogin}
            />
          </div>
          <div className={styles.formBlock}>
            <TextField
              label="Password"
              type="password"
              name="password"
              value={password}
              onChange={handleChangePassword}
            />
          </div>
          <div className={styles.formBlock}>
            <Button color="primary" variant="contained" type="submit">
              Login
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
export default memo(Login);
