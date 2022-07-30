const rankData = require('../TestData.json');

const calculateRank = async (req, res) => {
  let { score } = req.body;
  score = score != 0 ? (score / 10) * 100 : 0;
  console.log(score);

  let scoreList = rankData.scoresList.filter((d) => {
    return d < score;
  });

  // console.log(scoreList);

  let rank = (scoreList.length / rankData.scoresList.length) * 100;
  rank = Math.round(rank * 100) / 100;

  return res.json({ rank: rank });
};

module.exports = { calculateRank };
