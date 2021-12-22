import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import { updateFirstStep, updateSecondStep, updateThirdStep } from "../MyAPI";

const steps = [
  {
    key: "first",
    label: "",
    renderComponent: (props) => <Step1 {...props} />,
    handleStepChange: updateFirstStep
  },
  {
    key: "second",
    label: "",
    renderComponent: (props) => <Step2 {...props} />,
    handleStepChange: updateSecondStep
  },
  {
    key: "third",
    label: "",
    renderComponent: (props) => <Step3 {...props} />,
    handleStepChange: updateThirdStep
  }
];

export default function MyStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [data, handleDataChange] = useState({ 0: {}, 1: [], 2: {} });

  const handleNext = async () => {
    const updatedData = await steps[activeStep].handleStepChange(
      data[activeStep]
    );
    handleDataChange({ ...data, [activeStep]: updatedData });

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = async () => {
    const updatedData = await steps[activeStep].handleStepChange(
      data[activeStep]
    );
    handleDataChange({ ...data, [activeStep]: updatedData });

    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={activeStep}>
          {steps.map(({ key, label }) => (
            <Step key={key}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <React.Fragment>
          {steps[activeStep].renderComponent({ data, handleDataChange })}
        </React.Fragment>

        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                pt: 2
              }}
            >
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>

              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Box>
    </DndProvider>
  );
}
