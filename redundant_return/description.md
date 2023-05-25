<style>
r { color: Red }
o { color: Orange }
g { color: Green }
</style>

# Inconsistent type usage, Excessive mutability,Magic number/string

## 🔊 
<r>When a function is declared globally, its code, along with any associated data or variables, is allocated on the memory heap. This allows the function to be accessed and called from anywhere within the program. Global functions are typically defined outside of any specific block or scope, making them accessible throughout the entire program. Since functions declared globally reside in the memory heap, they have a longer lifetime compared to functions declared within a specific scope or block. They persist in memory throughout the execution of the program, making them available for repeated use across multiple scopes or modules. excessive use of global functions can lead to potential drawbacks. It can increase the risk of naming conflicts, where different functions or variables have the same name. Additionally, global functions can hinder code modularity and encapsulation, as they are not confined to specific scopes or modules.</r>

> <o>📝 The use of an arrow function (=>) is valid, but it's important to consider the context and convention of the codebase. If the rest of the codebase uses regular function declarations, it might be better to stick with that convention for consistency. </o>

## **What else you should notice**

🔴  The parameter name employees is plural, indicating that it represents multiple employees. However, within the function, the parameter is treated as a single employee. It would be better to use a singular name, such as employee, to accurately reflect the intention.
```js
function calculateTotalSalary(employees) { 
    ...

}
```

🔴  **Redundant return**: The return statement inside the if block and the subsequent return totalSalarySum; are redundant. Instead, you can simplify the code by directly returning the updated totalSalarySum without an explicit return statement.

```js
      return totalSalarySum; 
```

🔴 **Magic number**: The initial value of 0 provided as the second argument to reduce is a magic number. Consider using a named constant or providing a meaningful comment to indicate its purpose, such as initialSalarySum.

```js
    ...
     }
      return totalSalarySum; 
    }, 0); 
  }
  ```
  

## Before / After

<table>
<tr>
<th>Smell Code</th>
<th>Refactored Code</th>
</tr>
<tr>
<td>
  
```js

function calculateTotalSalary(employees) { 
    return employees.reduce((totalSalarySum, employee) => {
      if (employee?.info?.salary) {
        return totalSalarySum + employee.info.salary;
      }
      return totalSalarySum; 
    }, 0); 
  }
  
  const employees = [
    { name: 'John Doe', info: { details: { salary: 2500 } } },
    { name: 'Jane Smith', info: { details: { salary: 3000 } } },
    { name: 'Bob Johnson', info: { details: { salary: 3500 } } },
    { name: 'Alice Williams', info: { details: { salary: 4000 } } }
  ];
  
  const totalSum = calculateTotalSalary(employees);
  
  console.log('The total sum of salaries is: ' + totalSum);

```
  
</td>
<td>

```js
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

```

</td>
</tr>
</table>



## What is changed: 

```diff
- function calculateTotalSalary(employees) { 
+ const calculateTotalSalary = (employeeList) => {
    const totalSalarySum = employeeList.reduce((sum, employee) => {
-     if (employee?.info?.salary) {
-       return totalSalarySum + employee.info.salary;
-     }
-     return totalSalarySum; 
+      const { salary = 0 } = employee.info || {};
+      return sum + salary;
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
   

```

> 📝 Note!
> ### ℹ️ In the above diff:
> - The line `` `- function calculateTotalSalary(employees) {` `` indicates the removal of the function declaration with the old parameter name.
> - The line `` `+ const calculateTotalSalary = (employeeList) => {` `` indicates the addition of a new arrow function declaration with the updated parameter name.
> - The lines `` `- if (employee?.info?.salary) {, - return totalSalarySum + employee.info.salary;` ``, and  ``- return totalSalarySum;`` indicate the removal of the conditional statement for checking employee salary and the corresponding return statements.
> - The lines `` + const { salary = 0 } = employee.info || {};``  and ``+ return sum + salary;`` indicate the addition of a destructuring assignment to extract the salary property from employee.info with a default value of 0 and the return statement for adding the salary to the sum.


