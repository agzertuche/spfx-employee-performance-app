import * as React from 'react';
import { IAchievementProps } from './IAchievementProps';
import styles from './styles.module.scss';
import IconComponent from '../../Common/IconComponent';
import { Size } from '../../../models/Enums';

const Achievement: React.StatelessComponent<IAchievementProps> = props => {
  const { achievement } = props;

  return (
    <div className={styles.achievement}>
      <IconComponent {...achievement} size={Size.XXLarge} />
    </div>
  );
};

export default Achievement;
