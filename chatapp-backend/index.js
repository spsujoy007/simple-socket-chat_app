const express = require('express')
const app = express()
const port = process.env.PORT || 3001
const http = require("http")
const cors = require('cors');
const {Server} = require('socket.io');

//middleware
app.use(cors())
app.use(express())

const server =  http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
})

io.on("connection", (socket) => {
  console.log(`user connected: ${socket.id}`)

  socket.on("join_room", (data) => {
    socket.join(data.roomno)
  })

  socket.on("send_message", (data) => {
    const {room} = data.messageBody;
    console.log(data)
    socket.to(room).emit("recive_message", data.messageBody)
  })

})

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
  });
  
server.listen(port, () => {
    console.log(`Server listening on ${port}`);
});