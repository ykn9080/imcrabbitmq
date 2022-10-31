const express = require("express");
const Broker = require("./services/rabbitMQ");
const fileUpload = require("express-fileupload");
const { publishToExchange, upload } = require("./utils/function");

const app = express();
const RMQProducer = new Broker().init();
app.use(fileUpload());

app.use(async (req, res, next) => {
  try {
    req.RMQProducer = await RMQProducer;
    next();
  } catch (error) {
    process.exit(1);
  }
});

// your routes here
app.post("/upload", async (req, res) => {
  const { data } = req.files.image;
  try {
    const message = await upload(data);

    await publishToExchange(req.RMQProducer, {
      message,
      routingKey: process.env.BINDING_KEY,
    });

    res.status(200).send("File uploaded successfully!");
  } catch (error) {
    res.status(400).send(`File not uploaded!`);
  }
});

app.use((req, res, next) => {
  next(creatError.NotFound());
});

// error handling
app.use((err, req, res, next) => {
  res.status(err.status || 500).send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});
app.listen(process.env.PORT || 3001, () => {
  console.log("server is running", process.env.PORT || 3001);
});

process.on("SIGINT", async () => {
  process.exit(1);
});
process.on("exit", (code) => {
  RMQProducer.channel.close();
  RMQProducer.connection.close();
});
