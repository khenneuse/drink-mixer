const fs = require("fs");
const path = require("path");

function handleError(err) {
  if (err) {
    throw err;
  }
}

const inputPath = path.join(__dirname, "inputs");
const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath);
}

const inputs = fs.readdirSync(inputPath);

const drinkMap = {};

inputs.forEach((file) => {
  const filename = `${inputPath}/${file}`;
  console.log(`Processing ${filename}`);

  const alcohol = path.parse(filename).name;

  const rawData = fs.readFileSync(filename);
  const data = JSON.parse(rawData);

  drinkMap[alcohol] = data.drinks.map((currentDrink) => {
    const ingredients = [
      currentDrink.strIngredient1,
      currentDrink.strIngredient2,
      currentDrink.strIngredient3,
      currentDrink.strIngredient4,
      currentDrink.strIngredient5,
      currentDrink.strIngredient6,
      currentDrink.strIngredient7,
      currentDrink.strIngredient8,
      currentDrink.strIngredient9,
      currentDrink.strIngredient10,
      currentDrink.strIngredient11,
      currentDrink.strIngredient12,
      currentDrink.strIngredient13,
      currentDrink.strIngredient14,
      currentDrink.strIngredient15,
    ].filter(Boolean);
    return {
      id: currentDrink.idDrink,
      name: currentDrink.strDrink,
      instructions: currentDrink.strInstructions,
      ingredients,
    }
  });
});

const outputData = JSON.stringify(drinkMap);
fs.writeFile(`${outputPath}/drinks.json`, outputData, handleError);

console.log("Processing Complete!");
