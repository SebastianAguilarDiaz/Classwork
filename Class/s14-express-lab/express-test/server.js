import express from "express";

const app = express();
app.use(express.json());

const scientists = [
  { id: 1, name: "Dr. Elena Rostova", department: "Climate", projects: 4 },
  {
    id: 2,
    name: "Prof. Marcus Vance",
    department: "Oceanography",
    projects: 2,
  },
  { id: 3, name: "Dr. Aisha Khan", department: "Climate", projects: 7 },
];
const initiatives = [];

app.get("/", (req, res) => {
  res.send(`
    <div style="foth family: sans-serif; padding 20px;">
      <h1>Sustain Hub Decoupled REST API<h1>
      <p>Status: <span style="color: green; font-weight: bold;">ONLINE</span></p>
      <p>Available JSON endpoint: <code>/api/scientists</code>,<code>/api/initiatives</code>
    </div>
          `);
});

app.get("/greet", (req, res) => {
  const { name, city } = req.query;
  res.send(`hello ${name}, how is the wheather in ${city}`);
});

app.get("/api/scientists", (req, res) => {
  const { dept } = req.query;
  if (dept) {
    // const result = [];
    // for (const scientist of scientists) {
    //   if (scientist === dept) result.push(scientist);
    // }
    // return result;

    const result = scientists.filter(
      (scientist) => scientist.department.toLowerCase === dept.toLowerCase,
    );
    if (result && result.lenght > 0) {
      return res.json({
        deptScientists: result,
        dept,
        count: result.length,
      });
    } else {
      return res.json({ errorMsg: `No results for department ${dept}` });
    }
  }
  return res.json({ msg: `NA` });
});

app.get("/api/scientists/:id/profile/:keyword", (req, res) => {
  const scientistId = parseInt(req.params.id, 10);
  const scientist = scientists.find(
    (scientist) => scientist.id === scientistId,
  );
  if (!scientist) {
    return res.json({
      success: false,
      errorMsg: `No scientist found with id ${scientistId}`,
    });
  }
  res.json({
    success: true,
    data: scientist,
  });
});

app.post("/api/initiatives", (req, res) => {
  const { title, budget, department } = req.body;
  const initiative = { title, budget, department };
  initiatives.push(initiative);
  res.json({ title, budget, department });
});

app.get("/about", (req, res) => {
  res.send("About but insecure");
});

app.post("/about", (req, res) => {
  res.send("About Page");
});
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
