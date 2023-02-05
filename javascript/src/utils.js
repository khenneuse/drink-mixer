const { ACCEPTED_LIQUORS } = require("./constants");

function csvToArray(input) {
  return input
    .split(",")
    .map((entry) => entry.trim())
    .filter((entry) => entry !== "");
}

function isLiquor(input) {
  return ACCEPTED_LIQUORS.some((alcohol) =>
    input.toLowerCase().includes(alcohol)
  );
}

function splitIngredientsByType(allIngredients) {
  return allIngredients.reduce(
    (response, ingredient) => {
      if (isLiquor(ingredient)) {
        response.alcohols = [...response.alcohols, ingredient];
      } else {
        response.ingredients = [...response.ingredients, ingredient];
      }
      return response;
    },
    { alcohols: [], ingredients: [] }
  );
}

function determineBaseLiquor(availableAlcohol) {
  return ACCEPTED_LIQUORS.find((alcohol) =>
    availableAlcohol.toLowerCase().includes(alcohol)
  );
}

function lowerCaseEntries(entries) {
  return entries.map((entry) => entry.toLowerCase());
}

function containsAllIngredients(ingredientsToCheck, availableIngredients) {
  return ingredientsToCheck.every((ingredient) =>
    availableIngredients.includes(ingredient)
  );
}

function findDrinks(drinksOfLiquor, availableIngredients) {
  return drinksOfLiquor.reduce((foundDrinks, drink) => {
    const drinkIngredients = lowerCaseEntries(drink.ingredients);

    if (containsAllIngredients(drinkIngredients, availableIngredients)) {
      return [...foundDrinks, drink];
    }
    return foundDrinks;
  }, []);
}

exports.csvToArray = csvToArray;
exports.isLiquor = isLiquor;
exports.splitIngredientsByType = splitIngredientsByType;
exports.determineBaseLiquor = determineBaseLiquor;
exports.lowerCaseEntries = lowerCaseEntries;
exports.containsAllIngredients = containsAllIngredients;
exports.findDrinks = findDrinks;
