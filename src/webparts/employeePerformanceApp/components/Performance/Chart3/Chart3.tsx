import * as React from 'react';
import { IChart3Props } from './IChart3Props';
import ChartComponent from '../../Common/ChartComponent';
import { Line } from 'react-chartjs-2';
import styles from './styles.module.scss';
import { groupByProperty } from '../../../utils';

const Chart3: React.StatelessComponent<IChart3Props> = props => {
  const { performanceSkills, usersCount } = props;

  const legend = { display: false };

  const performanceSkillsByEmployee = groupByProperty(
    performanceSkills,
    'userPrincipalName',
  );

  let bottomCount = 0;
  let lowCount = 0;
  let regularCount = 0;
  let averageCount = 0;
  let remarkableCount = 0;
  let highCount = 0;
  let topCount = 0;

  performanceSkillsByEmployee.forEach(emp => {
    let employeeAverage = 0;

    emp.values.forEach(ps => {
      employeeAverage +=
        (ps.leadership +
          ps.management +
          ps.meetingDeadlines +
          ps.problemSolving +
          ps.teamwork +
          ps.technicalKnowledge) /
        6;
    });

    employeeAverage = employeeAverage / emp.values.length;

    if (employeeAverage <= 0.5) {
      bottomCount++;
    } else if (employeeAverage > 0.5 && employeeAverage <= 1.5) {
      lowCount++;
    } else if (employeeAverage > 1.5 && employeeAverage <= 3.5) {
      regularCount++;
    } else if (employeeAverage > 3.5 && employeeAverage <= 6.5) {
      averageCount++;
    } else if (employeeAverage > 6.5 && employeeAverage <= 8.5) {
      remarkableCount++;
    } else if (employeeAverage > 8.5 && employeeAverage <= 9.5) {
      highCount++;
    } else if (employeeAverage > 9.5) {
      topCount++;
    }
  });

  const maxTickValue = Math.max(
    Math.round(usersCount * 0.3),
    bottomCount,
    lowCount,
    regularCount,
    averageCount,
    remarkableCount,
    highCount,
    topCount,
  );

  const options = {
    responsive: true,
    tooltips: {
      mode: 'label',
    },
    elements: {
      line: {
        fill: false,
      },
    },
    scales: {
      xAxes: [
        {
          display: true,
          gridLines: {
            display: false,
          },
          scaleLabel: {
            display: true,
          },
        },
      ],
      yAxes: [
        {
          type: 'linear',
          display: true,
          position: 'left',
          id: 'y-axis-1',
          gridLines: {
            display: false,
          },
          scaleLabel: {
            display: true,
          },
          ticks: {
            beginAtZero: true,
            min: 0,
            max: maxTickValue,
          },
        },
        {
          type: 'linear',
          display: true,
          position: 'right',
          id: 'y-axis-2',
          gridLines: {
            display: false,
          },
          scaleLabel: {
            display: true,
          },
          ticks: {
            beginAtZero: true,
            min: 0,
            max: maxTickValue,
          },
        },
      ],
    },
  };

  const data = {
    labels: [
      'Bottom',
      'Low',
      'Regular',
      'Average',
      'Remarkable',
      'High',
      'Top',
    ],
    datasets: [
      {
        label: 'Current',
        data: [
          bottomCount,
          lowCount,
          regularCount,
          averageCount,
          remarkableCount,
          highCount,
          topCount,
        ],
        fill: true,
        backgroundColor: styles.primaryColorAlpha,
        borderColor: styles.primaryColor,
        pointBorderColor: styles.borderColor,
        pointBackgroundColor: styles.primaryColor,
        yAxisID: 'y-axis-1',
      },
      {
        label: 'Should be',
        data: [
          Math.round(usersCount * 0.025),
          Math.round(usersCount * 0.075),
          Math.round(usersCount * 0.2),
          Math.round(usersCount * 0.4),
          Math.round(usersCount * 0.2),
          Math.round(usersCount * 0.075),
          Math.round(usersCount * 0.025),
        ],
        fill: false,
        borderColor: styles.secondaryColor,
        backgroundColor: styles.secondaryColor,
        pointBorderColor: styles.borderColor,
        pointBackgroundColor: styles.secondaryColor,
        yAxisID: 'y-axis-2',
      },
    ],
  };

  return (
    <ChartComponent
      title="Normal Distribution for Employees Performance"
      chart={<Line data={data} options={options} legend={legend} width={600} />}
    />
  );
};

export default Chart3;
