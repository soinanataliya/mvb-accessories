import { memo } from "react";
import { useTheme } from "../../../themes/ThemeProvider/ThemeProvider";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <button
        style={{ backgroundColor: theme === "light" ? "red" : "blue" }}
        onClick={toggleTheme}
      >
        {theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
      </button>
    </div>
  );
};

export default memo(ThemeToggle);
