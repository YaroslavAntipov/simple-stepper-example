import { fetch } from "./MyFetch";

export const fetchFirstData = () => {
  return fetch("firstFetch").then((response) => response.json());
};

export const fetchSecondData = () => {
  return fetch("secondFetch").then((response) => response.json());
};

export const fetchThirdData = () => {
  return fetch("thirdFetch").then((response) => response.json());
};

export const updateFirstStep = (data) => {
  return fetch("updateFirstStep", {
    method: "POST",
    body: JSON.stringify(data)
  }).then((response) => response.json());
};

export const updateSecondStep = (data) => {
  return fetch("updateSecondStep", {
    method: "POST",
    body: JSON.stringify(data)
  }).then((response) => response.json());
};

export const updateThirdStep = (data) => {
  return fetch("updateThirdStep", {
    method: "POST",
    body: JSON.stringify(data)
  }).then((response) => response.json());
};
