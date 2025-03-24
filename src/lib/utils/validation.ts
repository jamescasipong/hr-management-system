export const isValidEmail = (email: string): boolean => {
const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
return regex.test(email);
};

export const isNotEmpty = (str: string): boolean => {
return str.trim().length > 0;
};
