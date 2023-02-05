# Drink Mixer

This project is a coding challenge that was requested by a company as a way to see how to approach a technical problem.

To complete the assignment, it was broken into three parts.

1. Download the files that were needed by using the API at `thecocktaildb.com`. A simple bash script in this directory pulls down and saves the necessary files using `wget`. This was broken out to not keep calling the APIs more than necessary.
1. Conversion of the downloaded JSON files into a single JSON file that could be better utilized for the task of finding a drink to match the supplied values.
1. Finally the tool that can take the inputs and find a drink for you to make from your ingredients on hand.

## Example code

The code was separated by language type into subdirectories with javascript being the first implementation. This language was chosen first only because of the most recent experience in the language.

## Scaling

There are options related to scaling this out project out. The way it is scaled will be dependent on the way it needs to be scaled.

### Data size increase

As more data is added to the possible drink collections there will be a point where a file is no longer appropriate to load into memory. The file size itself could become prohibitive for download. There might also be the need to add proprietary data to the file.

In most cases this would be pushing the data to the cloud or another kind of story. Again this would depend on the usage of the tool. A simple command line tool that could be distributed to millions of users would likely result in a search that is done over the web with only the ingredients passed in.

Some options for storage and better searching of the data could be a relational database or possibly ElasticSearch if there was a need to do some relevance searching.

There are currently a finite number of ingredients in a drink based on the API in use. Because this number is small, O(n) array searches are sufficiently fast. A possible way to increase the search if the number of drinks became extremely large could be to score the ingredients and have a sub index of rarest ingredients. This is more speculation in looking at the problem. Something like a [Trie](https://en.wikipedia.org/wiki/Trie) of ingredients might be employed by breaking down the alcohols beyond simply having all rum types under the generic variant of rum.

### Ingredient increases

With the world of Tik Tok challenges around it is possible that the list of possible ingredients could increase to items that are rarely used. A standard bar only has so many things on hand.

The more unique ingredients requested could result in more empty results to the end user. Being able to capture these requests and monitor them could allow for tracking of new trends in drinks that might not be currently in the list. Ginger beer might not have been a normal staple of bars twenty years ago, but the increase in Moscow Mules has probably changed this to now be more common along with the copper drinkware that have made the drink quite recognizable.
