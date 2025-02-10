const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

app.get("/api/:endpoint", async (req, res) => {
  try {
    const response = await axios.get(`https://api.football-data.org/v4/${req.params.endpoint}`, {
      headers: { "X-Auth-Token": process.env.API_KEY }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: "Ошибка сервера" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));
