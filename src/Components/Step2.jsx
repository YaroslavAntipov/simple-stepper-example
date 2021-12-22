import React, { useState, useEffect } from "react";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from "@mui/icons-material/Delete";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { fetchSecondData } from "../MyAPI";

const Step2 = ({ data, handleDataChange }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    fetchSecondData().then((options) => {
      const pickedOptions = [
        ...(data[0].firstSearch || []),
        ...(data[0].secondSearch || [])
      ];

      setOptions(options);
      handleChange(
        options.filter(({ label }) => pickedOptions.includes(label))
      );
    });
  }, []);

  const handleChange = (newOptions) => {
    handleDataChange({
      ...data,
      1: newOptions
    });
  };

  const handleSelectChange = ({ target }) => {
    handleChange(target.value);
  };

  const handleDelete = (_, valueToDelete) => {
    handleChange(data[1].filter(({ value }) => value !== valueToDelete));
  };

  const handleSelectAll = () => {
    handleChange(options);
  };

  const handleDeselectAll = () => {
    handleChange([]);
  };

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel-content"
        id="panel-header"
      >
        <Typography>Sample Accordion</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Select
          multiple
          value={data[1]}
          onChange={handleSelectChange}
          input={<OutlinedInput label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map(({ label, value }) => (
                <Chip
                  key={value}
                  label={label}
                  deleteIcon={
                    <DeleteIcon
                      onMouseDown={(event) => event.stopPropagation()}
                    />
                  }
                  onDelete={(event) => handleDelete(event, value)}
                />
              ))}
            </Box>
          )}
        >
          {options.map(({ label, value }) => (
            <MenuItem key={label} value={{ label, value }}>
              <Checkbox
                checked={data[1].some(
                  ({ value: pickedValue }) => pickedValue === value
                )}
              />
              <Typography>{label}</Typography>
            </MenuItem>
          ))}
        </Select>

        <Button color="inherit" onClick={handleSelectAll} sx={{ mr: 1 }}>
          Select All
        </Button>
        <Button color="inherit" onClick={handleDeselectAll} sx={{ mr: 1 }}>
          Deselect All
        </Button>
      </AccordionDetails>
    </Accordion>
  );
};

export default Step2;
