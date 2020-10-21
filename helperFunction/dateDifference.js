export const dateDifference = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const timeDiff = end.getTime() - start.getTime();
  const dayDiff = timeDiff / (1000 * 3600 * 24);

  return dayDiff;
};
