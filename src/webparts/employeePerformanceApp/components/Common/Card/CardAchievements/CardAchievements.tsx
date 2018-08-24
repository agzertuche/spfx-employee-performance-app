import * as React from 'react';
import { ICardAchievementsProps } from './ICardAchievementsProps';
import styles from './styles.module.scss';
import Achievement from '../../Achievement';
import Placeholder from '../../Placeholder';

const CardAchievements: React.StatelessComponent<
  ICardAchievementsProps
> = props => {
  const { achievements } = props;
  const achievementsList = achievements.map((a, index) => {
    return (
      <div key={index} className="ms-Grid-col ms-u-sm12 ms-u-md4">
        <Achievement achievement={a} />
      </div>
    );
  });

  return (
    <div className={styles.cardAchievements}>
      <div className={`${styles.title} ms-font-m`}>Achievements</div>
      <div className={`${styles.container} ms-Grid-row`}>
        {achievementsList.length > 0 ? (
          achievementsList
        ) : (
          <Placeholder
            icon="ReceiptCheck"
            description="No achievements found for this employee..."
          />
        )}
      </div>
    </div>
  );
};

export default CardAchievements;
