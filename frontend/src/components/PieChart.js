import React, { useLayoutEffect, useRef, useState } from 'react'
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { pieColors } from '../utils'

const PieChart = ({ nums }) => {
  const wheelRef = useRef(null);
  const [myChart, setMyChart] = useState(null);

  useLayoutEffect(() => {
    if (nums.length > 0  && wheelRef.current) {
      const colors = pieColors(nums);
      const backgroundColors = colors.map(color => color.baseColor);
      const textColors = colors.map(color => color.textColor);

      const myChart = new Chart(wheelRef.current, {
        plugins: [ChartDataLabels],
        type: 'pie',
        data: {
          labels: nums,
          datasets: [
            {
              backgroundColor: backgroundColors,
              borderWidth: 0,
              data: new Array(nums.length).fill(16),
            },
          ],
        },
        options: {
          responsive: true,
          animation: { duration: 0 },
          plugins: {
            tooltip: false,
            legend: {
              display: false,
            },
            datalabels: {
              anchor: 'end',
              align: 'start',
              color: (context) => textColors[context.dataIndex], 
              formatter: (_, context) => context.chart.data.labels[context.dataIndex],
              font: { 
                family: "Rubik Mono One",
                size: 24 },
            },
          },
          rotation: 0,
        },
      });

      setMyChart(myChart);

      return () => {
        myChart.destroy();
      };
    }
  },[nums])

  return (
    <div className="wheel__container">
      <canvas ref={wheelRef} /> 
    </div>
  )
}

export default PieChart