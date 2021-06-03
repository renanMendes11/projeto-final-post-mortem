const amqp = require('amqplib/callback_api');
const getContacts  = require('./api/index');

amqp.connect('amqp://mqadmin:Admin123XX_@localhost',function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }
    var queue = 'users';

    channel.assertQueue(queue, {
      durable: true
   });
   channel.consume(queue, function(msg) {
      const userId = msg.content.toString();
      getContacts(userId);
    }, {
        noAck: true
      });
  });
});
