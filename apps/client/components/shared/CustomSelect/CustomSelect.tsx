import { memo, useMemo } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { createTheme, ThemeProvider } from "@mui/material";
import { usePreferredColorScheme } from "../../../hooks/usePreferredColorScheme";

type Props = {
  name: string;
  label?: string;
  value: string[];
  options: Option[];
  onChange: (event: SelectChangeEvent<string[]>) => void;
};

type Option = {
  id: string;
  name: string;
};
const CustomSelect = ({
  name,
  label = "",
  value,
  options,
  onChange,
}: Props) => {
  const mode = usePreferredColorScheme();
  const theme = useMemo(() => createTheme({ palette: { mode } }), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <Select
        type="text"
        id={name}
        name={name}
        label={label}
        value={value}
        multiple
        onChange={onChange}
        sx={{
          minWidth: 200,
          height: 40,
          borderRadius: 8,
        }}
      >
        {options.map((option) => {
          return (
            <MenuItem key={option.id} value={option.name}>
              {option.name}
            </MenuItem>
          );
        })}
      </Select>
    </ThemeProvider>
  );
};
export default memo(CustomSelect);
