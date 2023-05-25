function calculateTotalSalary(employees) { // The parameter name employees is plural, indicating that it represents multiple employees. However, within the function, the parameter is treated as a single employee. It would be better to use a singular name, such as employee, to accurately reflect the intention.
    return employees.reduce((totalSalarySum, employee) => {
      if (employee?.info?.salary) {
        return totalSalarySum + employee.info.salary;
      }
      return totalSalarySum; // Redundant return: The return statement inside the if block and the subsequent return totalSalarySum; are redundant. Instead, you can simplify the code by directly returning the updated totalSalarySum without an explicit return statement.
    }, 0); // Magic number: The initial value of 0 provided as the second argument to reduce is a magic number. Consider using a named constant or providing a meaningful comment to indicate its purpose, such as initialSalarySum.
  }
  
  const employees = [
    { name: 'John Doe', info: { details: { salary: 2500 } } },
    { name: 'Jane Smith', info: { details: { salary: 3000 } } },
    { name: 'Bob Johnson', info: { details: { salary: 3500 } } },
    { name: 'Alice Williams', info: { details: { salary: 4000 } } }
  ];
  
  const totalSum = calculateTotalSalary(employees);
  
  console.log('The total sum of salaries is: ' + totalSum);
  