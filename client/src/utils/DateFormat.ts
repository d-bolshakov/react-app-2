export const formatDateToMonthNameDayTime = (date: Date) => {
  const formatted = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(date);
  return formatted.replace(",", " at");
};

export const formatDateToWeekdayDateMonth = (date: Date) => {
  const formatted = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    day: "numeric",
    month: "long",
  }).format(date);
  return formatted;
};
