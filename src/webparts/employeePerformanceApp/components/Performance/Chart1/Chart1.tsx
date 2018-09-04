import * as React from 'react';
import { IChart1Props } from './IChart1Props';
import ChartComponent from '../../Common/ChartComponent';
import { Doughnut } from 'react-chartjs-2';
import { Chart } from 'react-chartjs-2/lib';
import styles from './styles.module.scss';
import { groupByProperty } from '../../../utils';

const Chart1: React.StatelessComponent<IChart1Props> = props => {
  const { performanceSkills, usersCount } = props;

  const legend = { display: false };

  const performanceSkillsByEmployee = groupByProperty(
    performanceSkills,
    'userPrincipalName',
  );
  const completedPercent =
    (performanceSkillsByEmployee.length * 100) / usersCount;

  const data = {
    labels: ['Pending', 'Completed'],
    datasets: [
      {
        data: [
          usersCount - performanceSkillsByEmployee.length,
          performanceSkillsByEmployee.length,
        ],
        backgroundColor: [styles.primaryColorAlpha, styles.primaryColor],
        hoverBackgroundColor: [styles.primaryColorAlpha, styles.primaryColor],
      },
    ],
  };

  // This is need to display the completed percentage on the center of the doughnut chart
  const originalDoughnutDraw = Chart.controllers.doughnut.prototype.draw;
  Chart.helpers.extend(Chart.controllers.doughnut.prototype, {
    draw() {
      originalDoughnutDraw.apply(this, arguments);

      const chart = this.chart;
      const width = chart.chart.width;
      const height = chart.chart.height;
      const ctx = chart.chart.ctx;

      const fontSize = (height / 100).toFixed(2) + 'em';
      const fontFamily =
        'Segoe UI WestEuropean,Segoe UI,Roboto,Helvetica Neue,sans-serif';
      ctx.font = `${fontSize} ${fontFamily}`;
      ctx.textBaseline = 'middle';

      const text = completedPercent + '%';
      const textX = Math.round((width - ctx.measureText(text).width) / 2);
      const textY = height / 2;

      ctx.fillText(text, textX, textY);
    },
  });

  return (
    <ChartComponent
      title="Performance Evaluation Completion"
      chart={<Doughnut data={data} legend={legend} />}
    />
  );
};

export default Chart1;
