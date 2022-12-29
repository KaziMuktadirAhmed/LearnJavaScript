const markHeight = 1.69,
  jonasHeight = 1.78;
const markMass = 78,
  jonasMass = 75;
const BMIMark = markMass / (markHeight * markHeight);
const BMIJonas = jonasMass / jonasHeight ** 2;

console.log(`mark BMI ${BMIMark}`);
console.log(`Jonas BMI ${BMIJonas}`);

const markHigherBMI = BMIMark > BMIJonas;

console.log(
  `The staement that mark has a higher BMI then jonas is ${markHigherBMI}`
);
