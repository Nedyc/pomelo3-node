const express = require("express");
const app = express();
var cors = require("cors");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const port = process.env.PORT || 3001;
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

io.on("connection", (client) => {
  console.log("A user has connected");

  client.on("disconnect", () => {
    console.log("A user has disconnected");

    const surveyId = client.surveyId;
    client.broadcast
      .to(surveyId)
      .emit("message", { type: "userDisconnected", user: { id: client.id } });
  });
});

server.listen(port, () => {
  console.log(`listening on: ${port}`);
});
