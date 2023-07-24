const isValidStringPattern = (time: string) => {
  // Regular expression pattern for "string:string:string"
  const pattern = /^(?:2[0-3]|[01]?[0-9]):[0-5]?[0-9]:[0-5]?[0-9]$/;
  return pattern.test(time);
};

export default isValidStringPattern;
