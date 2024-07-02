export const getStartOfMonth = () => {
  const today = new Date();
  return new Date(today.getFullYear(), today.getMonth(), 1);
};

export const getEndOfMonth = () => {
  const today = new Date();
  return new Date(today.getFullYear(), today.getMonth() + 1, 0);
};

export const getStartOfWeek = () => {
  const today = new Date();
  return new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - today.getDay()
  );
};

export const getEndOfWeek = () => {
  const today = new Date();
  // Assuming endOfWeek calculation is similar to startOfWeek with an adjustment
  return new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - today.getDay() + 6 // Adjust for the end of the week
  );
};
