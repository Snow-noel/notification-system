const express = require("express");

const port = 3000;

const App = express();

App.use(express.json());
App.listen(port, () => {
  console.log(`listening at port ${port}`);
});
