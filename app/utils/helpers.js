export const formatDate = (date) => {
  const year = date.slice(0, 4);
  const month = date.slice(5, 7).replace(/^0+/, "");
  const day = date.slice(8, 10);
  const hour = date.slice(11, 13);
  const minutes = date.slice(14, 16);

  let monthName = "";

  switch (month) {
    case "1":
      monthName = "January";
      break;
    case "2":
      monthName = "February";
      break;
    case "3":
      monthName = "March";
      break;
    case "4":
      monthName = "April";
      break;
    case "5":
      monthName = "May";
      break;
    case "6":
      monthName = "June";
      break;
    case "7":
      monthName = "July";
      break;
    case "8":
      monthName = "August";
      break;
    case "9":
      monthName = "September";
      break;
    case "10":
      monthName = "October";
      break;
    case "11":
      monthName = "November";
      break;
    case "12":
      monthName = "December";
      break;
  }

  let shortenedMonth = monthName.slice(0, 3);

  return `${day} ${shortenedMonth} ${year} ${hour}:${minutes}`;
};
