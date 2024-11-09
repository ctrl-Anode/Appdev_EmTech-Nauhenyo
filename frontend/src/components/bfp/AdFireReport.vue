<template>
  <div class="admin-panel">
    <h2>Admin Panel - Manage Fire Incident Reports</h2>

    <!-- Search and Sort Controls -->
    <div class="controls">
      <input type="text" v-model="searchQuery" placeholder="Search by category, location, or status" />
      <label for="sortStatus">Sort by Status:</label>
      <select v-model="sortStatus" id="sortStatus">
        <option value="">All</option>
        <option value="Pending Review">Pending Review</option>
        <option value="Under Review">Under Review</option>
        <option value="Approved">Approved</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
    </div>

    <!-- Incident Reports Table -->
    <table class="incident-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Category</th>
          <th>Sub-category</th>
          <th>Location</th>
          <th>Date</th>
          <th>Time</th>
          <th>Details</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="report in paginatedReports" :key="report.id">
          <td>{{ report.id }}</td>
          <td>{{ report.category }}</td>
          <td>{{ report.subCategory }}</td>
          <td>{{ report.location }}</td>
          <td>{{ report.date }}</td>
          <td>{{ report.time }}</td>
          <td>{{ report.details }}</td>
          <td>{{ report.status }}</td>
          <td>
            <button @click="openEditModal(report)">Edit</button>
            <button @click="deleteReport(report.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination Controls -->
    <div class="pagination">
      <button @click="previousPage" :disabled="currentPage === 1">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>

    <!-- Edit Report Modal -->
    <div v-if="showEditModal" class="modal">
      <div class="modal-content">
        <h3>Edit Fire Incident Report</h3>
        <form @submit.prevent="updateReport">
          <label for="category">Category</label>
          <input type="text" v-model="selectedReport.category" required />

          <label for="subCategory">Sub-category</label>
          <input type="text" v-model="selectedReport.subCategory" required />

          <label for="location">Location</label>
          <input type="text" v-model="selectedReport.location" required />

          <label for="date">Date</label>
          <input type="date" v-model="selectedReport.date" required />

          <label for="time">Time</label>
          <input type="time" v-model="selectedReport.time" required />

          <label for="details">Details</label>
          <textarea v-model="selectedReport.details"></textarea>

          <!-- Status Dropdown for Admin to Update -->
          <label for="status">Status</label>
          <select v-model="selectedReport.status" required>
            <option value="Pending Review">Pending Review</option>
            <option value="Under Review">Under Review</option>
            <option value="Approved">Approved</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          <button type="submit">Save Changes</button>
          <button type="button" @click="closeEditModal">Cancel</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      reports: [], // List of reports from the server
      showEditModal: false, // Modal visibility control
      selectedReport: null, // Currently selected report
      searchQuery: '', // Search input
      sortStatus: '', // Selected status for sorting
      currentPage: 1, // Current page in pagination
      itemsPerPage: 5 // Items per page for pagination
    };
  },
  computed: {
    // Filtered, sorted, and searched reports
    filteredReports() {
      const searchLower = this.searchQuery.toLowerCase();
      return this.reports
        .filter((report) => {
          // Ensure properties exist before applying toLowerCase
          const categoryMatch = report.category ? report.category.toLowerCase().includes(searchLower) : false;
          const subCategoryMatch = report.subCategory ? report.subCategory.toLowerCase().includes(searchLower) : false;
          const locationMatch = report.location ? report.location.toLowerCase().includes(searchLower) : false;
          const statusMatch = report.status ? report.status.toLowerCase().includes(searchLower) : false;

          return (categoryMatch || subCategoryMatch || locationMatch || statusMatch) &&
                 (this.sortStatus === '' || report.status === this.sortStatus);
        });
    },
    // Total number of pages
    totalPages() {
      return Math.ceil(this.filteredReports.length / this.itemsPerPage);
    },
    // Paginated reports
    paginatedReports() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredReports.slice(start, end);
    }
  },
  methods: {
    // Fetch all incident reports
    async fetchReports() {
      try {
        const response = await fetch("http://localhost:3000/api/fire_incidents");
        const result = await response.json();
        if (response.ok) {
          this.reports = result.data;
        } else {
          alert(result.message || "Failed to fetch reports.");
        }
      } catch (error) {
        console.error("Error fetching reports:", error);
        alert("Failed to fetch reports. Please try again.");
      }
    },
    // Open the edit modal with the selected report's data
    openEditModal(report) {
      this.selectedReport = { ...report };
      this.showEditModal = true;
    },
    // Close the edit modal
    closeEditModal() {
      this.showEditModal = false;
      this.selectedReport = null;
    },
    // Update a specific report
    async updateReport() {
      try {
        const response = await fetch(`http://localhost:3000/api/fire_incidents/${this.selectedReport.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.selectedReport),
        });
        const result = await response.json();
        if (response.ok) {
          alert("Report updated successfully.");
          this.showEditModal = false;
          this.fetchReports();
        } else {
          alert(result.message || "Failed to update report.");
        }
      } catch (error) {
        console.error("Error updating report:", error);
        alert("Failed to update report. Please try again.");
      }
    },
    // Delete a specific report
    async deleteReport(id) {
      if (!confirm("Are you sure you want to delete this report?")) return;
      try {
        const response = await fetch(`http://localhost:3000/api/fire_incidents/${id}`, {
          method: "DELETE",
        });
        const result = await response.json();
        if (response.ok) {
          alert("Report deleted successfully.");
          this.fetchReports();
        } else {
          alert(result.message || "Failed to delete report.");
        }
      } catch (error) {
        console.error("Error deleting report:", error);
        alert("Failed to delete report. Please try again.");
      }
    },
    // Pagination controls
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },
    previousPage() {
      if (this.currentPage > 1) this.currentPage--;
    }
  },
  mounted() {
    this.fetchReports();
  }
};
</script>

<style scoped>
.admin-panel {
  max-width: 1000px;
  margin: auto;
  padding: 20px;
}
.controls {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.incident-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}
.incident-table th, .incident-table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}
button {
  margin-right: 5px;
  padding: 5px 10px;
  cursor: pointer;
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
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
