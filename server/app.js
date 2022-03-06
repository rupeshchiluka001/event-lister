const express =require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const cors = require('cors');
require('dotenv').config();
require('./config/database');
require('./config/generateKeypair')();

const PORT = process.env.PORT || 3080;
const app = express();

app.use(cors({}))

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use('/api', authRoutes);
app.use('/api/events', eventRoutes);

app.use(express.static( path.join(__dirname, '..', 'views', 'build') ));

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}...`);
});