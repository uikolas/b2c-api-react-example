import {TFixtureData} from "src/shared/services/fixtures/types";

export const getTestDataPromise = (result: TFixtureData) => {
  return new Promise(resolve => {
    setTimeout(() => resolve(result), 2000); // it takes 2 seconds to make coffee
  });
};
