import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import { fetchFirstData } from "../MyAPI";

const Step1 = ({ data, handleDataChange }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    fetchFirstData().then(setOptions);
  }, []);

  const handleFirstSearchChange = (_, value) => {
    handleDataChange({
      ...data,
      0: { ...data[0], firstSearch: value }
    });
  };

  const handleSecondSearchChange = (_, value) => {
    handleDataChange({
      ...data,
      0: { ...data[0], secondSearch: value }
    });
  };

  return (
    <Stack spacing={4} sx={{ width: 300 }}>
      <Autocomplete
        freeSolo
        id="search1"
        disableClearable
        options={options.map((option) => option.label)}
        multiple
        limitTags={2}
        onChange={handleFirstSearchChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search 1"
            InputProps={{
              ...params.InputProps,
              type: "search"
            }}
          />
        )}
      />
      <Autocomplete
        freeSolo
        id="search2"
        disableClearable
        options={options.map((option) => option.label)}
        multiple
        limitTags={2}
        onChange={handleSecondSearchChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search 2"
            InputProps={{
              ...params.InputProps,
              type: "search"
            }}
          />
        )}
      />
    </Stack>
  );
};

export default Step1;
