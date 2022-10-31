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

//     channel.assertQueue(queue, {
//       durable: false,
//     });

//     console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

//     channel.consume(
//       queue,
//       function (msg) {
//         console.log(" [x] Received %s", msg.content.toString());
//       },
//       {
//         noAck: true,
//       }
//     );
//   });
// });
const amqp = require("amqplib");
require("dotenv").config();
async function connect() {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    const channel = await connection.createChannel();
    await channel.assertQueue("yknamfirst");
    channel.consume("yknamfirst", (message) => {
      const input = JSON.parse(message.content.toString());
      console.log(`Received yknamfirst: ${message.content.toString()}`);
      channel.ack(message);
    });
    console.log(`Waiting for messages...`);
  } catch (ex) {
    console.error(ex);
  }
}
connect();
