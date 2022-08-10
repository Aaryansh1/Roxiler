const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

const todosRouter = require("./routes/todos");
app.use("/", todosRouter);

app.listen(3001, () => {
  console.log("Server running");
});