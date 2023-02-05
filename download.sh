#!/bin/bash


function printUsageAndExit() {
    echo "Usage: $(basename $0) <output-dir>"
    echo " the directory to output the downloaded JSON files"
    exit 1
}

OUTPUT_DIR=$1;

if [ -z "$OUTPUT_DIR" ]; then
    printUsageAndExit
fi


alcohols=( vodka whiskey rum tequila brandy gin )

if [ ! -d $OUTPUT_DIR ]; then
    echo "Creationg directory for files"
    mkdir -p $OUTPUT_DIR
fi

for alcohol in "${alcohols[@]}"; do
  wget --output-document=$OUTPUT_DIR/$alcohol.json https://www.thecocktaildb.com/api/json/v1/1/search.php?s=$alcohol
done
