# Find A Drink - Javascript

There are two major steps to Finding a Drink that will match the ingredients you have on hand.

After you have downloaded the files using `download.sh` in the parent directory, you will run a conversion of the JSON. Once the JSON is converted, you may use the `find-a-drink` script multiple times.

## Interesting notes

This was meant to meet the requirements as closely as possible.

1. It was found that ice existed in the original information given although it had not been passed in. To handle this a flag that defaults to having ice `--ice` was added. This allows for a `--no-ice` option to handle the outside case.
1. There are variations on liquor names that are not handled within the code and were assumed to be out of scope. Examples include the fact that when we talk about Whiskey we are may be referring to one of multiple liquors. Whisky, Scotch, or Bourbon. There are variations in the way they are made and in the locations that are allowed to use the terms. Scotch can only be made in Scotland. Though there are Japanese whiskeys made in the scotch style that can be superior to vintages of scotch.
1. There were other liquors that were in the ingredients list that were deemed to be mixers. One such liquor is Creme de Cacao. Technically it is an alcohol but it is used for mixing more than it is consumed straight.
1. Drink purists would also take umbrage with the liberal use of some liquors as stand ins for the what the recipe calls for. Though not in the listed drinks a _Dark 'n' Stormy_ &trade; is technically supposed to be made with Gosling Black Seal rum to be correct, though other dark rums might be substituted.
1. Drinks that calls for flavored liquors like Malibu rum are not well served with regular rum as it is the coconut flavor of Malibu that is part of the drink.

## find-a-drink

Find a drink is run using NodeJS. You will need to have a recent version of Node on your machine. Although the code was written using version 19, anything above 16 should work fine.

The script usage is below and can be gotten as well by running `node src/find-a-drink.js --help`

```
Options:
      --version  Show version number                                   [boolean]
  -f, --file     The JSON file holding the drinks            [string] [required]
  -m, --mixers   Comma separated list of ingredients that you have for mixing
                                                             [string] [required]
  -i, --ice      If ice is available for mixing        [boolean] [default: true]
  -h, --help     Show help                                             [boolean]
```

**Note** There is an option for `ice`. The use of this option is meant to be run as `--no-ice` for those times when you do not have ice on hand for mixing drinks.

As standard usage of the script would be the following

```
node src/find-a-drink.js -f output/drinks.json -m "Tonic water, vodka, Lemon peel"
```

This will result in finding two drinks

1. Vodka Tonic
1. Vodka and Tonic

Sample Output

```
Adding ice for mixing

You have the following options for drinks:
** Vodka Tonic **
   Wash and cut 1 wedge and 1 slice of lime or lemon.
Fill a tumbler with fresh ice.
Pour the desired dose of vodka and top up with the tonic.
Squeeze the lime wedge into the glass and decorate with the slice.
That's all, very simple: it's just the recipe for happiness!

** Vodka And Tonic **
   Pour vodka into a highball glass over ice cubes. Fill with tonic water, stir, and serve.
```

## Conversion after download

To better search when finding a drink, the original files downloaded from `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=<liquor>` were transformed to have all the liquors listed together along with splitting the liquor from the the other ingredients.

```javascript
{
  "brandy": [
    {
      "id": ...,
      "name": ...,
      "instructions": ...,
      "alcohols": [...],
      "ingredients": [...],
    },
    .
    .
    .
  ]
  "rum": [
    .
    .
    .
  ],
  .
  .
  .
}
```

The `id` was maintained in the file as a backward link if we need to go and pull the data again.
