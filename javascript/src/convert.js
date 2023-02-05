const fs = require("fs");
const path = require("path");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

const { splitIngredientsByType } = require("./utils");

function parseArguments(inputArgs) {
  return yargs(hideBin(inputArgs))
    .option("inputs", {
      alias: "i",
      type: "string",
      description: "The directory holding the JSON input files",
    })
    .demandOption("inputs")

    .option("output", {
      alias: "o",
      type: "string",
      description: "The directory where to store the output file drinks.json",
    })
    .demandOption("output")

    .help()
    .alias("help", "h")
    .parse();
}

function handleError(err) {
  if (err) {
    throw err;
  }
}

const argv = parseArguments(process.argv);

const inputPath = argv.inputs.replace(/\/$/, "");
const outputPath = argv.output.replace(/\/$/, "");

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
    const split = splitIngredientsByType(ingredients);
    return {
      id: currentDrink.idDrink,
      name: currentDrink.strDrink,
      instructions: currentDrink.strInstructions,
      ...split,
    };
  });
});

const outputData = JSON.stringify(drinkMap);
const outputFilename = `${outputPath}/drinks.json`;
fs.writeFile(outputFilename, outputData, handleError);
console.log(`Output written to ${outputFilename}`);

console.log("Processing Complete!");
