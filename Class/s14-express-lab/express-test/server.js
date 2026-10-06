import express from "express";
import axios from "axios";
import { getWeatherFrom } from "./services/meteo-service.js";

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

const WeatherError = class extends Error{
  constructor(message, statusCode, rootCauseClass){
    super(message);
    this.name="WeatherError";
    this.statusCode=statusCode;
    this.rootCauseClass=rootCauseClass;

  }
}






// ==========================================
// 2. ROUTES & ENDPOINTS
// ==========================================

// 2a. HTML Root Landing Route
// TODO: Create GET '/' endpoint returning a basic HTML status heading string using res.send()
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

// 2b. GET All Scientists with Query Filtering (req.query)
// TODO: Create GET '/api/scientists' endpoint
// - If req.query.dept is provided, filter scientists by department
// - Return JSON response with status 200: res.json(...)
app.get("/api/scientists", (req, res) => {
  const { dept } = req.query;
  if (dept) {
    // const result = [];
    // for (const scientist of scientists) {
    //   if (scientist === dept) result.push(scientist);
    // }
    // return result;

    const result = scientists.filter(
      (scientist) => scientist.department.toLowerCase() === dept.toLowerCase(),
    );

    if (result && result.length > 0) {
      return res.status(200).json({
        deptScientists: result,
        dept,
        count: result.length,
      });
    } else {
      return res
        .status(404)
        .json({ errorMsg: `No results for department ${dept}` });
    }
  }
  return res.json({ scientists });
});

// 2c. GET Single Scientist by ID (req.params)
// TODO: Create GET '/api/scientists/:id' endpoint
// - Parse req.params.id as an integer
// - Find scientist matching ID
// - Return 404 JSON error if not found, or 200 JSON object if found
app.get("/api/scientists/:id", (req, res) => {
  const scientistId = parseInt(req.params.id, 10);
  const { keyword } = req.params;
  const scientist = scientists.find(
    (scientist) => scientist.id === scientistId,
  );
  if (!scientist) {
    return res.status(404).json({
      success: false,
      errorMsg: `No scientist found with id ${scientistId}`,
    });
  }
  res.status(200).json({
    success: true,
    data: scientist,
    keyword,
  });
});

// 2d. POST Create New Initiative (req.body)
// TODO: Create POST '/api/initiatives' endpoint
// - Extract title, budget, and department from req.body
// - Validate fields (return 400 JSON error if missing)
// - Create new initiative object, push to array

// - Return 201 Created JSON response
app.get("/api/initiatives", (req, res) => {
  res.json({ initiatives, status: "ok" });
});

app.post("/api/initiatives", (req, res) => {
  console.log(req.body);
  const { title, budget, department } = req.body;

  // if there's any missing field
  if (!title || !budget || !department) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const initiative = { title, budget, department };
  initiatives.push(initiative);
  res.status(201).json({ title, budget, department });
});

app.get("/about", (req, res,next) => {
  next({msg:"This is my WebApp Class project."});
});
app.get("/about", (req, res) => {
  res.send("About but insecure");
});
app.get("/about", (req, res,next) => {
  next({msg:"Second endpoint"});
});

app.post("/about", (req, res) => {
  res.send("About Page");
});

app.get("/weatherGDL", async (req, res) => {
  const resString = await getWeatherFrom(20.6597, -103.349, "Guadalajara");
  res.send(resString);
});
app.get("/weatherLSN", async (req, res) => {
  const repString = await getWeatherFrom(46.52, 6.63, "Luasanne");
  res.send(repString);
});

const cities={
  GDL: {lat: 20.6597, long : -103.349},
  LSN:{lat: 46.52, long: 6.63},
};

// app.get("/weather/:city",async(req,res,next)=>{
//   try{ 
//     const {city}=req.params;
//     if(!city) throw new Error("City code is required");
//     if(!cities[city]) throw new Error("City code is invalid");
//     const {lat,long,name} = cities[city];
//     const  respString = await getWeatherFrom(lat, long,city);
//     res.send(respString);
//   }catch(error){
//     console.error(error);
//     if(error.message==="City code is required"){
//       res.status(400).send({error:"City code is required"});
//     }
//     res.status(500).send({error:"Unknown error"});
//   }
// });

app.get("/weather/:city",async(req,res,next)=>{

    const {city}=req.params;
    if(!city) next( new WeatherError("City code is required",400,"/weather/:city"));
    if(!cities[city]) next( new WeatherError("City code is invalid",400,"/weather/:city"));
    const {lat,long,name} = cities[city];
    const  respString = await getWeatherFrom(lat, long,city);
    res.send(respString);
});

// app.all('*',(req, res,next)=>{

//   next(new Error("Endpoint not found"));
// });



app.use((err,req,res,next)=>{
  console.error(err);
  if(err instanceof WeatherError){
  const msg = err.message || err.rootCauseClass || "Unknown error";
  res.status(err.statusCode || 500).json({error:msg, rootCause: err.rootCauseClass,section: "Weather"});
  }
  res.status(500).json({error:err.message || "Unknown error"});

}) ; 




app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
