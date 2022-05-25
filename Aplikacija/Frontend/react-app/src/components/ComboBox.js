import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function ComboBox() {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={topcategories}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Category" />}
    />
  );
}

const topcategories = [
  { label: 'Web Development' },
  { label: 'Data Science' },
  { label: 'Artificial Intelligence' },
  { label: 'Machine Learning' },
  { label: 'Embedded systems' },
  { label: 'Distributed systems' },
  { label: 'Android development' },
  { label: 'Game development' },
];
