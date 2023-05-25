interface SexAndWaterRequirements {
    gender: string;
    waterNeeded: number;
  }
  
  interface DNAAnalysisResult {
    gender: string;
  }
  
  interface WaterRequirements {
    male: number;
    female: number;
  }
  
  class InvalidDNAError extends Error {
    constructor() {
      super("Invalid DNA");
      this.name = "InvalidDNAError";
    }
  }
  
  class InvalidDateOfBirthError extends Error {
    constructor() {
      super("Invalid date of birth");
      this.name = "InvalidDateOfBirthError";
    }
  }
  
  class InvalidWeightOrAgeError extends Error {
    constructor() {
      super("Invalid weight or age");
      this.name = "InvalidWeightOrAgeError";
    }
  }
  
  function calculateSexAndWaterRequirements(
    dna: string,
    dateOfBirth: Date | string,
    weight: number
  ): Promise<SexAndWaterRequirements> {
    const genderPromise = analyzeDna(dna);
    const agePromise = calculateAge(dateOfBirth);
  
    return Promise.all([genderPromise, agePromise])
      .then(([gender, age]) => {
        const waterNeeded = calculateWaterRequirements(weight, gender, age);
        return { gender, waterNeeded };
      });
  }
  
  function calculateAge(dateOfBirth: Date | string): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      let birthYear: number;
      if (dateOfBirth instanceof Date) {
        birthYear = dateOfBirth.getFullYear();
      } else if (typeof dateOfBirth === "string") {
        const year = parseInt(dateOfBirth.substr(0, 4));
        if (isNaN(year)) {
          reject(new InvalidDateOfBirthError());
          return;
        }
        birthYear = year;
      } else {
        reject(new InvalidDateOfBirthError());
        return;
      }
  
      const currentYear = new Date().getFullYear();
      const age = currentYear - birthYear;
      resolve(age);
    });
  }
  
  function analyzeDna(dna: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if (typeof dna !== "string" || dna.length !== 46) {
        reject(new InvalidDNAError());
        return;
      }
      resolve(getGenderFromDna(dna));
    });
  }
  
  const waterRequirements: WaterRequirements = {
    male: 0.03,
    female: 0.025,
  };
  
  function calculateWaterRequirements(
    weight: number,
    gender: string,
    age: number
  ): number {
    if (weight <= 0 || age <= 0) {
      throw new InvalidWeightOrAgeError();
    }
  
    const waterNeeded = waterRequirements[gender.toLowerCase()] * weight;
    return waterNeeded;
  }
  
  function getGenderFromDna(dna: string): string {
    if (dna.length < 21) {
      throw new InvalidDNAError();
    }
    return dna[20];
  }
  
  function callback(result: any, error?: Error) {
    if (error) {
      console.log("Error:", error.message);
    } else {
      console.log(result);
    }
  }
  
  calculateSexAndWaterRequirements(
    "ACGTACGTACGTACGTACGTACGTACGTACGTACGTACGTACGTACGT",
    "1990-01-01",
    70
  )
    .then((result) => callback(result))
    .catch((error) => callback(null, error));
  