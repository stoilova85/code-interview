// async function calculateSexAndWaterRequirements(
//   dna: string,
//   dateOfBirth: Date | string,
//   weight: number
// ): Promise<{ gender: string; waterNeeded: number }> {
//   const gender = await analyzeDna(dna); // Code smell: Mixing responsibilities: In this line, the calculateSexAndWaterRequirements function is responsible for calculating both the sex and water requirements. However, it directly calls the analyzeDna function, which is responsible for analyzing DNA. This mixing of responsibilities violates the Single Responsibility Principle, where each function should have a clear and single responsibility. It would be more appropriate to separate the DNA analysis logic from the calculation of sex and water requirements.
//   const age = await calculateAge(dateOfBirth); // Code smell: Mixing responsibilities: Similar to the previous case, the calculateSexAndWaterRequirements function is responsible for calculating sex and water requirements, but it directly calls the calculateAge function, which calculates the age based on the date of birth. Again, this violates the Single Responsibility Principle. It would be better to separate the age calculation logic from the sex and water requirement calculation.
//   const waterNeeded = calculateWaterRequirements(weight, gender, age); // Code smell: Mixing synchronous and asynchronous code: calculateWaterRequirements function is called synchronously, while the gender and age variables are obtained asynchronously using await. Mixing synchronous and asynchronous code like this can lead to confusion and make the code harder to reason about. It would be more consistent and easier to understand if all the dependencies were obtained asynchronously before calling the calculateWaterRequirements function.
//   return { gender, waterNeeded };
// }

// function analyzeDna(dna: string): Promise<string> {
//   if (typeof dna !== "string" || dna.length !== 46) {
//     return Promise.reject(new Error("Invalid DNA")); // Code smell: Returning a rejected promise for validation. This approach is considered a code smell because it mixes validation logic with the use of rejected promises. A better approach would be to throw an exception directly using throw new Error("Invalid DNA") instead of returning a rejected promise. By throwing an exception, you can handle the error using try-catch blocks or allow it to propagate up the call stack naturally.
//   }
//   return Promise.resolve(getGenderFromDna(dna)); // The error is occurring because the return type of the getGenderFromDna function is string | null, but the expected return type of analyzeDna is Promise<string>.
// }

// function calculateAge(dateOfBirth: Date | string): Promise<number> {
//   let birthYear: number;
//   if (dateOfBirth instanceof Date) {
//     birthYear = dateOfBirth.getFullYear();
//   } else if (typeof dateOfBirth === "string") {
//     birthYear = parseInt(dateOfBirth.substr(0, 4));
//   } else {
//     return Promise.reject(new Error("Invalid date of birth")); // Code smell: Returning a rejected promise for validation.Returning a rejected promise for validation purposes can make the code harder to understand and handle. In this case, when the provided dateOfBirth is not of type Date or string, instead of throwing an error directly, it returns a rejected promise with an error message. This approach can introduce unnecessary complexity and confusion, especially when consuming the calculateAge function. The calling code would need to handle the promise rejection separately, resulting in additional error handling logic.
//   }

//   const currentYear = new Date().getFullYear();
//   const age = currentYear - birthYear;
//   return Promise.resolve(age);
// }

// const waterRequirements = {
//   male: 0.03,
//   female: 0.025,
// };

// function calculateWaterRequirements(
//   weight: number,
//   gender: string,
//   age: number
// ): number {
//   if (weight <= 0 || age <= 0) {
//     throw new Error("Invalid weight or age");
//   }

//   const waterNeeded = waterRequirements[gender.toLowerCase()] * weight;
//   return waterNeeded;
// }

// function getGenderFromDna(dna: string): string | null {
//   try {
//     return dna[20];
//   } catch (error) {
//     return null;
//   }
// }

// function callback(result: any, error?: string) {
//   if (error) {
//     console.log("Error:", error);
//   } else {
//     console.log(result);
//   }
// }

// calculateSexAndWaterRequirements(
//   "ACGTACGTACGTACGTACGTACGTACGTACGTACGTACGTACGTACGT",
//   "1990-01-01",
//   70
// )
//   .then((result) => callback(result))
//   .catch((error) => callback(null, error));