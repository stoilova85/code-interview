function calculateAge(date: string): string {
  const currentDate = new Date();
  const currentYear: number = currentDate.getFullYear();
  const currentMonth: number = currentDate.getMonth() + 1;
  const currentDay: number = currentDate.getDate();

  const [day, month, year] = date.split(':');

  const ageYear: number = currentYear - year;
  const ageMonth: number = currentMonth - month;
  const ageDay: number = currentDay - day;

  if (ageMonth < 0) {
    ageYear -= 1;
    ageMonth += 12;
  }

  if (ageDay < 0) {
    ageMonth -= 1;
    ageDay += 30;
  }

  return 'You are ' + ageYear + ' years, ' + ageMonth + ' months, and ' + ageDay + ' days old.';
}

const inputDate = '23:05:1990';
const age = calculateAge(inputDate);

console.log(age);
