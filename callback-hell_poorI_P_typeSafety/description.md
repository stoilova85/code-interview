## Callback Hell, Poor Inheritance and Polymorphism, Disorganized Code,Weak Type Safety and memory heap:

<style>
r { color: Red }
o { color: Orange }
g { color: Green }
</style>

# Inconsistent type usage, Excessive mutability,Magic number/string

## 🔊 
<r>When a function is declared globally, its code, along with any associated data or variables, is allocated on the memory heap. This allows the function to be accessed and called from anywhere within the program. Global functions are typically defined outside of any specific block or scope, making them accessible throughout the entire program. Since functions declared globally reside in the memory heap, they have a longer lifetime compared to functions declared within a specific scope or block. They persist in memory throughout the execution of the program, making them available for repeated use across multiple scopes or modules. excessive use of global functions can lead to potential drawbacks. It can increase the risk of naming conflicts, where different functions or variables have the same name. Additionally, global functions can hinder code modularity and encapsulation, as they are not confined to specific scopes or modules.</r>
◊

## **What else you should notice**

1. Callback Hell: The search function searchByName uses callback functions for handling asynchronous operations. However, the nesting of callbacks leads to an unreadable and difficult-to-maintain code structure known as callback hell.

2. Poor Inheritance and Polymorphism: The SearchResults class is intended to represent search results and provide a method for printing the results. However, it lacks proper inheritance and polymorphism principles, resulting in a less flexible and scalable design.

3. Disorganized Code Organization: The code lacks proper organization and modularization. Functions and classes are defined in the global scope without proper encapsulation or separation of concerns.

4. Weak Type Safety: Search function does not explicitly check if the query is a string, leading to potential runtime errors.

5. When a function is declared globally, its code, along with any associated data or variables, is allocated on the memory heap. This allows the function to be accessed and called from anywhere within the program. Global functions are typically defined outside of any specific block or scope, making them accessible throughout the entire program.


Since functions declared globally reside in the memory heap, they have a longer lifetime compared to functions declared within a specific scope or block. They persist in memory throughout the execution of the program, making them available for repeated use across multiple scopes or modules. excessive use of global functions can lead to potential drawbacks. It can increase the risk of naming conflicts, where different functions or variables have the same name. Additionally, global functions can hinder code modularity and encapsulation, as they are not confined to specific scopes or modules. 


### What should be noticed: 

* data is not changeble, we could use const instead of let

```js
let data = [
    { name: 'John Doe', age: 25 },
    { name: 'Jane Smith', age: 30 },
    { name: 'Bob Johnson', age: 40 },
    { name: 'Alice Williams', age: 35 },
];
```

* Poor Function Naming : The function name 'filterByName' is vague and does not clearly convey its purpose.

```js
function filterByName(query) {
  return data.filter(item => item.name.includes(query));
}
```

* Mixing of Asynchronous Patterns - The use of Promises for the searchByName function clashes with the synchronous nature of the filterByName function. Mixing asynchronous patterns can lead to confusion and inconsistency in code execution flow.

```js
function searchByName(query) {
  return new Promise((resolve, reject) => {
    if (typeof query === 'string') {
      setTimeout(() => {
        const results = filterByName(query);
        resolve(results);
      }, 1000);
    } else {
      reject('Error: Invalid query type');
    }
  });
}
```

* Generic Function Naming: The function name 'printResults' does not provide enough information about what results are being printed.

```js
function printResults(results) {
  results.forEach(result => {
    console.log(`Name: ${result.name}, Age: ${result.age}`);
  });
}
```

* Missing async/await: The main function is missing the async keyword, and the await keyword is not used when calling the searchByName function. This means that the execution will not wait for the promise returned by searchByName to resolve before proceeding to the next line, leading to incorrect behavior and potentially trying to iterate over an unresolved promise.

```js
function main() {
  try {
    const query = 'John';
    const results = searchByName(query);
    printResults(results);
  } catch (error) {
    console.log(error);
  }
}
``` 

## Look at the explanation to have better understanding: 

```js
const inputDate = '23:05:1990';
```

