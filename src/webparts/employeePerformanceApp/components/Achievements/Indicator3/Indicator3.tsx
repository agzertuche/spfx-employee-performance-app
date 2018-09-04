import * as React from 'react';
import { IIndicator3Props } from './IIndicator3Props';
import List from '../../Common/List';
import {
  IPersonaProps,
  Persona,
  PersonaSize,
} from 'office-ui-fabric-react/lib/Persona';
import IconComponent from '../../Common/IconComponent';
import { Size } from '../../../models/Enums';
import styles from './styles.module.scss';
import { groupByProperty } from '../../../utils';

const Indicator3: React.StatelessComponent<IIndicator3Props> = props => {
  const { earnedAchievements, users } = props;

  const topAchievers = groupByProperty(earnedAchievements, 'userPrincipalName')
    .sort((a, b) => {
      return b.values.length - a.values.length;
    })
    .slice(0, 3) // take top three achievers
    .map(g => {
      return users
        .filter(u => u.userPrincipalName.toLowerCase() === g.key.toLowerCase())
        .pop();
    });

  const onRenderSecondaryText = (personaProps: IPersonaProps): JSX.Element => {
    return (
      <IconComponent
        iconName={'Suitcase'}
        description={personaProps.secondaryText}
        size={Size.Small}
      />
    );
  };

  const items = topAchievers.map((a, index) => {
    if (!a) return null;
    return (
      <Persona
        className={styles.persona}
        key={index}
        {...a}
        primaryText={a.displayName}
        secondaryText={a.jobTitle}
        size={PersonaSize.regular}
        onRenderSecondaryText={onRenderSecondaryText}
      />
    );
  });

  return (
    <div className={styles.indicator3}>
      <List title={'Top Achievers'} items={items} />
    </div>
  );
};

export default Indicator3;
