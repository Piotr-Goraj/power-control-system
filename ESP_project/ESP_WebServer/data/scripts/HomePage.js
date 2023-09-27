const response = await fetch('../data/JSONs/quotes.json');
const quotes = await response.json();

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const randomNumber = getRandomInt(quotes.en.length);

export const randomQuote = quotes.en[randomNumber];
