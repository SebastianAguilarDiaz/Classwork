import express from "express"
import bodyParser from "body-parser";


const app = express();
const PORT = 3000;
let names =[];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


app.set("view engine", "ejs");
app.set("views", "./html");


app.get("/", (req, res) => {
    
    res.render("index",{names:names,error:null})

});


app.get("/greet", (req,res)=>{
  const {name} = req.query;
  console.log(name);
  if(name && name.trime!==""){
    names.push(name);
  } 
  res.render("index",{names:names, error:null});

});

app.get("/greet/:id", (req,res,next)=>{
  const id = req.params.id;
  if(id>=0 && id<names.length){
    res.render("wazzup",{name:names.at(id)});
    }
    else return next(Error("Index out of range" ));

});


app.listen(PORT, () => {
  console.log(`🚀 SustainHub Server running at http://localhost:${PORT}`);
});