import { Stack, TextField } from "@mui/material";
import React from "react";

const BudgetComponent = () => {
  return (
    <Stack>
      <h3>Budget</h3>
      <TextField label="Budget Month" variant="outlined" />
      <TextField label="Amount" variant="outlined" />
    </Stack>
  );
};

export default BudgetComponent;
