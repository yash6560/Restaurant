const { Server } = require("socket.io");

const io = new Server(5001, {
    cors: { origin: "http://localhost:5173" }
});

const notifyOrderStatus = (orderId, status) => {
    io.emit(`order_status_${orderId}`, status);
};

module.exports = notifyOrderStatus;