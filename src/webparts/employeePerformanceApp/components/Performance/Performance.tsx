import * as React from 'react';
import { IPerformanceProps } from './IPerformanceProps';
import styles from './styles.module.scss';
import Placeholder from '../Common/Placeholder';
import Chart1 from './Chart1';
import Chart2 from './Chart2';
import Chart3 from './Chart3';

const Performance: React.StatelessComponent<IPerformanceProps> = props => {
  const { performanceSkills, usersCount } = props;

  return (
    <div>
      {performanceSkills.length === 0 ? (
        <div className="ms-Grid-row ms-u-slideDownIn20">
          <div className="ms-Grid-col ms-u-sm12">
            <Placeholder
              icon="BarChart4"
              title="No performance information found..."
            />
          </div>
        </div>
      ) : (
        <div className={styles.performance}>
          <div className="ms-Grid-row ms-u-slideDownIn20">
            <div className="ms-Grid-col ms-u-sm12 ms-u-md6">
              <Chart1
                performanceSkills={performanceSkills}
                usersCount={usersCount}
              />
            </div>
            <div className="ms-Grid-col ms-u-sm12 ms-u-md6">
              <Chart2 performanceSkills={performanceSkills} />
            </div>
          </div>
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-u-sm12">
              <Chart3
                performanceSkills={performanceSkills}
                usersCount={usersCount}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Performance;
