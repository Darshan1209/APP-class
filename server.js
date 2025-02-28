const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to parse JSON data
app.use(express.json());

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Route to handle form submission
app.post('/submit-form', (req, res) => {
  const formData = req.body;
  console.log('Form data received:', formData);

  const filePath = path.join(__dirname, 'data.json');
  console.log('File path:', filePath);

  let data = [];
  if (fs.existsSync(filePath)) {
    console.log('File exists. Reading file...');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    console.log('Existing file content:', fileContent);
    try {
      data = JSON.parse(fileContent);
      console.log('Parsed data:', data);
    } catch (error) {
      console.error('Error parsing JSON:', error);
      return res.status(500).json({ message: 'Error parsing JSON file' });
    }
  } else {
    console.log('File does not exist. Creating new file...');
  }

  data.push(formData);
  console.log('Updated data:', data);

  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log('Data saved to file.');
    res.json({ message: 'Form data saved successfully!' });
  } catch (error) {
    console.error('Error writing to file:', error);
    res.status(500).json({ message: 'Error saving form data' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});