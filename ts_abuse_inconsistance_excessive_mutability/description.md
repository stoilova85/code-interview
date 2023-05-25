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

1. Inconsistent type usage : variables like ``currentMonth`` and ``currentDay`` are explicitly typed as numbers, while other similar variables are left with the default type. Consistent typing improves code clarity and reduces the chance of type-related bugs.

```js
  const currentMonth: number = currentDate.getMonth() + 1;
  const currentDay: number = currentDate.getDate();
```

2. **Magic string** : In the given code, the string ``':'`` is used as a separator within the ``date.split(':')`` function call. The magic string lacks clear context or explanation about its purpose. To improve the code you can define a named constant or variable to hold the separator string, providing it with a meaningful name that describes its purpose. By doing so, it enhances code readability, reduces the likelihood of errors, and allows for easier modification if the separator needs to change in the future.

```js
  const [day, month, year] = date.split(':');
```

3. **Inconsistent type usage** : the variables ``ageYear``, ``ageMonth``, and ``ageDay`` are used to represent the calculated age components (years, months, and days). However, their types are explicitly set to number, which suggests that they should hold numeric values. The inconsistency arises because other variables in the code, such as ``currentYear``, ``currentMonth``, and ``currentDay``, are also related to dates and represent the current year, month, and day, respectively. However, these variables are explicitly typed as number, while the age-related variables have their types explicitly set to number as well. To improve the code and resolve this inconsistency, it is recommended to use consistent typing for related concepts. In this case, you can remove the explicit type declarations for ageYear, ageMonth, and ageDay and allow TypeScript to infer their types based on the calculation. This would ensure that the types used across the codebase are consistent and accurately represent the nature of the data being stored or manipulated.

```js
  const ageYear: number = currentYear - year;
  const ageMonth: number = currentMonth - month;
  const ageDay: number = currentDay - day;
```

4. **Excessive Mutability** : variables like ``ageYear``, ``ageMonth``, and ``ageDay`` are reassigned values within the if statements. This mutability can make the code harder to understand and maintain. It's generally recommended to minimize mutability and prefer immutability when possible.


```js
  if (ageMonth < 0) {
        ageYear -= 1;
        ageMonth += 12;
  }

  if (ageDay < 0) {
        ageMonth -= 1;
        ageDay += 30; // Magic number and inaccurate assumption about month length
  }
    ...
```

5. Magic string: A magic string is a string literal used within the code without clear meaning or explanation. In the code, the string ':05:1990' is used as a separator within the date.split(':') function call. Magic strings make the code less maintainable because they lack clear context and can cause issues if the format of the date changes. It's better to use named constants or provide meaningful explanations for string literals.

```js
const inputDate = '23:05:1990';
```

<table>
<tr>
<th>Smell Code</th>
<th>Refactored Code</th>
</tr>
<tr>
<td>
  
```js

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

```
  
</td>
<td>

```js
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
  

const inputDate: string = '23:05:1990';
const age: string = calculateAge(inputDate);

console.log(age);

```

</td>
</tr>
</table>

## What is changed: 

```diff
- function calculateAge(date: string): string {
-   const currentDate = new Date();
-   const currentYear: number = currentDate.getFullYear();
-   const currentMonth: number = currentDate.getMonth() + 1;
-   const currentDay: number = currentDate.getDate();
-   const [day, month, year] = date.split(':');
+ const calculateAge = (date: string): string => {
+   const currentDate = new Date();
+   const [birthDay, birthMonth, birthYear] = date.split(':').map(Number);
-   const ageYear: number = currentYear - year;
-   const ageMonth: number = currentMonth - month;
-   const ageDay: number = currentDay - day;
+   let ageYear = currentDate.getFullYear() - birthYear;
+   let ageMonth = currentDate.getMonth() + 1 - birthMonth;
+   let ageDay = currentDate.getDate() - birthDay;
-   if (ageMonth < 0) {
-     ageYear -= 1;
-     ageMonth += 12;
+   if (ageMonth < 0) {
+     ageYear--;
+     ageMonth += 12;
    }
-   if (ageDay < 0) {
-     ageMonth -= 1;
-     ageDay += 30;
+   if (ageDay < 0) {
+     const lastDayOfMonth = new Date(birthYear, birthMonth, 0).getDate();
+     ageMonth--;
+     ageDay += lastDayOfMonth;
    }
-   return 'You are ' + ageYear + ' years, ' + ageMonth + ' months, and ' + ageDay + ' days old.';
+   return `You are ${ageYear} years, ${ageMonth} months, and ${ageDay} days old.`;
  }
  
- const inputDate = '23:05:1990';
- const age = calculateAge(inputDate);
+ const inputDate: string = '17:02:1985';
+ const age: string = calculateAge(inputDate);
- console.log(age);
+ console.log(age);

+ const inputDate: string = '23:05:1990';
+ const age: string = calculateAge(inputDate);

+ console.log(age);

```


> # 📝 Note!
> ### ℹ️ In the above diff:
> - The lines with a `` `-` `` prefix indicate the removal of code or lines from the original version.
> - The lines with a `` `+` ``> - prefix indicate the addition of new code or lines in the updated version.
> - The highlighted changes are as follows:
> ###  ℹ️ The **``calculateAge``** function has been converted into an arrow function.
> - The variable declarations for **``currentYear``**, **``currentMonth``**, **``currentDay``**, **``day``**, **``month``**, and **``year``** have been removed.
> - The **``date.split(':')``** has been changed to **``date.split(':').map(Number)``** to convert the resulting strings to numbers.
> - The variables **``ageYear``**, **``ageMonth``**, and **``ageDay``** are now declared without type annotations.
> - The template string syntax **(``${...}``)** is used instead of concatenation for constructing the return statement.
> - The **``inputDate``** declaration has been changed to use type annotations (**``: string``**).
The example date has been updated to **``'17:02:1985'``**.

The highlighted changes are as follows:


