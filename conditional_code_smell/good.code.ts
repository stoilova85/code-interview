interface ValidationRule {
  isValid: (value: any) => boolean;
  errorMessage: string;
}

function validate(values: { [key: string]: any }, rules: ValidationRule[]): void {
  for (const key in values) {
    if (values.hasOwnProperty(key)) {
      const value = values[key];
      for (const rule of rules) {
        if (!rule.isValid(value)) {
          throw new Error(rule.errorMessage);
        }
      }
    }
  }
}

async function calculateSexAndWaterRequirements(
  dna: string,
  dateOfBirth: Date | string,
  weight: number
): Promise<{ gender: string; waterNeeded: number }> {
  const validationRules: ValidationRule[] = [
    {
      isValid: (value: any) => typeof value === "string" && value.length === 46,
      errorMessage: "Invalid DNA. DNA should be a string of length 46.",
    },
    {
      isValid: (value: any) => value instanceof Date || typeof value === "string",
      errorMessage: "Invalid date of birth. Date of birth should be a Date object or a string.",
    },
    {
      isValid: (value: any) => {
        const isValidDate = !isNaN(new Date(value).getTime());
        return isValidDate;
      },
      errorMessage: "Invalid date of birth format. Date of birth should be in a valid format.",
    },
    {
      isValid: (value: any) => typeof value === "number" && value > 0,
      errorMessage: "Invalid weight. Weight should be a positive number.",
    },
  ];

  validate({ dna, dateOfBirth, weight }, validationRules);

  const gender = await analyzeDna(dna, validationRules);
  const age = calculateAge(dateOfBirth);
  const waterNeeded = calculateWaterRequirements(weight, gender, age);
  return { gender, waterNeeded };
}

async function analyzeDna(dna: string, rules: ValidationRule[]): Promise<string | ''> {
  validate({ dna }, rules);
  return getGenderFromDna(dna);
}

function calculateAge(dateOfBirth: Date | string): number {
  let birthYear: number;
  if (dateOfBirth instanceof Date) {
    birthYear = dateOfBirth.getFullYear();
  } else if (typeof dateOfBirth === "string") {
    birthYear = parseInt(dateOfBirth.substr(0, 4));
  } else {
    throw new Error("Invalid date of birth");
  }

  const currentYear = new Date().getFullYear();
  const age = currentYear - birthYear;
  return age;
}

const waterRequirements = {
  male: 0.03,
  female: 0.025,
};

function calculateWaterRequirements(
  weight: number,
  gender: string,
  age: number
): number {
  if (weight <= 0 || age <= 0) {
    throw new Error("Invalid weight or age");
  }

  const waterNeeded = waterRequirements[gender.toLowerCase()] * weight;
  return waterNeeded;
}

function getGenderFromDna(dna: string): string {
  try {
    const gender = dna[20];
    if (gender === undefined) {
      throw new Error("Failed to extract gender from DNA.");
    }
    return gender!;
  } catch (error) {
    return '';
  }
}

const validationRules: ValidationRule[] = [
  {
    isValid: (value: any) => typeof value === "string" && value.length === 46,
    errorMessage: "Invalid DNA. DNA should be a string of length 46.",
  },
  {
    isValid: (value: any) => value instanceof Date || typeof value === "string",
    errorMessage: "Invalid date of birth. Date of birth should be a Date object or a string.",
  },
  {
    isValid: (value: any) => {
      const isValidDate = !isNaN(new Date(value).getTime());
      return isValidDate;
    },
    errorMessage: "Invalid date of birth format. Date of birth should be in a valid format.",
  },
  {
    isValid: (value: any) => typeof value === "number" && value > 0,
    errorMessage: "Invalid weight. Weight should be a positive number.",
  },
];

calculateSexAndWaterRequirements(
  "ACGTACGTACGTACGTACGTACGTACGTACGTACGTACGTACGTACGT",
  "1990-01-01",
  70
)
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
