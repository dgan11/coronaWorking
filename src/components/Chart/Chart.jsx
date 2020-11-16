import React, { useState, useEffect } from 'react'; //import react and the hooks
import { fetchDailyData } from '../../api'; //import the fetchDailyData function from api/index.js
import { Line, Bar } from 'react-chartjs-2'; // import line and bar chart

import styles from './Chart.module.css'
import { red } from '@material-ui/core/colors';

const Chart = ({ data: { confirmed, deaths, recovered}, country}) => {

  // Create a state, dailyData that is an object
  const [dailyData, setDailyData] = useState([]);

  // useEffect method -- tell react that this component needs to do something after render
  useEffect(() => {
    // Di this in a seperate function bc async useEffect can cause data race issues
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData());
    }

    ////console.log("DAILY DATA in CHART.js",dailyData);

    // Call the function to get the daily data and set state dailyData with the full data
    fetchAPI();
  }, []); // only happens once

  // --- WE HAVE 2 DIFFERENT CHARTS so seperate ----
  //1. Line Chart
  const lineChart = (
    dailyData.length
      ? (
        <Line
          data={{
            labels: dailyData.map(({date}) => date),
            datasets: [{
              data: dailyData.map(({ confirmed }) => confirmed),
              label: 'Infected',
              borderColor: '#3333FF',
              backgroundColor: 'rgba(0, 0, 255, 0.3)',
              fill: true,
            }, {
              data: dailyData.map(({ deaths }) => deaths),
              label: 'Deaths',
              borderColor: 'rgba(255, 0, 0, 0.8)',
              backgroundColor: 'rgba(255, 0, 0, 0.3)',
              fill: true,
          }]
      }}
    />) : null
  );

  console.log(confirmed, recovered, deaths);

  //2. Bar Chart
  const barChart = (
    confirmed // data.confirmed but destructured
      ? (
        <Bar
          data={{
            labels: ['Infected', 'Recovered', 'Deaths'],
            datasets: [{
              label: 'People',
              backgroundColor: [
                'rgba(0,0,255,0.5)',
                'rgba(0,255,0,0.5)',
                'rgba(255,0,0,0.5)',
              ],
              data:[confirmed.value, recovered.value, deaths.value]
            }]
          }}
          options={{
            legend: { display: false },
            title: {display: true, text:`Current state in ${country}`},
          }}
        />
      ) : null
  )


  return (
    <div className={styles.container}>
      {country ? barChart : lineChart }
    </div>
  )
}

export default Chart;