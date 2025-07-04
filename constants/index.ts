
export const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

export const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);
export const YEARS = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);