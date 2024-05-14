// check date to display date, weekday, "today" or "tomorrow" //////////////////////////////
export default function formatDate(date) {
  const eventDate = new Date(date);
  const today = new Date();

  if (eventDate.toDateString() === today.toDateString()) {
    return "Today";
  }

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const oneWeekFromNow = new Date(today);
  oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);

  if (eventDate < today) {
    return eventDate.toLocaleDateString("en-US");
  } else if (eventDate < tomorrow) {
    return "Tomorrow";
  } else if (eventDate > oneWeekFromNow) {
    return eventDate.toLocaleDateString("en-US");
  } else {
    return eventDate.toLocaleDateString("en-US", { weekday: "long" });
  }
}