<table>
<tr>
<th style="width:50%">Smell Code</th>
<th style="width:50%">Refactored Code</th>
</tr>
<tr>
<td>
  
```js
let data = [
    { name: 'John Doe', age: 25 },
    { name: 'Jane Smith', age: 30 },
    { name: 'Bob Johnson', age: 40 },
    { name: 'Alice Williams', age: 35 },
];

function filterByName(query) {
    return data.filter(item => item.name.includes(query));
}

function searchByName(query) {
    return new Promise((resolve, reject) => {
        if (typeof query === 'string') {
            setTimeout(() => {
                const results = filterByName(query);
                resolve(results);
            }, 1000);
        } else {
            reject('Error: Invalid query type');
        }
    });
}

function printResults(results) {
    results.forEach(result => {
        console.log(`Name: ${result.name}, Age: ${result.age}`);
    });
}

function main() {
    try {
        const query = 'John';
        const results = searchByName(query);
        printResults(results);
    } catch (error) {
        console.log(error);
    }
} 

main();


```
  
</td>
<td>

```js
const data = [
    { name: 'John Doe', age: 25 },
    { name: 'Jane Smith', age: 30 },
    { name: 'Bob Johnson', age: 40 },
    { name: 'Alice Williams', age: 35 },
  ];
  
  const filterByName = (query, data) => data.filter(item => item.name.includes(query));
  const printResults = results => results.forEach(result => console.log(`Name: ${result.name}, Age: ${result.age}`));
  
  const searchByName = (query, data) => {
    return new Promise((resolve, reject) => {
      if (typeof query === 'string') {
        setTimeout(() => {
          let results = filterByName(query, data);
          resolve(results);
        }, 1000);
      } else {
        reject(Error('Invalid query type'));
      }
    });
  };
  
  const main = async () => {
    try {
      const query = 'John';
      const results = await searchByName(query, data);
      printResults(results);
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  };
  
  main();
```

</td>
</tr>
</table>



```diff
- let data = [
+ const data = [
    { name: 'John Doe', age: 25 },
    { name: 'Jane Smith', age: 30 },
    { name: 'Bob Johnson', age: 40 },
    { name: 'Alice Williams', age: 35 }
  ];

- function filterByName(query) {
-   return data.filter(item => item.name.includes(query));
- }
+ const filterByName = (query, data) => data.filter(item => item.name.includes(query));

- function searchByName(query) {
+ const searchByName = (query, data) => {
    return new Promise((resolve, reject) => {
      if (typeof query === 'string') {
        setTimeout(() => {
-         const results = filterByName(query);
+         let results = filterByName(query, data);
          resolve(results);
        }, 1000);
      } else {
        reject('Error: Invalid query type');
      }
    });
  }

-   function printResults(results) {
-     results.forEach(result => {
-      console.log(`Name: ${result.name}, Age: ${result.age}`);
-     });
-   }
+   const printResults = results => results.forEach(result => console.log(`Name: ${result.name}, Age: ${result.age}`));

-   function main() {
+   const main = async () => {
      try {
       const query = 'John';
-       const results = searchByName(query);
+      const results = await searchByName(query, data);
       printResults(results);
      } catch (error) {
        console.log(error);
        console.log(`Error: ${error.message}`);
      }
    }
  }
}
main();

```


> # 📝 Note!
> ### ℹ️ In the above diff:
> - The lines with a `` `-` `` prefix indicate the removal of code or lines from the original version.
> - The lines with a `` `+` ``> - prefix indicate the addition of new code or lines in the updated version.
> - The highlighted changes are as follows:
> ###  ℹ️ All global functions have been converted into an arrow functions.
> - The declaration and initialization of the **``data``** variable have been changed from **``let``** to **``const``**.
> - The **``filterByName``** function has been converted to an arrow function with the **``data``** parameter included.
> - The **``searchByName``** function has been converted to an arrow function with the data parameter included.
> - The **``printResults``** function has been converted to an arrow function.
> - The **``main``** function has been converted to an arrow function and modified to use **``await``** when calling **``searchByName``** with the **``data``** parameter.
