import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/about", (req, res) => {
  res.send("About but insecure");
});

app.post("/about", (req, res) => {
  res.send("About Page");
});
app.get("/greet", (req, res) => {
  const { name, city } = req.query;
  res.send(`hello ${name}, how is the wheather in ${city}`);
});
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
