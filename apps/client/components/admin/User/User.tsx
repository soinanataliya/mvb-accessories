import { memo, FC, useState } from "react";
import { logoutRequest } from "../../../api/requests";
import { Login } from "../Login";

const User: FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div>
      <Login />
      <button onClick={logoutRequest}>Log out</button>
    </div>
  );
};
export default memo(User);
