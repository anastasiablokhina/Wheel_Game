import React, { useContext, useLayoutEffect, useRef, useState } from 'react'
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { pieColors, createPieSegments, valueGenerator } from '../utils'
import { AppContext } from './AppContext';
import boomMusic from '../assets/music/boom.mp3';
import spinMusic from '../assets/music/spin.mp3';

const PieChart = ({ nums }) => {
  const wheelRef = useRef(null);
  const [myChart, setMyChart] = useState(null);
  const { spinning, setSpinning, setValue } = useContext(AppContext);
  const [rotationValues, setRotationValues] = useState([]);
  const audioRef0 = useRef(null);
  const audioRef1 = useRef(null);

  useLayoutEffect(() => {
    if (nums.length > 0  && wheelRef.current) {
      const colors = pieColors(nums);
      const backgroundColors = colors.map(color => color.baseColor);
      const textColors = colors.map(color => color.textColor);
      const rotationValues = createPieSegments(nums);
      setRotationValues(rotationValues);

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

  const handleSpin = () => {
    setSpinning(true)
    audioRef0.current.currentTime = 0;
    audioRef0.current.play();
    audioRef0.current.addEventListener('ended', () => {
      audioRef1.current.currentTime = 0;
      audioRef1.current.play();
      audioRef1.current.addEventListener('canplaythrough', () => {
        let currentRotation = myChart.options.rotation % 360;
        let randomDegree = Math.floor(Math.random() *(360 - 0 + 1) + 0);
        let totalRotation = 360 * (39 - nums.length) + randomDegree;
    
        myChart.options.animation = {
          duration: 43000,
          easing: 'easeOutCirc',
          onComplete: () => {
            setSpinning(false)
            setValue(valueGenerator(randomDegree, rotationValues))
            audioRef1.current.pause()
          },
        };
        myChart.options.rotation = myChart.options.rotation - currentRotation + totalRotation;
        myChart.update();    
      }, { once: true });
    }, { once: true });
  }

  return (
    <div className="wheel__container">
      <canvas ref={wheelRef} /> 
      <button className="wheel__spin" onClick={handleSpin} disabled={spinning}></button>
      <span className="wheel__arrow"></span>
      <audio ref={audioRef0}>
        <source src={boomMusic} type="audio/mpeg" />
      </audio>
      <audio ref={audioRef1} loop>
        <source src={spinMusic} type="audio/mpeg" />
      </audio>
    </div>
  )
}

export default PieChart