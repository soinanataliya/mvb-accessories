import { memo, FC } from "react";
import { Login } from "../Login";
import { Button, Typography, Card, CardContent } from "@mui/material";

interface IProps {
  user: string | null;
  onLogin: (login: string) => void;
  onLogout: () => void;
}

const User: FC<IProps> = ({ user, onLogin, onLogout }) => {
  return (
    <Card variant="outlined" style={{ margin: "24px 0" }}>
      <CardContent>
        {!!user ? (
          <Typography
            variant="h5"
            marginBottom="12px"
          >{`Current user: ${user}`}</Typography>
        ) : (
          <Login onLogin={onLogin} />
        )}
        <div style={{ margin: "12px 0" }}>
          {!!user && (
            <Button color="primary" variant="contained" onClick={onLogout}>
              Log out
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
export default memo(User);
