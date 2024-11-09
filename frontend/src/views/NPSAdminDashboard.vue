<!-- AdminDashboard.vue -->
<template>
    <div class="admin-panel">
      <h2>Admin Panel - Manage Fire Incident Reports</h2>
      
      <!-- Incident Reports Table -->
      <table class="incident-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Category</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="report in paginatedReports" :key="report.id">
            <td>{{ report.id }}</td>
            <td>{{ report.category }}</td>
            <td>{{ report.status }}</td>
            <td>
              <button @click="openAssignModal(report)">Assign Responder</button>
              <button @click="openDisapproveModal(report)">Disapprove</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Assign Responder Modal -->
      <div v-if="showAssignModal" class="modal">
        <div class="modal-content">
          <h3>Assign Responder</h3>
          <label for="responder">Select Responder:</label>
          <select v-model="selectedResponderId">
            <option v-for="responder in responders" :key="responder.id" :value="responder.id">
              {{ responder.name }} - {{ responder.role }}
            </option>
          </select>
          <button @click="assignResponder">Assign</button>
          <button @click="closeAssignModal">Cancel</button>
        </div>
      </div>
  
      <!-- Disapprove Incident Modal -->
      <div v-if="showDisapproveModal" class="modal">
        <div class="modal-content">
          <h3>Disapprove Incident</h3>
          <label for="reason">Select Reason:</label>
          <select v-model="disapprovalReason">
            <option value="Insufficient Information">Insufficient Information</option>
            <option value="Unrelated Incident">Unrelated Incident</option>
          </select>
          <button @click="disapproveReport">Disapprove</button>
          <button @click="closeDisapproveModal">Cancel</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        reports: [],
        responders: [], // List of available responders
        showAssignModal: false,
        showDisapproveModal: false,
        selectedReport: null,
        selectedResponderId: '',
        disapprovalReason: '',
      };
    },
    methods: {
      // Fetch all responders
      async fetchResponders() {
        const response = await fetch("http://localhost:3000/api/responders");
        const result = await response.json();
        this.responders = result.data;
      },
      
      // Fetch all incident reports
      async fetchReports() {
        const response = await fetch("http://localhost:3000/api/fire_incidents");
        const result = await response.json();
        this.reports = result.data;
      },
  
      // Open the assign modal with the selected report's data
      openAssignModal(report) {
        this.selectedReport = report;
        this.showAssignModal = true;
      },
  
      // Assign responder to the selected report
      async assignResponder() {
        try {
          const response = await fetch(`http://localhost:3000/api/fire_incidents/${this.selectedReport.id}/assign`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ responderId: this.selectedResponderId }),
          });
          const result = await response.json();
          if (response.ok) {
            alert("Responder assigned successfully.");
            this.showAssignModal = false;
            this.fetchReports();
          } else {
            alert(result.message || "Failed to assign responder.");
          }
        } catch (error) {
          console.error("Error assigning responder:", error);
          alert("Failed to assign responder. Please try again.");
        }
      },
  
      // Open the disapprove modal with the selected report's data
      openDisapproveModal(report) {
        this.selectedReport = report;
        this.showDisapproveModal = true;
      },
  
      // Disapprove the selected report
      async disapproveReport() {
        try {
          const response = await fetch(`http://localhost:3000/api/fire_incidents/${this.selectedReport.id}/disapprove`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ reason: this.disapprovalReason }),
          });
          const result = await response.json();
          if (response.ok) {
            alert("Incident disapproved successfully.");
            this.showDisapproveModal = false;
            this.fetchReports();
          } else {
            alert(result.message || "Failed to disapprove incident.");
          }
        } catch (error) {
          console.error("Error disapproving incident:", error);
          alert("Failed to disapprove incident. Please try again.");
        }
      },
  
      // Close the assign modal
      closeAssignModal() {
        this.showAssignModal = false;
        this.selectedResponderId = '';
      },
  
      // Close the disapprove modal
      closeDisapproveModal() {
        this.showDisapproveModal = false;
        this.disapprovalReason = '';
      },
    },
  
    mounted() {
      this.fetchReports();
      this.fetchResponders(); // Load available responders
    }
  };
  </script>
  
  <style scoped>
  .admin-panel {
    max-width: 1000px;
    margin: auto;
    padding: 20px;
  }
  .modal {
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 300px;
  }
  </style>
  