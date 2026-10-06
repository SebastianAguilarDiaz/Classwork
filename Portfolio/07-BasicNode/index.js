import express from "express";
import sw from "star-wars-quotes";
import {randomSupervillain} from 'supervillains';
import {randomSuperhero} from 'superheroes';
import fs from "fs";




const app = express();
app.use(express.json());
console.log("Hello world!");


console.log(sw());
console.log(randomSuperhero() + " vs " + randomSupervillain());

const secret = fs.readFileSync("./data/input.txt", "utf-8");
console.log(secret);
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});