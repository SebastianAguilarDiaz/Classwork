import express from "express";
import fs from "fs";
import bodyParser from "body-parser";


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",(req,res)=>{
    const file=fs.readFileSync("./index.html","utf-8");
    res.send(file);
    
});

app.post("/",(req,res)=>{
    const weight = Number(req.body.weight);
    const height = Number(req.body.height);
    const bmi = (weight / (height * height)) * 10000;
    res.send(`Your BMI is ${bmi.toFixed(2)}`);
});

app.listen(3000,()=>{
    console.log("Server is running on http://localhost:3000")
});