import express from "express"
import bodyParser from "body-parser";


const app = express();
const PORT = 3000;
let names =[];
let todo=[];
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


app.set("view engine", "ejs");
app.set("views", "./html");


app.get("/", (req, res) => {
    
    res.render("index",{names:names,error:null,todo:todo})

});


app.get("/greet", (req,res)=>{
  const {name} = req.query;
  console.log(name);
  if(name && name.trime!==""){
    names.push(name);
  } 
  res.render("index",{names:names, error:null,todo:todo});

});

app.get("/greet/:id", (req,res,next)=>{
  const id = req.params.id;
  if(id>=0 && id<names.length){
    res.render("wazzup",{name:names.at(id)});
    }
    else return next(Error("Index out of range" ));

});

app.post("/task",(req,res)=>{
    const {task} =req.body;

    if(task && task.trim()!==""){
        todo.push(task);
    }
    res.render("index",{names:names,todo:todo,error:null});

});

app.get("/task/delete/:id",(req,res,next)=>{
    const id =parseInt(req.params.id);
    // if the id is in range
    if(id>=0 && id < todo.length ){

        todo.splice(id,1);
        res.render("index",{names:names,error:null,todo:todo})
    }
    else return next(Error("Task out of range"));
    
});

app.get("/task/up/:id",(req,res,next)=>{
    const id = parseInt(req.params.id);
    if(id<0 || id >= todo.length ){
        return next(Error("Task out of range"));
    }
    else if(id!==0){
        
        [todo[id],todo[id-1]]=[todo[id-1],todo[id]];
    }
    res.render("index",{names:names,error:null,todo:todo})
});
app.get("/task/down/:id",(req,res,next)=>{
    const id = parseInt(req.params.id);
    if(id<0 || id >= todo.length ){
        return next(Error("Task out of range"));
    }
    else if(id!==todo.length-1){
        
        [todo[id],todo[id+1]]=[todo[id+1],todo[id]];
    }
    res.render("index",{names:names,error:null,todo:todo})
});
app.get("/task", (req,res)=>{
  res.json(todo);
});


app.listen(PORT, () => {
  console.log(`🚀 SustainHub Server running at http://localhost:${PORT}`);
});