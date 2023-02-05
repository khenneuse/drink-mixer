#!/bin/bash

alcohols=( vodka whiskey rum tequila brandy gin )

if [ ! -d "inputs" ]
then
    echo "Creationg directory for input files"
    mkdir inputs
fi

for alcohol in "${alcohols[@]}"
do
  wget --output-document=inputs/$alcohol.json https://www.thecocktaildb.com/api/json/v1/1/search.php?s=$alcohol
done
