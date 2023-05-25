const  sumOfMultiplesInRange = (range: number, multiplier: number): number => {
    const isDivisibleBy = (divisor: number) => (num: number): boolean => num % divisor === 0;
    const isDivisibleByThreeAndFive = (num: number): boolean => isDivisibleBy(3)(num) && isDivisibleBy(5)(num);

    const sum = Array.from({ length: range }, (_, index) => index + 1)
      .filter(isDivisibleByThreeAndFive)
      .reduce((acc, num) => acc + num, 0);
    return sum * multiplier;
  }
  
  const result = sumOfMultiplesInRange(100, 2);
  console.log(result);
  