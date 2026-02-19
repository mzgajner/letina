function dateFromString(dayString: string, year: number) {
  return new Date(`${year}-${dayString}`)
}

function easterMonday(year: number) {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  const easterMonday = new Date(year, month - 1, day); // This gets us Easter
  easterMonday.setDate(easterMonday.getDate() + 1); // Then we add a day

  return easterMonday
}

export default function getHolidaysForYear(year: number) {
  return [
    dateFromString("01-01", year), // New Year's Day
    dateFromString("01-02", year), // New Year's Day (continued)
    dateFromString("02-08", year), // Prešeren Day (national cultural day)
    easterMonday(year),            // Easter Monday
    dateFromString("04-27", year), // Day of Uprising Against Occupation
    dateFromString("05-01", year), // Labour Day
    dateFromString("05-02", year), // Labour Day (continued)
    dateFromString("06-25", year), // Statehood Day
    dateFromString("08-15", year), // Assumption of Mary
    dateFromString("10-31", year), // Reformation Day
    dateFromString("11-01", year), // Day of Remembrance of the Dead
    dateFromString("12-25", year), // Christmas Day
    dateFromString("12-26", year), // Independence and Unity Day
  ]
}