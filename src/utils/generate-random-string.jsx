export const generateRandomString = (length) => {
  const lowercasecharacters = "abcdefghijklmnopqrstuvwxyz";
  const uppercasecharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  let characters = lowercasecharacters + uppercasecharacters + numbers.join("");

  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
};
