const path = require("path");
const express = require("express");
const cors = require("cors");
const { init: initDB, Counter } = require("./database");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// 计数-1
app.get("/counter/decrement", async (req, res) => {
  var [record, created] = await Counter.findOrCreate({
    where: {id: 1},
  });
  
  record.count--;
  await record.save();
  
  res.send({
    code: 0,
    data: record.count,
  });
});


// 计数+1
app.get("/counter/increment", async (req, res) => {
  var [record, created] = await Counter.findOrCreate({
    where: {id: 1},
  });
  
  record.count++;
  await record.save();
  
  res.send({
    code: 0,
    data: record.count,
  });
});

// 获取计数
app.get("/counter", async (req, res) => {
  var [record, created] = await Counter.findOrCreate({
    where: {id: 1},
  });
  res.send({
    code: 0,
    data: record.count,
  });
});

const port = process.env.SERVER_PORT || 8080;

async function bootstrap() {
  await initDB();
  app.listen(port, () => {
    console.log("start server success", port);
  });
}

bootstrap();
