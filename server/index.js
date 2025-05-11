const dotenv = require('dotenv');
const express = require("express")
const cors = require('cors');
const {connect_mongo} = require("./connect")
const UrlRouter = require("./router/url")

const app = express()
dotenv.config();

const port = process.env.PORT || 4000;
const mongo_url = process.env.MONGO_URL;


connect_mongo(mongo_url)
  .then(() => console.log('MongoDB is connected.'))
  .catch((err) => console.error('MongoDB connection failed:', err));

app.use(express.json()); 
app.use(cors()); 
app.use('/url', UrlRouter)


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});