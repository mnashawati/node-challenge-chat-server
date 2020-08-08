const express = require("express");
const cors = require("cors");
// const bodyParser = require("body-parser");

const app = express();

app.use(cors());

// app.use(cors(), bodyParser.json()); (Body parser is now included in Express, just need the following 2 lines)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

app.post("/messages", (req, res) => {
  const newMessage = req.body;

  let d = new Date();
  let timeSent = d.getTime();
  newMessage.timeSent = timeSent;

  if (!req.body.from || !req.body.text) {
    return res.sendStatus(400);
  }

  messages.push(newMessage);
  res.status(201).send(messages);
});

app.get("/messages", (req, res) => {
  res.send(messages);
});

app.get("/messages/search", (req, res) => {
  const filterdMessages = messages.filter((msg) =>
    msg.text.includes(req.query.text)
  );
  res.send(filterdMessages);
});

app.get("/messages/latest", (req, res) => {
  const lastTenMessages = messages.slice(-10, messages.length);
  res.send(lastTenMessages);
});

app.get("/messages/:id", (req, res) => {
  const messageId = req.params.id;
  const requestedMessage = messages.find((msg) => String(msg.id) == req.params);
  res.send(requestedMessage);
});

app.delete("/messages/:id", (req, res) => {
  const messageId = req.params.id;
  const requestedMessage = messages.find(
    (msg) => String(msg.id) !== req.params
  );
  res.send(requestedMessage);
});

app.put("/messages/:id", (req, res) => {
  const messageId = req.params.id;
  const requestedMessage = messages.find(
    (msg) => String(msg.id) !== req.params
  );
  res.send(requestedMessage);
});

app.listen(process.env.PORT);
