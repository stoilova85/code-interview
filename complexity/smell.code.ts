function calc(a, b) {
    let result = 0;
    for (let i = 1; i <= a; i++) {
      if (divisible(i, 3) || divisible(i, 5)) {
        result += i;
      }
    }
    return result * b;
  }
  
  function divisible(num, divisor) {
    return num % divisor === 0;
  }
  
  const sum = calc(100, 2);
  console.log(sum);
  