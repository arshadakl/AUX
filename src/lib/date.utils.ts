/**
 * Generates an array of academic years starting from the current year.
 *
 * @param n - The number of academic years to generate.
 * @param includeCurrentYear - A boolean indicating whether to include the current year in the result. Defaults to `true`.
 * @returns An array of strings representing the academic years in the format "YYYY-YY".
 */
export function nextNAcademicYears(n: number, includeCurrentYear = true): string[] {
  const currentYear = new Date().getFullYear() - +includeCurrentYear;
  return Array.from({ length: n }, (_, index) => currentYear + index).map(year => `${year}-${(year + 1) % 100}`);
}

export function toYYYYMMDD(date: Date | string) {
  return (date instanceof Date ? date.toISOString() : date).split('T')[0];
}

export function formatDate(dateString?: string | Date, expand = false, showYear = true): string {
  if (!dateString) {
    return '';
  }
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return '';
  }

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const monthName = expand ? monthNames[date.getMonth()] : monthNames[date.getMonth()].slice(0, 3);
  const year = date.getFullYear().toString().slice(-2);
  return showYear ? `${monthName} ${year}` : `${monthName}`;
}
