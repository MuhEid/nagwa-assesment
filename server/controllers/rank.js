const rankData = require('../TestData.json');

const calculateRank = async (req, res) => {
  try {
    // taking the score from the frontend
    let { score } = req.body;
    // calculating the score = number of correct answers / total number of questions)*100
    score = (score / 10) * 100;

    let scoreLessThan = rankData.scoresList.filter((d) => {
      return d < score;
    });

    // calculate rank = number of scores less than our score / total number of scores
    let rank = (scoreLessThan.length / rankData.scoresList.length) * 100;
    rank = Math.round(rank * 100) / 100;

    return res.json({ rank: rank });
  } catch (e) {
    console.log('error' + e);
    console.log(req.body);
  }
};

module.exports = { calculateRank };
