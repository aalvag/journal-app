const getDayMonthYear = (dateString) => {
  const date = new Date(dateString);
  return {
    day: date.getDate(),
    month: date.toLocaleString("default", { month: "short" }),
    yearDay: `${date.getFullYear()}, ${date.toLocaleString("default", { weekday: "long" })}`,
  };
};

export default getDayMonthYear;
