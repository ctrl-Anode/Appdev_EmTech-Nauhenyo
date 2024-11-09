const admin = require('firebase-admin');
const fs = require('fs');
const serviceAccount = require('./firebaseServiceAccount.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function exportData() {
  const snapshot = await db.collection('users').get();
  const data = [];

  snapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });

  // Convert to CSV format
  const headers = Object.keys(data[0]);
  const rows = data.map(row => headers.map(header => row[header]).join(','));

  // Save as TXT or CSV
  const content = [headers.join(','), ...rows].join('\n');
  fs.writeFileSync('users.csv', content); // Save as CSV
  fs.writeFileSync('users.txt', JSON.stringify(data, null, 2)); // Save as TXT with JSON format
  console.log("Data exported successfully.");
}

exportData().catch(console.error);
