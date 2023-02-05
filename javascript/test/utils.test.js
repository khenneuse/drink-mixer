const toTest = require("../src/utils");

describe("Utils", () => {
  describe("csvToArray", () => {
    it("returns entries passed in list", () => {
      expect(
        toTest.csvToArray("Ginger ale, Fruit punch, Orange juice")
      ).toEqual(["Ginger ale", "Fruit punch", "Orange juice"]);
    });

    it("returns entries trimmed of white space", () => {
      expect(toTest.csvToArray("   Ginger ale    , Fruit punch   ")).toEqual([
        "Ginger ale",
        "Fruit punch",
      ]);
    });

    it("returns empty list when input is empty", () => {
      expect(toTest.csvToArray("")).toEqual([]);
    });
  });

  describe("isLiquor", () => {
    it("returns true if input is a liquor", () => {
      expect(toTest.isLiquor("Meyers Dark rum")).toBe(true);
    });

    it("returns false if input is not a liquor", () => {
      expect(toTest.isLiquor("Simple syrup")).toBe(false);
    });
  });

  describe("splitIngredientsByType", () => {
    it("splits based on accepted alcohols", () => {
      const input = [
        "Powdered sugar",
        "Light rum",
        "Bitters",
        "Water",
        "151 proof rum",
        "Lime peel",
      ];
      const split = toTest.splitIngredientsByType(input);
      expect(split).toMatchObject({
        alcohols: ["Light rum", "151 proof rum"],
        ingredients: ["Powdered sugar", "Bitters", "Water", "Lime peel"],
      });
    });

    it("returns empty arrays for empty input", () => {
      expect(toTest.splitIngredientsByType([])).toMatchObject({
        alcohols: [],
        ingredients: [],
      });
    });

    it("returns alcohols if that is the only input", () => {
      const inputs = ["Blended whiskey", "Coconut Rum", "Potato vodka"];
      expect(toTest.splitIngredientsByType(inputs)).toMatchObject({
        alcohols: inputs,
        ingredients: [],
      });
    });

    it("returns ingredients if that is the only input", () => {
      const inputs = ["Tonic water", "Collins mix", "Lime juice"];
      expect(toTest.splitIngredientsByType(inputs)).toMatchObject({
        alcohols: [],
        ingredients: inputs,
      });
    });
  });

  describe("determineBaseLiquor", () => {
    [
      { input: "Brandy", expected: "brandy" },
      { input: "Gin", expected: "gin" },
      { input: "light rum", expected: "rum" },
      { input: "Rum", expected: "rum" },
      { input: "Tequila", expected: "tequila" },
      { input: "Vodka", expected: "vodka" },
      { input: "Whiskey", expected: "whiskey" },
    ].forEach(({ input, expected }) => {
      it(`returns ${expected} if ${input} passed in`, () => {
        expect(toTest.determineBaseLiquor(input)).toEqual(expected);
      });
    });

    it("returns undefined for a value that is not a liquor", () => {
      expect(toTest.determineBaseLiquor("Kool-Aid")).toBeUndefined();
    });
  });

  describe("lowerCaseEntries", () => {
    it("returns an empty array if there are no values", () => {
      expect(toTest.lowerCaseEntries([])).toEqual([]);
    });

    it("returns a single value in lowercase", () => {
      expect(toTest.lowerCaseEntries(["MiXeD CAse"])).toEqual(["mixed case"]);
    });

    it("returns multiple values in lowercase", () => {
      expect(
        toTest.lowerCaseEntries(["MiX", "SoMe", "dRinKs", "toDAY"])
      ).toEqual(["mix", "some", "drinks", "today"]);
    });
  });

  describe("containsAllIngredients", () => {
    it("returns true for single element arrays", () => {
      expect(toTest.containsAllIngredients(["juice"], ["juice"])).toBe(true);
    });

    it("returns false for single element arrays", () => {
      expect(toTest.containsAllIngredients(["juice"], ["jungle"])).toBe(false);
    });

    it("returns true when there are more available ingredients to match", () => {
      expect(
        toTest.containsAllIngredients(
          ["lime", "lemon"],
          ["cola", "cherry", "lemon", "lime"]
        )
      ).toBe(true);
    });

    it("returns false when there more needed ingredients to match", () => {
      expect(
        toTest.containsAllIngredients(
          ["lemon", "cola", "lime", "cherry"],
          ["lime", "lemon", "cola"]
        )
      ).toBe(false);
    });
  });

  describe("findDrinks", () => {
    const drinkInputs = [
      {
        id: "14978",
        name: "Rum Punch",
        instructions: "Mix all ingredients in a punch bowl and serve.",
        alcohols: ["Rum", "Ginger ale"],
        ingredients: ["Fruit punch", "Orange juice", "Ice"],
      },
      {
        id: "16250",
        name: "Rum Runner",
        instructions: "Mix all ingredients in glass & add ice.",
        alcohols: ["Malibu rum", "Blackberry brandy"],
        ingredients: ["Orange juice", "Pineapple juice", "Cranberry juice"],
      },
      {
        id: "12091",
        name: "Rum Screwdriver",
        instructions:
          "Pour rum into a highball glass over ice cubes. Add orange juice, stir, and serve.",
        alcohols: ["Light rum"],
        ingredients: ["Orange juice"],
      },
    ];

    it("finds expected drinks", () => {
      const drinks = toTest.findDrinks(drinkInputs, [
        "ice",
        "ginger ale",
        "fruit punch",
        "orange juice",
      ]);

      expect(drinks).toHaveLength(2);
      expect(drinks).toMatchObject([
        {
          id: "14978",
          name: "Rum Punch",
        },
        {
          id: "12091",
          name: "Rum Screwdriver",
        },
      ]);
    });
  });
});
