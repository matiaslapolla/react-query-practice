import { generateRandomString } from "./generate-random-string";

export const generateUUID = () => {
  return `${generateRandomString(8)}-${generateRandomString(
    4
  )}-${generateRandomString(4)}-${generateRandomString(
    4
  )}-${generateRandomString(12)}`;
};
