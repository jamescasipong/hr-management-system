export const formatDate = (date: Date): string => {
return new Date(date).toLocaleDateString();
};

export const isWeekend = (date: Date): boolean => {
const day = new Date(date).getDay();
return day === 0 || day === 6; // Sunday or Saturday
};
