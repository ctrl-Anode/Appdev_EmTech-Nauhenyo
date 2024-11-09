const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const serviceAccount = require('./firebaseServiceAccount.json');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid'); // For unique file names
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Create Admin User
app.post('/api/admins', async (req, res) => {
  try {
    const data = req.body;
    const docRef = await db.collection('admins').add(data);
    res.status(201).send({ id: docRef.id });
  } catch (error) {
    res.status(500).send({ error: 'Failed to create admin' });
  }
});

// Read All Admin Users
app.get('/api/admins', async (req, res) => {
  try {
    const snapshot = await db.collection('admins').get();
    const admins = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.send(admins);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch admins' });
  }
});

// Update Admin User
app.put('/api/admins/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    await db.collection('admins').doc(id).update(data);
    res.send({ message: 'Admin updated successfully' });
  } catch (error) {
    res.status(500).send({ error: 'Failed to update admin' });
  }
});

// Delete Admin User
app.delete('/api/admins/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await db.collection('admins').doc(id).delete();
    res.send({ message: 'Admin deleted successfully' });
  } catch (error) {
    res.status(500).send({ error: 'Failed to delete admin' });
  }
});

// Admin Login
app.post('/api/admins/login', async (req, res) => {
  try {
    const { department, admin_username, admin_password } = req.body;
    const adminsRef = db.collection('admins');
    const querySnapshot = await adminsRef
      .where('department', '==', department)
      .where('admin_username', '==', admin_username)
      .where('admin_password', '==', admin_password)
      .get();

    if (!querySnapshot.empty) {
      const adminData = querySnapshot.docs[0].data();
      // Send admin data in response for storing in frontend
      res.send({
        success: true,
        message: 'Login successful',
        admin: {
          admin_first_name: adminData.admin_first_name,
          admin_middle_name: adminData.admin_middle_name,
          admin_last_name: adminData.admin_last_name,
          department: adminData.department,
        },
      });
    } else {
      res.send({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send({ success: false, message: 'Login failed' });
  }
});


  // Create User (Sign-Up)
app.post('/api/users', async (req, res) => {
    try {
      const newUser = req.body;
      const docRef = await db.collection('users').add(newUser);
      res.status(201).json({ id: docRef.id });
    } catch (error) {
      console.error('Error adding user:', error);
      res.status(500).send('Error adding user');
    }
  });
  
  // Read Users
  app.get('/api/users', async (req, res) => {
    try {
      const snapshot = await db.collection('users').get();
      const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.json(users);
    } catch (error) {
      console.error('Error getting users:', error);
      res.status(500).send('Error getting users');
    }
  });
  
  // Update User
  app.put('/api/users/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const updatedUser = req.body;
      await db.collection('users').doc(id).update(updatedUser);
      res.status(200).send('User updated successfully');
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).send('Error updating user');
    }
  });
  
  // Delete User
  app.delete('/api/users/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await db.collection('users').doc(id).delete();
      res.status(200).send('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).send('Error deleting user');
    }
  });
/*
// Admin Login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const usersRef = db.collection('users');
    const querySnapshot = await usersRef
      .where('email', '==', email)
      .where('password', '==', password) // Assume plain text passwords; use hashing in production
      .get();

    if (!querySnapshot.empty) {
      res.send({ success: true, message: 'Login successful' });
    } else {
      res.send({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send({ success: false, message: 'Login failed' });
  }
});*/

