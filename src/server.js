const express = require('express');

const splitRouter = require('./routes/tpss.route');
const connectDB = require('./db_config/db');

require("dotenv").config();

const app = express();
app.use(express.json());

app.use('/', splitRouter)

const port = process.env.PORT || 5000;

const db_userName = process.env.DB_USERNAME;
const db_password = process.env.DB_PASSWORD;
// console.log(db_userName, db_password);
// Connect to MongoDB database
const dbURL = `mongodb+srv://${db_userName}:${db_password}@rest-api.kpvocbv.mongodb.net/?retryWrites=true&w=majority`;
connectDB(dbURL);

app.listen(port, () => console.log(`Server running on port ${port}`));