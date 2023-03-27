export const getDaysInMonth = (year, month) => {
  return new Date(year, month, 0).getDate();
};

export const limitForTheDay = () => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const end = new Date();
  end.setHours(23, 59, 59, 999);

  return { start, end };
};
