<template>
    <div class="trend-analysis">
      <h3>Trend Analysis</h3>
      <BarChart :chartData="chartData" />
    </div>
  </template>
  
  <script>
  import { Bar } from 'vue-chartjs';
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
  
  export default {
    props: {
      data: Object
    },
    computed: {
      chartData() {
        return {
          labels: Object.keys(this.data),
          datasets: [
            {
              label: 'Incidents',
              backgroundColor: '#f87979',
              data: Object.values(this.data)
            }
          ]
        };
      }
    },
    components: {
      BarChart: Bar
    }
  };
  </script>
  