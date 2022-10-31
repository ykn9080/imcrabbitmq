const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");
const { promisify } = require("util");

/* START: producer related*/
exports.upload = (data) => {
  const writeFile = promisify(fs.writeFile);
  return new Promise((resolve, reject) => {
    if (!data) {
      reject("File not available!");
    }
    try {
      const fileName = `img_${uuid()}.jpg`;

      writeFile(path.join(process.env.SRC_DIR, fileName), data);

      resolve(fileName);
    } catch (error) {
      reject(error);
    }
  });
};

/* 
we have moved this code out of producer.js(as in our previous rabbitmq project) into functions.js.
*/

exports.publishToExchange = async (instance, { message, routingKey }) => {
  try {
    await instance.createEx({
      name: process.env.EXCHANGE,
      type: "direct",
    });

    await instance.publish(
      {
        ex: process.env.EXCHANGE,
        routingKey: process.env.BINDING_KEY,
      },
      message
    );

    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
};
/* END: producer related*/
