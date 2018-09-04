import * as React from 'react';
import { IIndicator1Props } from './IIndicator1Props';
import List from '../../Common/List';
import Achievement from '../../Common/Achievement';
import { groupByProperty } from '../../../utils';

const Indicator1: React.StatelessComponent<IIndicator1Props> = props => {
  const { achievements, earnedAchievements } = props;

  const mostCompletedAchievements = groupByProperty(
    earnedAchievements,
    'achievementId',
  )
    .sort((a, b) => {
      return b.values.length - a.values.length;
    })
    .slice(0, 3)
    .map(g => {
      return achievements.filter(a => a.id === g.key).pop();
    });

  const items = mostCompletedAchievements.map((a, index) => {
    return <Achievement key={index} achievement={a} />;
  });

  return <List title={'Most Completed'} items={items} />;
};

export default Indicator1;
