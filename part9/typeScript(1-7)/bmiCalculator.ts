interface MultiplyValues {
  value1: number;
  value2: number;
}

const parseArguments = (args: string[]): MultiplyValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    };
  } else {
    throw new Error('malformatted parameters');
  }
};

export function calculateBmi(heightCm: number, weightKg: number): string {
    const height = heightCm / 100;
    const bmi = weightKg / (height * height);
  
    // console.log(bmi)
    if (bmi < 18.5) {
      return "Underweight";
    } else if (bmi >= 18.5 && bmi < 25) {
      return "Normal range";
    } else if (bmi >= 25 && bmi < 30) {
      return "Overweight";
    } else {
      return "Obese";
    }
  }
  
  console.log(calculateBmi(180, 74));
  
  if (require.main === module) {
    try {
      const { value1, value2 } = parseArguments(process.argv);
      // console.log(value1, value2);
      console.log(calculateBmi(value1, value2));
    } catch (error: unknown) {
      let errorMessage = 'Something bad happened.';
      if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
      }
      console.log(errorMessage);
    }
  }

