import Vote from '../data/vote.json';

import Census from '../data/census.json';

import { cleanVoteData, cleanCensusData } from './cleanData';

const randomInterval = () => Math.random() * (1500 - 500) + 500;

export const fakeFetchVote = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(cleanVoteData(JSON.parse(JSON.stringify(Vote))));
    }, randomInterval());
  });

export const fakeFetchCensus = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(cleanCensusData(Census));
    }, randomInterval());
  });
};
