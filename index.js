const path = require("path");
const express = require("express");
const cors = require("cors");
const { init: initDB, Counter } = require("./database");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// 计数+1
app.post("/counter/increment", async (req, res) => {
  const { action } = req.body;
  if (action === "inc") {
    await Counter.create();
  } else if (action === "clear") {
    await Counter.destroy({
      truncate: true,
    });
  }
  res.send({
    code: 0,
    data: await Counter.count(),
  });
});

// 计数-1
app.get("/counter/decrement", async (req, res) => {
  var result = await Counter.findOrCreate();
  result.count--;
  result = await Counter.update(result);

  res.send({
    code: 0,
    data: result.count,
  });
});


// 计数+1
app.get("/counter/increment", async (req, res) => {
  var result = await Counter.findOrCreate();
  result.count--;
  result = await Counter.update(result);

  res.send({
    code: 0,
    data: result.count,
  });
});

// 获取计数
app.get("/counter", async (req, res) => {
  var result = await Counter.findOrCreate();

  res.send({
    code: 0,
    data: result.count,
  });
});

const port = process.env.PORT || 80;

async function bootstrap() {
  await initDB();
  app.listen(port, () => {
    console.log("start server success", port);
  });
}

bootstrap();
