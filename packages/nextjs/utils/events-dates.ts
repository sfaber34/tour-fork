// Helper functions for date operations
import { Event, ISODate } from "../events";

export const formatEventDate = (dateStart: ISODate, dateEnd?: ISODate): string => {
  // Parse dates in local timezone to avoid timezone shifts
  const [startYear, startMonth, startDay] = dateStart.split("-").map(Number);
  const startDate = new Date(startYear, startMonth - 1, startDay);

  const endDate = dateEnd
    ? (() => {
        const [endYear, endMonth, endDay] = dateEnd.split("-").map(Number);
        return new Date(endYear, endMonth - 1, endDay);
      })()
    : null;
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  if (!endDate || dateStart === dateEnd) {
    // Single day event
    return `${monthNames[startDate.getMonth()]} ${startDate.getDate()}`;
  }

  // Multi-day event
  if (startDate.getMonth() === endDate.getMonth()) {
    // Same month
    return `${monthNames[startDate.getMonth()]} ${startDate.getDate()} - ${endDate.getDate()}`;
  } else {
    // Different months
    return `${monthNames[startDate.getMonth()]} ${startDate.getDate()} - ${monthNames[endDate.getMonth()]} ${endDate.getDate()}`;
  }
};

export const getEventSortDate = (event: Event): Date => {
  // Use start date for sorting, parse in local timezone
  const [year, month, day] = event.dateStart.split("-").map(Number);
  return new Date(year, month - 1, day);
};

export const getEventEndDate = (event: Event): Date => {
  // Use end date if available, otherwise start date, parse in local timezone
  if (event.dateEnd) {
    const [year, month, day] = event.dateEnd.split("-").map(Number);
    return new Date(year, month - 1, day);
  } else {
    const [year, month, day] = event.dateStart.split("-").map(Number);
    return new Date(year, month - 1, day);
  }
};

export const shouldDisplayEvent = (event: Event): boolean => {
  // First check if the event has valid dates (dateEnd must be >= dateStart)
  if (event.dateEnd) {
    const [startYear, startMonth, startDay] = event.dateStart.split("-").map(Number);
    const [endYear, endMonth, endDay] = event.dateEnd.split("-").map(Number);
    const startDate = new Date(startYear, startMonth - 1, startDay);
    const endDate = new Date(endYear, endMonth - 1, endDay);

    // Don't display events where end date is before start date
    if (endDate < startDate) {
      return false;
    }
  }

  const eventEndDate = getEventEndDate(event);
  const currentDate = new Date();

  // Set current date to start of day for comparison
  currentDate.setHours(0, 0, 0, 0);

  // Calculate the cutoff date (2 days ago)
  const cutoffDate = new Date(currentDate);
  cutoffDate.setDate(currentDate.getDate() - 2);

  // Event should be displayed if its end date is after the cutoff
  return eventEndDate >= cutoffDate;
};
