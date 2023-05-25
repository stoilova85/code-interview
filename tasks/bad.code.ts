import { UserData } from "./user.model";

function fetchData() {
    var url = 'https://randomuser.me/api//?results=5';
    return fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error('Error occurred:', data.error);
            } else {
                processData(data.results);
            }
        })
        .catch(error => {
            console.error('An error occurred while fetching data:', error);
        });
}

function processData(results: UserData[]) {
    const users = [];

    results.forEach(user => {
        const fullName = user.name.first + ' ' + user.name.last;

        for (let i = 0; i < results.length; i++) {
            const value = Math.sqrt(i);
            console.log('VALUE', value);
        }

        const element = document.createElement('div');
        element.innerText = fullName;

        document.body.appendChild(element);
        const userCopy: { [key: string]: any } = { ...user };
        users.push(userCopy);
    });

    users.forEach(user => {
        user.name.first = 'John';
        user.name.last = 'Doe';
    });


    filterUsersByNestedValue(users, 'location.city', 'New York', filteredUsers => {
        filterUsersByNestedValue(filteredUsers, 'gender', 'female', filteredUsers => {
            displayFilteredUsers(filteredUsers);
        });
    });
}

function filterUsersByNestedValue(
    users: any[],
    propertyPath: string,
    value: any, 

    callback: (filteredUsers: any[]) => void
  ) {
    const filteredUsers = users.filter(user => {
      const properties = propertyPath.split('.');
      let propertyValue = user;

      for (let i = 0; i < properties.length; i++) {
        if (propertyValue.hasOwnProperty(properties[i])) {
          propertyValue = propertyValue[properties[i]];
        } else {
          propertyValue = undefined;
          break;
        }
      }
  
      return propertyValue === value;
    });
  
    callback(filteredUsers);
  }
  
function displayFilteredUsers(users: any[]) {
    users.forEach(user => {
        console.log('Filtered User:', user);
    });
}

function handleFetchError(error: any) {
    console.error('An error occurred while fetching data:', error);
}

fetchData();






