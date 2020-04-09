export const configValidator = (config) => {
  if (typeof config !== "object") {
    return false;
  }
  return true;
}