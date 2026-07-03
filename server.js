const express = require("express");

const pool = require("./database");

const port = 3000;

const App = express();

App.use(express.json());

App.post("/comments", async (req, res) => {
  const { userId, text } = req.body;
  try {
    const client = await pool.connect();
    await client.query("BEGIN");
    const result = await client.query(
      "INSERT INTO comments(user_id,text) VALUES($1,$2) RETURNING id",
      [userId, text],
    );

    const commentId = result.rows[0].id;
    res
      .status(201)
      .json({ message: "text sent successfully                       " });
    console.log(`UserId: ${userId} comment ${text}`);
  } catch (err) {
    res.status(500).json({ message: "error while sending text", error: err });
  }
});

App.listen(port, () => {
  console.log(`listening at port ${port}`);
});
