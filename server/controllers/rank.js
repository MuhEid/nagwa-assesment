const rankData = require('../TestData.json');

const calculateRank = async (req, res) => {
  try {
    let { score } = req.body;
    score = score != 0 ? (score / 10) * 100 : 0;

    let scoreList = rankData.scoresList.filter((d) => {
      return d < score;
    });

    let rank = (scoreList.length / rankData.scoresList.length) * 100;
    rank = Math.round(rank * 100) / 100;

    return res.json({ rank: rank });
  } catch (e) {
    console.log('error' + e);
    console.log(req.body);
  }
};

module.exports = { calculateRank };
