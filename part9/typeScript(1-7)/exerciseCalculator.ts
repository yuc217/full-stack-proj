interface ExerciseResult {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
  };

export function calculateExercises(dailyH: number[], target: number): ExerciseResult {
    const periodLength = dailyH.length;
    const trainingDays = dailyH.filter(hours => hours > 0).length;
    const totalH = dailyH.reduce((sum, hours) => sum + hours, 0);
    const average = totalH / periodLength;
    const success = average >= target;
  
    let rating: number;
    let ratingDescription: string;
  
    if (average >= target) {
      rating = 3;
      ratingDescription = "nice work";
    } else if (average >= target * 0.7) {
      rating = 2;
      ratingDescription = "not too bad but could be better";
    } else {
      rating = 1;
      ratingDescription = "you can do better";
    }
  
    return {
      periodLength,
      trainingDays,
      success,
      rating,
      ratingDescription,
      target,
      average
    };
  }
  
  console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));