export const modifiedLink: (str: string) => string = (str) => {
  const removePunctuation = str.replace(/[^\w\s]|_/g, "");
  return removePunctuation.split(" ").join("-").toLowerCase();
};
