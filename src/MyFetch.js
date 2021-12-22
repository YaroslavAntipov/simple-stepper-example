import { FirstApiTestData } from "./Apis/ApiTestData";

export const fetch = (url, params = {}) =>
  new Promise((resolve, reject) => {
    switch (url) {
      case "firstFetch":
      case "secondFetch":
      case "thirdFetch":
        return resolve({
          json: () => new Promise((resolve) => resolve(FirstApiTestData))
        });
      case "updateFirstStep":
      case "updateSecondStep":
      case "updateThirdStep":
        return resolve({
          json: () => new Promise((resolve) => resolve(JSON.parse(params.body)))
        });
      default:
        return resolve(null);
    }
  });
