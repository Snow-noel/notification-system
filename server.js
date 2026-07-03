const express = require("express");

const pool = require("./database");

const port = 3000;

const App = express();

App.use(express.json());

App.post("/comments", async (req, res) => {
  let client;
  const { userId, text } = req.body;
  try {
    client = await pool.connect();
    await client.query("BEGIN");
    const result = await client.query(
      "INSERT INTO comments(userId,Text) VALUES($1,$2) RETURNING id",
      [userId, text],
    );
    const commentId = result.rows[0].id;
    await client.query(
      "INSERT INTO jobs(event_type,payload,status) VALUES($1,$2,$3)",
      ["comment.created", { commentId, userId }, "pending"],
    );
    await client.query("COMMIT");

    res
      .status(201)
      .json({ message: "text sent successfully                       " });
    console.log(`UserId: ${userId} comment ${text}`);
  } catch (err) {
    await client.query("ROLLBACK");
    res.status(500).json({ message: "error while sending text", error: err });
  } finally {
    if (client) client.release();
  }
});

App.listen(port, () => {
  console.log(`listening at port ${port}`);
});
