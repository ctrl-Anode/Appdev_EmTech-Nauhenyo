<template>
  <div class="incident-metrics">
    <h3>Incident Metrics</h3>
    <div v-for="(count, type) in data" :key="type">
      {{ type }}: {{ count }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Object
  }
};
</script>
