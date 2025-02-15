app.use(cors());

app.get("/api/*", async (req, res) => {
  const endpoint = req.params[0];
  console.log(`Получен запрос: /api/${endpoint}`);
  console.log("Query params:", req.query); // <-- Логирование параметров

  const apiUrl = `https://api.football-data.org/v4/${endpoint}`;

  try {
    console.log(`Запрос к API: ${apiUrl}`);

    const response = await axios.get(apiUrl, {
      headers: { "X-Auth-Token": process.env.API_KEY },
      params: req.query, // <-- Передаем query параметры дальше
    });

    res.json(response.data);
  } catch (error) {
    console.error("Ошибка запроса:", error.response?.status, error.response?.data);
    res.status(error.response?.status || 500).json({ error: "Ошибка сервера" });
  }
});
