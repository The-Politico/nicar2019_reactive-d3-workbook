// Tex. Senate
const raceID = '45870';

const lims = [
  [0.01, 0.1],
  [0.1, 0.3],
  [0.3, 0.5],
  [0.5, 0.7],
  [0.7, 0.99],
  [1, 1],
];

let i = -1;

const randomMultiplier = (min, max) => Math.random() * (max - min) + min;

// Randomly reduces vote counts
const voteLimiter = (votes) => {
  i = i === 5 ? 0 : i + 1;
  votes.forEach(v => {
    const limit = randomMultiplier(lims[i][0], lims[i][1]);
    v.votecount = Math.round(v.votecount * limit);
  });
  return votes;
};

export const cleanVoteData = (data) => {
  const votes = voteLimiter(data.filter(d => d.raceid === raceID));
  const demVotes = votes.filter(d => d.party === 'Dem');

  const cleanVotes = demVotes.map(d => {
    const totalVotes = votes
      .filter(v => v.fipscode === d.fipscode && (
        v.party === 'GOP' || v.party === 'Dem'
      ))
      .reduce((a, b) => a + b.votecount, 0);
    return {
      fips: d.fipscode,
      dem: d.votecount / totalVotes,
    };
  });
  return cleanVotes;
};

export const cleanCensusData = (data) => {
  const cleanData = {};
  Object.keys(data).forEach(f => {
    cleanData[f] = (data[f].total - data[f].white) / data[f].total;
  });
  return cleanData;
};
