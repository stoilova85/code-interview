import { UserData } from "./user.model";

interface UserFullName {
  firstName: string;
  lastName: string;
}

async function fetchUserList(): Promise<UserData[]> {
    const url = 'https://randomuser.me/api/?results=5';
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (data.error) {
        throw new Error(`Error occurred: ${data.error}`);
      } else {
        return data.results;
      }
    } catch (error) {
      handleFetchError(error);
      return Promise.reject(error); // Reject the Promise to propagate the error
    }
  }

function processData(results: UserData[]): UserFullName[] {
  const users: UserFullName[] = [];

  results.forEach(user => {
    const fullName: UserFullName = {
      firstName: user.name.first,
      lastName: user.name.last
    };

    const element = createDivElement(fullName);
    appendElementToBody(element);
    users.push(fullName);
  });

  const updatedUsers = updateUsersName(users, 'John', 'Doe');
  filterAndDisplayUsers(updatedUsers, 'location.city', 'New York', 'female')
    .catch(handleFilteringError);

  return users;
}

function updateUsersName(users: UserFullName[], firstName: string, lastName: string): UserFullName[] {
  return users.map(user => ({
    ...user,
    firstName,
    lastName
  }));
}

async function filterAndDisplayUsers(
    users: UserFullName[],
    propertyPath: string,
    value: any,
    gender: string
  ): Promise<void> {
    try {
      const filteredUsers = await filterUsersByNestedValue(users, propertyPath, value);
      const finalFilteredUsers = await filterUsersByNestedValue(filteredUsers, 'gender', gender);
      displayFilteredUsers(finalFilteredUsers);
    } catch (error) {
      handleFilteringError(error);
      return Promise.reject(error); // Reject the Promise to propagate the error
    }
  }

async function filterUsersByNestedValue(
  users: UserFullName[],
  propertyPath: string,
  value: string
): Promise<UserFullName[]> {
  return users.filter(user => {
    const properties = propertyPath.split('.');
    let propertyValue: any = user;

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
}

function displayFilteredUsers(users: UserFullName[]): void {
  users.forEach(user => {
    console.log('Filtered User:', user);
  });
}

function handleFetchError(error: Error): void {
  console.error('An error occurred while fetching data:', error);
  // Log the error or perform any necessary error handling
}

function handleFilteringError(error: Error): void {
  console.error('An error occurred while filtering data:', error);
  // Log the error or perform any necessary error handling
}

function createDivElement(fullName: UserFullName): HTMLDivElement {
  const element = document.createElement('div');
  element.innerText = `${fullName.firstName} ${fullName.lastName}`;
  return element;
}

function appendElementToBody(element: HTMLDivElement): void {
  document.body.appendChild(element);
}

(async () => {
  const results = await fetchUserList();
  const users = processData(results);
  // Further operations on users if needed
})();
