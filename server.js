const express = require('express');
const fs = require('fs');
const path = require('path');
const exphbs = require('express-handlebars'); // Import Handlebars

const app = express();
const port = 3000;

// Configure Handlebars as the view engine
app.engine('hbs', exphbs.engine({ extname: 'hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views')); // Ensure your .hbs files are inside a 'views' folder

// Middleware to parse JSON data
app.use(express.json());

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Define route for the homepage
app.get('/', (req, res) => {
  res.render('index'); // This will render "views/index.hbs"
});

// Route to handle form submission
app.post('/submit-form', (req, res) => {
  const formData = req.body;
  console.log('Form data received:', formData);

  const filePath = path.join(__dirname, 'data.json');

  let data = [];
  if (fs.existsSync(filePath)) {
    try {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      data = JSON.parse(fileContent);
    } catch (error) {
      console.error('Error parsing JSON:', error);
      return res.status(500).json({ message: 'Error parsing JSON file' });
    }
  }

  data.push(formData);

  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
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
