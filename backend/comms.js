const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');

// Initialize Firebase Admin SDK
const serviceAccount = require('./firebaseServiceAccount.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // Uncomment the following line if you want Firestore to ignore undefined properties globally
  // firestore: { ignoreUndefinedProperties: true },
});

const db = admin.firestore();
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Route to Create an Incident Report
app.post('/api/incidents', async (req, res) => {
  try {
    const incidentData = req.body;
    const reportRef = await db.collection('incidents').add({
      ...incidentData,
      timestamp: new Date().toISOString(),
    });
    res.status(201).send({ success: true, id: reportRef.id });
  } catch (error) {
    console.error('Error creating incident:', error);
    res.status(500).send({ success: false, message: 'Failed to create incident' });
  }
});

// Route to Read All Incident Reports
app.get('/api/incidents', async (req, res) => {
  try {
    const snapshot = await db.collection('incidents').get();
    const incidents = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).send({ success: true, data: incidents });
  } catch (error) {
    console.error('Error reading incidents:', error);
    res.status(500).send({ success: false, message: 'Failed to read incidents' });
  }
});

// Route to Update an Incident Report
app.put('/api/incidents/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    await db.collection('incidents').doc(id).update(updatedData);
    res.status(200).send({ success: true, message: 'Incident updated successfully' });
  } catch (error) {
    console.error('Error updating incident:', error);
    res.status(500).send({ success: false, message: 'Failed to update incident' });
  }
});

// Route to Delete an Incident Report
app.delete('/api/incidents/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection('incidents').doc(id).delete();
    res.status(200).send({ success: true, message: 'Incident deleted successfully' });
  } catch (error) {
    console.error('Error deleting incident:', error);
    res.status(500).send({ success: false, message: 'Failed to delete incident' });
  }
});

// Route to Send Notification to Responder
app.post('/api/notifications', async (req, res) => {
  try {
    const { adminId, responderId, message, urgency, instructions } = req.body;

    // Build the notification data object, excluding undefined fields
    const notificationData = {
      adminId,
      responderId,
      message,
      urgency,
      acknowledged: false,
      timestamp: new Date().toISOString(),
    };

    // Only add "instructions" if it is defined
    if (instructions !== undefined) {
      notificationData.instructions = instructions;
    }

    // Add notification to Firestore
    const notificationRef = await db.collection('notifications').add(notificationData);
    res.status(201).send({ success: true, id: notificationRef.id });
  } catch (error) {
    console.error('Error sending notification:', error);
    res.status(500).send({ success: false, message: 'Failed to send notification' });
  }
});

// Route for Responder Acknowledgment
app.put('/api/notifications/:id/acknowledge', async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection('notifications').doc(id).update({ acknowledged: true });
    res.status(200).send({ success: true, message: 'Acknowledgment recorded successfully' });
  } catch (error) {
    console.error('Error acknowledging notification:', error);
    res.status(500).send({ success: false, message: 'Failed to acknowledge notification' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
