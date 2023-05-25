const  calculateAge = (date: string): string => {
    const currentDate = new Date();
    const [birthDay, birthMonth, birthYear] = date.split(':').map(Number);
  
    let ageYear = currentDate.getFullYear() - birthYear;
    let ageMonth = currentDate.getMonth() + 1 - birthMonth;
    let ageDay = currentDate.getDate() - birthDay;
  
    if (ageMonth < 0) {
      ageYear--;
      ageMonth += 12;
    }
  
    if (ageDay < 0) {
      const lastDayOfMonth = new Date(birthYear, birthMonth, 0).getDate();
      ageMonth--;
      ageDay += lastDayOfMonth;
    }
  
    return `You are ${ageYear} years, ${ageMonth} months, and ${ageDay} days old.`;
  }
  
  const inputDate: string = '17:02:1985';
  const age: string = calculateAge(inputDate);
  
  console.log(age);
  