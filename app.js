const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/user');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/admin', express.static('public'));



// http://localhost:4000/admin/login
//hoisting through this path
 app.use('/admin/login', express.static('public/adminlogin.html'));
app.use('/admin', userRoutes);


// Start the server
const port = 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
