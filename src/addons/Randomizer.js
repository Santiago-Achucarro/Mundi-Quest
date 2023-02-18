

function RandomNumber(data) {
  let numbRandom = Math.floor(Math.random() * data.length);
  return numbRandom;
}

function Randomizer(array, quantity = 1) {
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, quantity);
}

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

function generateOptions(dataFetching) {
  let countryFlag = dataFetching[RandomNumber(dataFetching)];
  let noRepeat = dataFetching.filter((item) => item !== countryFlag);
  noRepeat = Randomizer(noRepeat, 3);
  noRepeat.push(countryFlag);
  shuffle(noRepeat);
  return [countryFlag, noRepeat];
}

function generateUniqueOptions(dataFetching, exclude = []) {
  let countryFlag = dataFetching[RandomNumber(dataFetching)];
  while (exclude.includes(countryFlag)) {
    countryFlag = dataFetching[RandomNumber(dataFetching)];
  }
  let noRepeat = dataFetching.filter((item) => item !== countryFlag);
  exclude.push(countryFlag);
  noRepeat = Randomizer(noRepeat, 3);
  noRepeat.push(countryFlag);
  shuffle(noRepeat);
  return [countryFlag, noRepeat];
}


export { Randomizer, RandomNumber, generateOptions, generateUniqueOptions };
