export const getClasses = (...classes: string[]) => {
  return classes
    .filter((item) => item !== "")
    .join(" ")
    .trim();
};
