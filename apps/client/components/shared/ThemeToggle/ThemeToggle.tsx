import { memo } from "react";

const ThemeToggle = () => {
  const changeTheme = () => {
    if (document.body.classList.contains("light-theme")) {
      document.body.classList.remove("light-theme");
      document.body.classList.add("dark-theme");
      return;
    }
    document.body.classList.remove("dark-theme");
    document.body.classList.add("light-theme");
  };

  return (
    <div>
      <button onClick={changeTheme}>Switch theme</button>
    </div>
  );
};

export default memo(ThemeToggle);
