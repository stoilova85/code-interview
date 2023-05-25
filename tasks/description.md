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

```js
import { UserData } from "./user.model";

function fetchData() {
    // Bad example of using var instead of let or const
    var url = 'https://randomuser.me/api//?results=5';
    return fetch(url)
        .then(response => response.json())
        .then(data => {
            // Bad example of error handling
            if (data.error) {
                console.error('Error occurred:', data.error);
            } else {
                // Bad example of code organization and naming
                processData(data.results);
            }
        })
        .catch(error => {
            // Bad example of error handling
            console.error('An error occurred while fetching data:', error);
        });
}

function processData(results: UserData[]) {
    // Bad example of excessive memory usage
    const users = [];

    // Bad example of type safety and naming
    results.forEach(user => {
        // Bad example of code organization and naming
        const fullName = user.name.first + ' ' + user.name.last;

        // Bad example of excessive CPU usage - / Looping over `results` instead of `users`
        for (let i = 0; i < results.length; i++) {
            // Performing a computationally intensive operation
            const value = Math.sqrt(i);
            console.log('VALUE', value);
        }

        // Bad example of coupling and inheritance
        const element = document.createElement('div');
        element.innerText = fullName;

        // Bad example of code organization
        document.body.appendChild(element);

        // I the type annotation is defined as { [key: string]: any }, which indicates that the object can have any keys of type string and any corresponding values. 
        // This overly complex typing undermines the benefits of static typing and makes the code more difficult to understand and maintain. 
        // It would be better to define proper types for the users array and userCopy object based on the actual structure of the data.
        const userCopy: { [key: string]: any } = { ...user }; // Using object spread to create a copy
        users.push(userCopy);
    });

    // Bad example of excessive mutability
    // Mutating the 'name' properties of each user object in the 'users' array
    users.forEach(user => {
        user.name.first = 'John';
        user.name.last = 'Doe';
    });


    // Nested callback hell starts here
    filterUsersByNestedValue(users, 'location.city', 'New York', filteredUsers => {
        // Bad example of nested callback hell structure
        filterUsersByNestedValue(filteredUsers, 'gender', 'female', filteredUsers => {
            displayFilteredUsers(filteredUsers);
        });
    });
}

//Example of complexity, 
function filterUsersByNestedValue(
    // Bad example of type abuse - Using 'any' type instead of specific types for users
    users: any[],
    propertyPath: string,
    value: any, // // Bad example of type abuse - Using 'any' type instead of specific types for value

    callback: (filteredUsers: any[]) => void
  ) {
    // Bad: Lack of code organization - Functions and methods should be grouped logically
    const filteredUsers = users.filter(user => {
      const properties = propertyPath.split('.');
      let propertyValue = user;
  
      // Bad: Example of  complexity and lack of abstraction 

      for (let i = 0; i < properties.length; i++) {
        if (propertyValue.hasOwnProperty(properties[i])) {
          propertyValue = propertyValue[properties[i]];
        } else {
          propertyValue = undefined;
          break; // Using an explicit "break" statement can lead to complex control flow
        }
      }
  
      return propertyValue === value;
    });
  
    // Example of bad coupling and dependency - Directly invoking the callback function
    callback(filteredUsers);
  }
  
function displayFilteredUsers(users: any[]) {
    users.forEach(user => {
        console.log('Filtered User:', user);
    });
}

function handleFetchError(error: any) {
    // Bad example of error handling
    console.error('An error occurred while fetching data:', error);
}

fetchData();

```






