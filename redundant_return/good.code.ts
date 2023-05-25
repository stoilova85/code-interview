const calculateTotalSalary = (employeeList) => {
    const totalSalarySum = employeeList.reduce((sum, employee) => {
       // keep in mind `0` is not fine. It would be better to use the minimal salary for the region 
      const { salary = 0 } = employee.info || {};
      return sum + salary;
    }, 0);
  
    return totalSalarySum;
  }
  
  
  const employees = [
    { name: 'John Doe', info: { details: { salary: 2500 } } },
    { name: 'Jane Smith', info: { details: { salary: 3000 } } },
    { name: 'Bob Johnson', info: { details: { salary: 3500 } } },
    { name: 'Alice Williams', info: { details: { salary: 4000 } } }
  ];
  
  const totalSum = calculateTotalSalary(employees);
  
  console.log('The total sum of salaries is: ' + totalSum);
  

