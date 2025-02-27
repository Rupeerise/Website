const isCurrentMonth = (startdate, enddate) => {
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  return (
    startdate.getFullYear() === startOfMonth.getFullYear() &&
    startdate.getMonth() === startOfMonth.getMonth() &&
    startdate.getDate() === startOfMonth.getDate() &&
    enddate.getFullYear() === endOfMonth.getFullYear() &&
    enddate.getMonth() === endOfMonth.getMonth() &&
    enddate.getDate() === endOfMonth.getDate()
  );
};

const isCurrentWeek = (startdate, enddate) => {
  const today = new Date();
  const startOfWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - today.getDay()
  );
  const endOfWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - today.getDay() + 6
  );

  return (
    startdate.getFullYear() === startOfWeek.getFullYear() &&
    startdate.getMonth() === startOfWeek.getMonth() &&
    startdate.getDate() === startOfWeek.getDate() &&
    enddate.getFullYear() === endOfWeek.getFullYear() &&
    enddate.getMonth() === endOfWeek.getMonth() &&
    enddate.getDate() === endOfWeek.getDate()
  );
};

const isLastMonth = (startdate, enddate) => {
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const endOfMonth = new Date(today.getFullYear(), today.getMonth(), 0);

  return (
    startdate.getFullYear() === startOfMonth.getFullYear() &&
    startdate.getMonth() === startOfMonth.getMonth() &&
    startdate.getDate() === startOfMonth.getDate() &&
    enddate.getFullYear() === endOfMonth.getFullYear() &&
    enddate.getMonth() === endOfMonth.getMonth() &&
    enddate.getDate() === endOfMonth.getDate()
  );
};

const isCurrentYear = (startdate, enddate) => {
  const today = new Date();
  const startOfYear = new Date(today.getFullYear(), 0, 1);
  const endOfYear = new Date(today.getFullYear(), 11, 31);

  return (
    startdate.getFullYear() === startOfYear.getFullYear() &&
    startdate.getMonth() === startOfYear.getMonth() &&
    startdate.getDate() === startOfYear.getDate() &&
    enddate.getFullYear() === endOfYear.getFullYear() &&
    enddate.getMonth() === endOfYear.getMonth() &&
    enddate.getDate() === endOfYear.getDate()
  );
};

export { isCurrentMonth, isCurrentWeek, isLastMonth, isCurrentYear };
