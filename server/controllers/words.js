const data = require('../TestData.json');

const getData = (req, res) => {
  const types = ['noun', 'verb', 'adverb', 'adjective'];
  // get a random number within an interval
  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  // shuffle an array using Durstenfeld shuffle
  function shuffleArray(array, num) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array.slice(0, num);
  }

  // get an array of one part of speech by filtering the main one by pos
  function getTypeArray(type) {
    let posArray = data.wordList.filter((arr) => arr.pos === type);
    return posArray;
  }
  // an array that has four arrays of 4 different parts of speech each.
  let totalArray = [];

  // we shuffle the 4 arrays before popping the last element, to make sure it is different every time.
  types.forEach((type) => {
    let t = getTypeArray(type);
    let shuffledArrays = shuffleArray(t, t.length);
    totalArray.push(shuffledArrays);
  });

  // take the last element of each array and pushing it into a new array of 10 elements
  function getQuestions() {
    let results = [];
    while (results.length < 10) {
      let randomIndex = randomInt(0, 3);
      if (totalArray[randomIndex].length > 0) {
        let q = totalArray[randomIndex].pop();
        results.push(q);
      }
    }
    return results;
  }
  res.send(getQuestions());
};

module.exports = { getData };
