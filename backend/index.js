const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const DBConnect = require('./DB');
const cors = require('cors');
const userRouter = require('./routers/user.router');
const foodRouter = require('./routers/food.router');
const cartRouter = require('./routers/cart.router');
const orderRouter = require('./routers/order.router');
const cookieParser = require('cookie-parser')

const app = express();

app.post('/order/webhook', express.raw({ type: 'application/json' }));
app.use(
    cors({
      origin: "http://localhost:5173", // 👈 Allow frontend origin
      credentials: true, // 👈 Allow cookies
      allowedHeaders: "Content-Type,Authorization", // 👈 Allowed headers
    })
  );
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.use('/user', userRouter)
app.use('/food', foodRouter)
app.use('/cart', cartRouter)
app.use('/order', orderRouter)

app.listen(process.env.PORT, () => {
    DBConnect();
    console.log(`server is live at post : ${process.env.PORT}`)
})