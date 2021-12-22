import React, { useState, useCallback } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import update from "immutability-helper";

import Dustbin from "./DragAndDrop/Dustbin";

const Step3 = () => {
  const [dustbins, setDustbins] = useState([
    { lastDroppedItem: null },
    { lastDroppedItem: null }
  ]);
  const [droppedBoxNames, setDroppedBoxNames] = useState([]);

  const handleDrop = useCallback(
    (index, item) => {
      const { name } = item;
      setDroppedBoxNames(
        update(droppedBoxNames, name ? { $push: [name] } : { $push: [] })
      );
      setDustbins(
        update(dustbins, {
          [index]: {
            lastDroppedItem: {
              $set: item
            }
          }
        })
      );
    },
    [droppedBoxNames, dustbins]
  );

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
        <div style={{ overflow: "hidden", clear: "both" }}>
          {dustbins.map(({ lastDroppedItem }, index) => (
            <Dustbin
              lastDroppedItem={lastDroppedItem}
              onDrop={(item) => handleDrop(index, item)}
              key={index}
            />
          ))}
        </div>

        <Typography>Page 3</Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default Step3;
