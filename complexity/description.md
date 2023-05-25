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

* Poor Naming: The function names calc and divisible are not descriptive and fail to convey their purpose or intent. The parameter names a, b, num, and divisor lack clarity and do not provide clear context.

* High Complexity: The calc function performs a complex calculation involving iteration and checking divisibility within a loop. The code could benefit from breaking down the problem into smaller, more manageable functions and utilizing functional programming concepts.

* Tight Coupling: The calc function directly calls the divisible function, which tightly couples the two functions. This makes it harder to reuse or modify the code without affecting other parts of the program.

## Bug to find and fix
In the calc function's condition inside the loop we have a tricky logical operator. Instead of using the logical AND (&&) operator, it uses the logical OR (||) operator. This change makes it appear correct and functional at first glance, but it introduces a subtle bug.

The original intention is to calculate the sum of numbers that are divisible by both 3 and 5. However, with the modified condition, the result variable will include numbers that are divisible by either 3 or 5, resulting in an incorrect sum.

This tricky change in the logical operator subtly breaks the expected behavior of the code, leading to erroneous results. It emphasizes the importance of carefully reviewing code and considering the intended logic to identify hidden bugs or issues.

## Look at the explanation to have better understanding: 


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
  

```
  
</td>
<td>

```js
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

```

</td>
</tr>
</table>

## What is changed: 

```diff
- function calc(a, b) {
-   let result = 0;
-   for (let i = 1; i <= a; i++) {
-     if (divisible(i, 3) || divisible(i, 5)) {
-       result += i;
-     }
-   }
-   return result * b;
- }
+ const sumOfMultiplesInRange = (range: number, multiplier: number): number => {
+   const isDivisibleBy = (divisor: number) => (num: number): boolean => num % divisor === 0;
+   const isDivisibleByThreeAndFive = (num: number): boolean => isDivisibleBy(3)(num) && isDivisibleBy(5)(num);

+   const sum = Array.from({ length: range }, (_, index) => index + 1)
+     .filter(isDivisibleByThreeAndFive)
+     .reduce((acc, num) => acc + num, 0);
+   return sum * multiplier;
+ }

- function divisible(num, divisor) {
-   return num % divisor === 0;
- }

- const sum = calc(100, 2);
- console.log(sum);
+ const result = sumOfMultiplesInRange(100, 2);
+ console.log(result);

```

> # 📝 Note!
> ### ℹ️ In the above diff:
> - The lines with a `` `-` `` prefix indicate the removal of code or lines from the original version.
> - The lines with a `` `+` ``> - prefix indicate the addition of new code or lines in the updated version.
> - The highlighted changes are as follows:
> ### ℹ️ The **``calc``** function has been replaced with the sumOfMultiplesInRange arrow function.
> - The **``divisible``** function has been removed.
> - The calculation of **`sum`** has been changed to use the **`Array.from``** method, **`filter`**, and **`reduce`**.
> - The **`result`** variable is now assigned the result of calling **`sumOfMultiplesInRange`**.
> - The **`console.log`** statement now outputs result instead of sum.