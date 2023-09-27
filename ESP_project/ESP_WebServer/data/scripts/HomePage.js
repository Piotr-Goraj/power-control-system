// ------------- GET CURRENT TIME ---------\\
export const time = () => {
  const now = new Date();
  const hours = now.getHours() < 10 ? `0${now.getHours()}` : now.getHours();
  const minutes = now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes();
  const seconds = now.getSeconds() < 10 ? `0${now.getSeconds()}` : now.getSeconds();

  const year = now.getFullYear();
  const month = now.getMonth() + 1 < 10 ? `0${now.getMonth() + 1}` : now.getMonth() + 1; // getMonth returns month 0 to 11
  const day = now.getDate() < 10 ? `0${now.getDate()}` : now.getDate();

  return {
    time: `${hours}:${minutes}:${seconds}`,
    date: `${day}.${month}.${year}`,
  };
};

// ------------- RQNDOM QUOTE ---------\\
const response = await fetch('../data/JSONs/quotes.json');
const quotes = await response.json();

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const randomNumber = getRandomInt(quotes.en.length);

export const randomQuote = quotes.en[randomNumber];
