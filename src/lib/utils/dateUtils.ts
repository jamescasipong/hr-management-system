import { format, parse } from 'date-fns';

/**
 * Converts a high-precision time string (e.g., "10:45:56.7112780") to 12-hour format with AM/PM.
 * @param {string} timeString - Time string in "HH:mm:ss.SSSSSSS" format.
 * @returns {string} Formatted time in "hh:mm:ss a" format.
 */
export function formatToAmPm(timeString: string) {
  if (timeString.trim() == "") return '';

  // Remove fractional seconds (e.g., .7112780 -> just HH:mm:ss)
  const cleanTime = timeString.split('.')[0];

  // Use today's date for constructing a full date-time string
  const today = new Date();
  const datePart = today.toISOString().split('T')[0];
  const fullDateTimeStr = `${datePart} ${cleanTime}`;

  // Parse and format
  const parsedDate = parse(fullDateTimeStr, 'yyyy-MM-dd HH:mm:ss', new Date());
  return format(parsedDate, 'hh:mm:ss a');
}

export const getDayName = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long' };
    return new Date(date).toLocaleDateString('en-US', options);
}


export const formatDate = (date: Date): string => {
return new Date(date).toLocaleDateString();
};

export const isWeekend = (date: Date): boolean => {
const day = new Date(date).getDay();
return day === 0 || day === 6; // Sunday or Saturday
};
