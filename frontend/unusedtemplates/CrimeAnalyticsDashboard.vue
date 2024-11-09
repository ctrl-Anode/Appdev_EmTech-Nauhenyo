<template>
    <div class="analytics-dashboard">
      <h2>Crime Analytics Dashboard</h2>
  
      <!-- Incident Metrics Section -->
      <section class="section">
        <h3>Incident Metrics</h3>
        <div>
          <p>Total Incidents: {{ incidentMetrics.totalIncidents }}</p>
          <ul>
            <li v-for="(count, type) in incidentMetrics.byType" :key="type">
              {{ type }}: {{ count }}
            </li>
          </ul>
        </div>
      </section>
  
      <!-- Trend Analysis Section -->
      <section class="section">
        <h3>Trend Analysis</h3>
        <canvas id="trendChart"></canvas>
      </section>
  
      <!-- Custom Report Section -->
      <section class="section">
        <h3>Generate Custom Report</h3>
        <form @submit.prevent="generateCustomReport">
          <label>
            Select Incident Type:
            <select v-model="reportCriteria.type">
              <option value="all">All</option>
              <option value="robbery">Robbery</option>
              <option value="fire">Fire</option>
              <!-- Add other types as needed -->
            </select>
          </label>
          <label>
            Select Date Range:
            <input type="date" v-model="reportCriteria.startDate" />
            <input type="date" v-model="reportCriteria.endDate" />
          </label>
          <button type="submit">Generate Report</button>
        </form>
  
        <!-- Display Custom Report Data -->
        <div v-if="customReportData?.length">
          <h4>Custom Report Results</h4>
          <ul>
            <li v-for="report in customReportData" :key="report.id">
              {{ report.category }} - {{ report.date }} - {{ report.location }}
            </li>
          </ul>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  import Chart from 'chart.js/auto';
  
  export default {
    data() {
      return {
        incidentMetrics: { totalIncidents: 0, byType: {} },
        trendAnalysisData: [],
        customReportData: [], // Ensure this is defined as an empty array
        reportCriteria: { type: "all", startDate: "", endDate: "" }
      };
    },
    methods: {
      async fetchAnalyticsData() {
        try {
          const metricsResponse = await fetch("http://localhost:3000/api/analytics/incident-metrics");
          const metrics = await metricsResponse.json();
          this.incidentMetrics = metrics.data;
  
          const trendResponse = await fetch("http://localhost:3000/api/analytics/trend-analysis?startDate=2023-01-01&endDate=2023-12-31");
          const trendData = await trendResponse.json();
          this.trendAnalysisData = trendData.data;
  
          this.renderTrendChart();
        } catch (error) {
          console.error("Error fetching analytics data:", error);
        }
      },
      async generateCustomReport() {
        try {
          const response = await fetch("http://localhost:3000/api/analytics/custom-report", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(this.reportCriteria)
          });
          const report = await response.json();
          this.customReportData = report.data;
        } catch (error) {
          console.error("Error generating custom report:", error);
        }
      },
      renderTrendChart() {
        const ctx = document.getElementById("trendChart").getContext("2d");
        new Chart(ctx, {
          type: "line",
          data: {
            labels: this.trendAnalysisData.map(data => data.month),
            datasets: [{
              label: "Incidents",
              data: this.trendAnalysisData.map(data => data.count),
              fill: false,
              borderColor: "rgba(75, 192, 192, 1)",
              tension: 0.1
            }]
          },
          options: {
            responsive: true,
            scales: {
              x: { title: { display: true, text: "Month" } },
              y: { title: { display: true, text: "Incidents" } }
            }
          }
        });
      }
    },
    mounted() {
      this.fetchAnalyticsData();
    }
  };
  </script>
  
  <style scoped>
  .analytics-dashboard {
    max-width: 800px;
    margin: auto;
  }
  .section {
    margin-bottom: 2rem;
  }
  .section h3 {
    margin-bottom: 1rem;
  }
  </style>
  