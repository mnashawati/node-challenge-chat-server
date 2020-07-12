const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser")

const app = express();

app.use(cors(), bodyParser.json());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.get("/messages", function (req, res) {
  res.send(messages);
});

app.post("/messages", (req, res) => {
  const newMessage = req.body;
  messages.push(newMessage);
})

app.get("/messages/:id", (req, res) => {
  const messageId = Number(req.params.id);
  const requestedMessage = messages.find(message => message.id == messageId)

  res.send(requestedMessage);
});

app.delete("/messages/:id", (req, res ) => {
  const messageID = Number(req.params.id)
  const updatedMessages = messages.filter(message => message.id !== messageID)

  res.send(updatedMessages)
})

const port = process.env.PORT || 3000;

console.log(`listening on port ${port}`)

app.listen(port);
