import * as React from 'react';
import { IIndicator2Props } from './IIndicator2Props';
import List from '../../Common/List';
import Achievement from '../../Common/Achievement';
import { groupByProperty } from '../../../utils';

const Indicator2: React.StatelessComponent<IIndicator2Props> = props => {
  const { achievements, earnedAchievements } = props;

  const latestMax =
    Math.floor(earnedAchievements.length / 3) >= 3
      ? Math.floor(earnedAchievements.length / 3)
      : 3;

  const groupedAchievements = earnedAchievements
    .sort((a, b) => {
      return b.id - a.id;
    })
    .slice(0, latestMax);

  const trendingCompletedAchievements = groupByProperty(
    groupedAchievements,
    'achievementId',
  )
    .slice(0, 3)
    .map(g => {
      return achievements.filter(a => a.id === g.key).pop();
    });

  const items = trendingCompletedAchievements.map((a, index) => {
    return <Achievement key={index} achievement={a} />;
  });

  return <List title={'Trending'} items={items} />;
};

export default Indicator2;
