import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import { Typography } from "@mui/material";

export default function ColorToggleButton() {
  const [alignment, setAlignment] = React.useState("web");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup
      sx={{ mt: 2, width: 1 }}
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
    >
      <ToggleButton sx={{ width: 1 }} value="student">
        <SchoolRoundedIcon />
        <Typography sx={{ ml: 1 }}> Student</Typography>
      </ToggleButton>
      <ToggleButton sx={{ width: 1 }} value="employer">
        <WorkRoundedIcon />
        <Typography sx={{ ml: 1 }}> Employer</Typography>
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
