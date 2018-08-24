import * as React from 'react';
import { ICardPerformanceProps } from './ICardPerformanceProps';
import styles from './styles.module.scss';
import { Radar } from 'react-chartjs-2';
import * as lodash from '@microsoft/sp-lodash-subset';
import Placeholder from '../../Placeholder';

export default class CardPerformance extends React.Component<
  ICardPerformanceProps,
  {}
> {
  public static defaultProps: Partial<ICardPerformanceProps> = {
    allPerformanceSkills: [
      {
        id: 0,
        userPrincipalName: '',
        technicalKnowledge: 8,
        teamwork: 7,
        meetingDeadlines: 9,
        problemSolving: 6,
        leadership: 8,
        management: 9,
      },
    ],
  };

  private _currentEmployeeAverage(skillName: string) {
    return this._getAverageBySkill(
      this.props.employeePerformanceSkills,
      skillName,
    );
  }

  private _allEmployeesAverage(skillName: string) {
    return this._getAverageBySkill(this.props.allPerformanceSkills, skillName);
  }

  private _getAverageBySkill(array: any[], skillName: string) {
    return lodash.sumBy(array, skillName) / array.length;
  }

  public render(): React.ReactElement<ICardPerformanceProps> {
    const legend = {
      display: false,
    };

    const options = {
      scale: {
        ticks: {
          beginAtZero: true,
          min: 0,
          max: 10,
          stepSize: 2,
        },
      },
      animation: {
        duration: 2000,
      },
    };

    const data = {
      labels: [
        'Teamwork',
        'Problem Solving',
        'Leadership',
        'Management',
        'Meeting Deadlines',
        'Thecnical Knowledge',
      ],
      datasets: [
        {
          label: 'Current Employee',
          backgroundColor: 'rgba(199,224,244,.3)',
          borderColor: '#0078d7',
          pointBackgroundColor: '#005a9e',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: '#0078d7',
          data: [
            this._currentEmployeeAverage('teamwork'),
            this._currentEmployeeAverage('problemSolving'),
            this._currentEmployeeAverage('leadership'),
            this._currentEmployeeAverage('management'),
            this._currentEmployeeAverage('meetingDeadlines'),
            this._currentEmployeeAverage('technicalKnowledge'),
          ],
        },
        {
          label: 'Employees Average',
          backgroundColor: 'rgba(179,181,198,0.2)',
          borderColor: '#a3a3a3',
          pointBackgroundColor: '#a3a3a3',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: '#a3a3a3',
          data: [
            this._allEmployeesAverage('teamwork'),
            this._allEmployeesAverage('problemSolving'),
            this._allEmployeesAverage('leadership'),
            this._allEmployeesAverage('management'),
            this._allEmployeesAverage('meetingDeadlines'),
            this._allEmployeesAverage('technicalKnowledge'),
          ],
        },
      ],
    };

    return (
      <div className={styles.cardPerformance}>
        <div className={`${styles.title} ms-font-m`}>Performance</div>
        <div className={`${styles.container} ms-Grid-row`}>
          {this.props.employeePerformanceSkills &&
          this.props.employeePerformanceSkills.length > 0 ? (
            <div className="ms-Grid-col ms-u-sm12">
              <Radar data={data} options={options} legend={legend} />
            </div>
          ) : (
            <Placeholder
              icon="FolderSearch"
              description="No performance data found for this employee..."
            />
          )}
        </div>
      </div>
    );
  }
}
