import { memo, FC } from "react";
import { Login } from "../Login";

interface IProps {
  user: string | null;
  onLogin: (login: string) => void;
  onLogout: () => void;
}

const User: FC<IProps> = ({ user, onLogin, onLogout }) => {
  return (
    <div>
      {!!user ? `Current user: ${user}` : <Login onLogin={onLogin} />}
      <div>
        <button onClick={onLogout}>Log out</button>
      </div>
    </div>
  );
};
export default memo(User);
