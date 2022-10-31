// var amqp = require("amqplib/callback_api");

// amqp.connect("amqp://localhost", function (error0, connection) {
//   if (error0) {
//     throw error0;
//   }
//   connection.createChannel(function (error1, channel) {
//     if (error1) {
//       throw error1;
//     }
//     var queue = "hello";
//     var msg = "Hello world";

//     channel.assertQueue(queue, {
//       durable: false,
//     });

//     channel.sendToQueue(queue, Buffer.from(msg));
//     console.log(" [x] Sent %s", msg);

//     //  app.post("/api/products", async (req, res) => {
//     //    const product = await productRepository.create(req.body);
//     //    const result = await productRepository.save(product);
//     //    channel.sendToQueue(
//     //      "product_created",
//     //      Buffer.from(JSON.stringify(result))
//     //    );
//     //    return res.send(result);
//     //  });
//   });
//   setTimeout(function () {
//     connection.close();
//     process.exit(0);
//   }, 500);
// });
const amqp = require("amqplib");
const reqres = require("./requestResponse");
const Producer = require("./producer");

async function connect(msg) {
  const msgBuffer = Buffer.from(JSON.stringify(msg));
  try {
    //const connection = await amqp.connect("amqp://localhost:5672");
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    const channel = await connection.createChannel();
    await channel.assertQueue("yknamfirst");
    await channel.sendToQueue("yknamfirst", msgBuffer);
    console.log("Sending message to yknamfirst queue");
    await channel.close();
    await connection.close();
  } catch (ex) {
    console.error(ex);
  }
}
exports.sendTest = (req, res) => {
  console.log(req.body);
  const rk = req.body.routingKey;
  const msg = req.body.message;
  const producer = new Producer().publishMessage(rk, msg);
  //   req.body.routingKey,
  //   req.body.message
  // );
  //connect({ myscore: 101 });
};
// exports.simpleTest = (req, res) => {
//   let replacement = {};
//   reqres.commonQueryBody("simpletest()", replacement, res);
// };
