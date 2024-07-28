const express = require("express");
const connectDb = require("./config/db.js");
const person = require("./model/person.js");
const bodyParser = require("body-parser");
const menuRouter = require("./router/menuRouter.js");
const app = express();
// conect db
connectDb();

// middleware
app.use(bodyParser.json());

// routes
app.use("/api/v1/menu", menuRouter);

// routes
app.get("/", function (req, res) {
  res.send("Hello World");
});
// post
app.post("/person", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new person(data);
    // TOKEN
    const token = newPerson.createJWT();
    const response = await newPerson.save();

    res.status(201).send({
      message: "data saved",
      response,
      token,
    });
    console.log("data save");
  } catch (error) {
    res.status(500).send({
      message: "Server Error",
    });
  }
});
// login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({
        message: "Please provide email and password",
      });
    }
    const user = await person.findOne({ email });
    if (!user) {
      return res.status(404).send({
        message: "User not found",
      });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).send({
        message: "Incorrect password",
      });
    }
    const token = await user.createJWT();
    res.status(200).send({
      message: "Logged in successfully",
      token,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Failed to login",
    });
  }
});
// find data api
app.get("/person", async (req, res) => {
  try {
    const data = await person.find();
    res.status(200).send({
      message: "data found",
      data,
    });
  } catch (error) {
    res.status(500).send({
      message: "Server Error",
      error,
    });
  }
});
// put
app.put("/person/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const updateData = req.body;
    const response = await person.findByIdAndUpdate(personId, updateData, {
      new: true,
      runValidators: true,
    });
    if (!response) {
      return res.status(404).send({ message: "Person not found." });
    }
    res.status(200).send({ message: "Person updated", response });
  } catch (error) {
    res.status(500).send({
      message: "Server Error",
      error,
    });
  }
});
// delete
app.delete("/person/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const response = await person.findByIdAndDelete(personId);
    if (!response) {
      return res.status(404).send({ message: "Person not found." });
    }
    res.status(201).send({
      message: "Person deleted",
    });
  } catch (error) {
    res.status(500).send({
      message: "Server Error",
      error,
    });
  }
});
// port
const port = 3000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
