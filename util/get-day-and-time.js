const getDayAndTime = () => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const date = new Date();

  let getDay = date.getDay();
  let currentDay = days[getDay];

  let hour = date.getHours();

  return [currentDay, hour];
};

export default getDayAndTime;
