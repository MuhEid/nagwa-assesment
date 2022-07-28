const data = require('../TestData.json');

const getData = (req, res) => {
  const types = ['noun', 'verb', 'adverb', 'adjective'];
  // get random
  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  // shuffle
  function shuffleArray(arr, num) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  }

  // get array of type
  function getTypeArray(type) {
    let posArray = data.wordList.filter((el) => el.pos === type);
    return posArray;
  }

  let totalArray = [];

  types.forEach((type) => {
    let t = getTypeArray(type);
    let shuffledArrays = shuffleArray(t, t.length);
    totalArray.push(shuffledArrays);
  });

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
