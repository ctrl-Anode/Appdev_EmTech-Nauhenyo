<template>
  <div class="custom-report">
    <h3>Generate Custom Report</h3>
    <form @submit.prevent="generateReport">
      <label>Type:</label>
      <input type="text" v-model="criteria.type" />
      <label>Date Range:</label>
      <input type="date" v-model="criteria.startDate" />
      <input type="date" v-model="criteria.endDate" />
      <button type="submit">Generate Report</button>
    </form>
    <div v-if="data.length">
      <h4>Custom Report Results:</h4>
      <ul>
        <li v-for="report in data" :key="report.id">{{ report.type }} - {{ report.date }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Array
  },
  data() {
    return {
      criteria: {
        type: '',
        startDate: '',
        endDate: ''
      }
    };
  },
  methods: {
    generateReport() {
      this.$emit("generate", this.criteria);
    }
  }
};
</script>
