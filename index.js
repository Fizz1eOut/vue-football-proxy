const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

app.get("/api/*", async (req, res) => {
  // req.params[0] содержит всю часть URL после /api/
  const endpoint = req.params[0];
  const apiUrl = `https://api.football-data.org/v4/${endpoint}`;

  try {
    console.log(`Запрос к API: ${apiUrl}`);

    const response = await axios.get(apiUrl, {
      headers: { "X-Auth-Token": process.env.API_KEY }
    });

    res.json(response.data);
  } catch (error) {
    console.error("Ошибка запроса:", error.response?.status, error.response?.data);
    res.status(error.response?.status || 500).json({ error: "Ошибка сервера" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));
