const path = require("path");
const fs = require("fs");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const { ACCEPTED_LIQUORS } = require("./constants");
const {
  csvToArray,
  determineBaseLiquor,
  findDrinks,
  lowerCaseEntries,
  splitIngredientsByType,
} = require("./utils");

function parseArguments(inputArgs) {
  return yargs(hideBin(inputArgs))
    .option("file", {
      alias: "f",
      type: "string",
      description: "The JSON file holding the drinks",
    })
    .demandOption("file")

    .option("mixers", {
      alias: "m",
      type: "string",
      description:
        "Comma separated list of ingredients that you have for mixing",
    })
    .demandOption("mixers")

    .option("ice", {
      alias: "i",
      type: "boolean",
      description: "If ice is available for mixing",
      default: true,
    })

    .help()
    .alias("help", "h")
    .parse();
}

const argv = parseArguments(process.argv);

let ingredientsForMixing = lowerCaseEntries(csvToArray(argv.mixers));
if (argv.ice) {
  console.log("Adding ice for mixing\n");
  ingredientsForMixing = [...ingredientsForMixing, "ice"];
}

const split = splitIngredientsByType(ingredientsForMixing);

if (split.alcohols.length === 0) {
  "No acceptable liquors found in ingredients\nAllowed list is " +
    ACCEPTED_LIQUORS.join(", "),
    process.exit(1);
}

// We are going to assume the the first alcohol in the list is the base
// alcohol to look up. The other way to do this is by measuring ingredient
// sizes on input to determine the primary alcohol. The ordering appears to be
// primary as the first in the list
const baseLiquor = determineBaseLiquor(split.alcohols[0]);

const rawDrinkData = fs.readFileSync(argv.file);
const drinkData = JSON.parse(rawDrinkData);

const drinksPossible = findDrinks(drinkData[baseLiquor], ingredientsForMixing);

if (drinksPossible.length) {
  console.log("You have the following options for drinks:");
  drinksPossible.forEach((drink) => {
    console.log(`** ${drink.name} **`);
    console.log(`   ${drink.instructions}\n`);
  });
} else {
  console.log("No drinks found for the ingredients ", argv.ingredients);
}
