const axios = require('axios');
require('dotenv').config();

async function fetchTradeSummary() {
  try {
    const res = await axios.post(process.env.CSE_API_URL);
    return res.data.reqTradeSummery || [];
  } catch (err) {
    console.log(err);
    
    console.error('Error fetching CSE data:', err.message);
    return [];
  }
}

module.exports = { fetchTradeSummary };