// Route to Create an Incident Report
app.post('/api/incidents', async (req, res) => {
  try {
    const incidentData = req.body;
    const reportRef = await db.collection('incidents').add({
      ...incidentData,
      status: 'Pending Review', // Default status
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
app.put('/api/incidents/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // New status from the request body
    await db.collection('incidents').doc(id).update({ status });
    res.status(200).send({ success: true, message: 'Incident status updated successfully' });
  } catch (error) {
    console.error('Error updating incident status:', error);
    res.status(500).send({ success: false, message: 'Failed to update incident status' });
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

// Create a Fire Incident Report (POST)
app.post('/api/fire_incidents', async (req, res) => {
  try {
    const { category, subCategory, location, date, time, details } = req.body;

    // Assign default status to "Pending Review" if not specified
    const status = req.body.status || 'Pending Review';

    // Save the incident report to Firestore
    const reportRef = await db.collection('fire_incidents').add({
      category,
      subCategory,
      location,
      date,
      time,
      details,
      status,
      timestamp: new Date().toISOString(),
    });

    res.status(201).send({ success: true, id: reportRef.id });
  } catch (error) {
    console.error('Error creating fire incident report:', error);
    res.status(500).send({ success: false, message: 'Failed to create fire incident report' });
  }
});

// Read All Fire Incident Reports (GET)
app.get('/api/fire_incidents', async (req, res) => {
  try {
    const snapshot = await db.collection('fire_incidents').get();
    const incidents = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).send({ success: true, data: incidents });
  } catch (error) {
    console.error('Error reading fire incidents:', error);
    res.status(500).send({ success: false, message: 'Failed to read fire incidents' });
  }
});

// Update a Fire Incident Report (PUT)
app.put('/api/fire_incidents/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, category, subCategory, location, date, time, details } = req.body;

    // Update the report with the provided fields
    await db.collection('fire_incidents').doc(id).update({
      ...(status && { status }),
      ...(category && { category }),
      ...(subCategory && { subCategory }),
      ...(location && { location }),
      ...(date && { date }),
      ...(time && { time }),
      ...(details && { details }),
    });

    res.status(200).send({ success: true, message: 'Fire incident updated successfully' });
  } catch (error) {
    console.error('Error updating fire incident:', error);
    res.status(500).send({ success: false, message: 'Failed to update fire incident' });
  }
});

// Delete a Fire Incident Report (DELETE)
app.delete('/api/fire_incidents/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection('fire_incidents').doc(id).delete();
    res.status(200).send({ success: true, message: 'Fire incident deleted successfully' });
  } catch (error) {
    console.error('Error deleting fire incident:', error);
    res.status(500).send({ success: false, message: 'Failed to delete fire incident' });
  }
});

/*
// Create a Fire Incident Report (POST)
app.post('/api/fire_incidents', async (req, res) => {
  try {
    const { category, subCategory, location, date, time, details } = req.body;

    // Save the incident report to Firestore
    const reportRef = await db.collection('fire_incidents').add({
      category,
      subCategory,
      location,
      date,
      time,
      details,
      timestamp: new Date().toISOString(),
    });

    res.status(201).send({ success: true, id: reportRef.id });
  } catch (error) {
    console.error('Error creating fire incident report:', error);
    res.status(500).send({ success: false, message: 'Failed to create fire incident report' });
  }
});

// Read All Fire Incident Reports (GET)
app.get('/api/fire_incidents', async (req, res) => {
  try {
    const snapshot = await db.collection('fire_incidents').get();
    const incidents = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).send({ success: true, data: incidents });
  } catch (error) {
    console.error('Error reading fire incidents:', error);
    res.status(500).send({ success: false, message: 'Failed to read fire incidents' });
  }
});

// Update a Fire Incident Report (PUT)
app.put('/api/fire_incidents/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    await db.collection('fire_incidents').doc(id).update(updatedData);
    res.status(200).send({ success: true, message: 'Fire incident updated successfully' });
  } catch (error) {
    console.error('Error updating fire incident:', error);
    res.status(500).send({ success: false, message: 'Failed to update fire incident' });
  }
});

// Delete a Fire Incident Report (DELETE)
app.delete('/api/fire_incidents/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection('fire_incidents').doc(id).delete();
    res.status(200).send({ success: true, message: 'Fire incident deleted successfully' });
  } catch (error) {
    console.error('Error deleting fire incident:', error);
    res.status(500).send({ success: false, message: 'Failed to delete fire incident' });
  }
});
/*/
// User Login (Email and Password)
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const usersRef = db.collection('users');
    const snapshot = await usersRef.where('email', '==', email).where('password', '==', password).get();

    if (!snapshot.empty) {
      const user = snapshot.docs[0].data();
      res.status(200).json({ success: true, message: 'Login successful', user });
    } else {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).send('Error logging in');
  }
});


// Endpoint to fetch incident metrics by category
app.get('/api/analytics/incident-metrics', async (req, res) => {
  try {
    const snapshot = await db.collection('incidents').get();
    const incidentTypes = {};

    snapshot.forEach((doc) => {
      const data = doc.data();
      incidentTypes[data.type] = (incidentTypes[data.type] || 0) + 1;
    });

    res.status(200).json({ success: true, data: incidentTypes });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch incident metrics' });
  }
});

// Endpoint for trend analysis by date range
app.get('/api/analytics/trend-analysis', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const snapshot = await db.collection('incidents')
      .where('date', '>=', startDate)
      .where('date', '<=', endDate)
      .get();

    const monthlyTrends = {};

    snapshot.forEach((doc) => {
      const date = new Date(doc.data().date);
      const yearMonth = `${date.getFullYear()}-${date.getMonth() + 1}`;
      monthlyTrends[yearMonth] = (monthlyTrends[yearMonth] || 0) + 1;
    });

    res.status(200).json({ success: true, data: monthlyTrends });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch trend analysis data' });
  }
});

// Endpoint for generating custom reports based on criteria
app.post('/api/analytics/custom-report', async (req, res) => {
  try {
    const { type, startDate, endDate } = req.body;
    let query = db.collection('incidents');
    if (type) query = query.where('type', '==', type);
    if (startDate && endDate) query = query.where('date', '>=', startDate).where('date', '<=', endDate);

    const snapshot = await query.get();
    const reports = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    res.status(200).json({ success: true, data: reports });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to generate custom report' });
  }
});

// Endpoint to assign a responder to an incident
app.put('/api/fire_incidents/:id/assign', async (req, res) => {
  try {
    const { id } = req.params;
    const { responderId } = req.body; // Responder ID from the request body

    // Fetch responder data
    const responderDoc = await db.collection('responders').doc(responderId).get();
    if (!responderDoc.exists) {
      return res.status(404).send({ success: false, message: 'Responder not found' });
    }

    // Update incident with responder info
    await db.collection('fire_incidents').doc(id).update({
      responderId,
      status: 'Assigned',
      responder: responderDoc.data(),
    });

    res.status(200).send({ success: true, message: 'Responder assigned successfully' });
  } catch (error) {
    console.error('Error assigning responder:', error);
    res.status(500).send({ success: false, message: 'Failed to assign responder' });
  }
});

// Endpoint to disapprove an incident with a reason
app.put('/api/fire_incidents/:id/disapprove', async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body; // Disapproval reason from the request body

    // Update incident with disapproval reason and status
    await db.collection('fire_incidents').doc(id).update({
      status: 'Disapproved',
      disapprovalReason: reason,
    });

    res.status(200).send({ success: true, message: 'Incident disapproved successfully' });
  } catch (error) {
    console.error('Error disapproving incident:', error);
    res.status(500).send({ success: false, message: 'Failed to disapprove incident' });
  }
});

  const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

