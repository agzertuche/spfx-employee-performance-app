import * as React from 'react';
import { ICardProps } from './ICardProps';
import styles from './styles.module.scss';
import CardAchievements from './CardAchievements';
import CardInformation from './CardInformation';
import CardPerformance from './CardPerformance';

const Card: React.StatelessComponent<ICardProps> = props => {
  const { employee } = props;

  return (
    <div className={`${styles.card}`}>
      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-u-sm12 ms-u-md6">
          <CardInformation employee={employee} />
        </div>
        <div className="ms-Grid-col ms-u-sm12 ms-u-md6">
          <CardPerformance
            employeePerformanceSkills={employee.performanceSkills}
          />
        </div>
      </div>
      <div className={`${styles.bottomRow} ms-Grid-row`}>
        <div className="ms-Grid-col ms-u-sm12">
          <CardAchievements achievements={employee.achievements} />
        </div>
      </div>
    </div>
  );
};

export default Card;
