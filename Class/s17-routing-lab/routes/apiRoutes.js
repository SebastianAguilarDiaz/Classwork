import express from "express";
import { protect, requireAdmin } from "../middlewares/authMiddleware.js";
import { AppError } from "../utils/appError.js";

const router = express.Router();

// Simulated In-Memory Database
let initiatives = [
  {
    id: 1,
    title: "Solar Canopy Expansion",
    priority: "High",
    status: "Active",
  },
  {
    id: 2,
    title: "Campus Composting Loop",
    priority: "Medium",
    status: "In Review",
  },
];

// TODO: Use router.route('/') with METHOD CHAINING
// Chain .get() -> protected, returns all initiatives
// Chain .post() -> protected, validates body title & priority, creates & returns new initiative (201)
router
  .route("/")
  .get(/* TODO: Add protect & handler */ protect,(req,res)=>{
    res.status(200).send(initiatives);
  })

  .post(/* TODO: Add protect & handler */protect, (req,res,next)=>{
    const { title, priority } = req.body;
    if(!title || !priority){
      return next(new AppError("Title and priority required",400));

    }
    initiatives.push({
      id: initiatives.length?initiatives.at(-1).id+1:1,
      title,
      priority,
      status: "Active",
    });
    res.status(201).send(initiatives.at( - 1));



  });
  

// TODO: Use router.route('/:id') with METHOD CHAINING
// Chain .get() -> protected, returns single initiative or 404
// Chain .delete() -> protected + requireAdmin, deletes initiative by ID or 404
router
  .route("/:id")
  .get(/* TODO: Add protect & handler */protect,(req,res,next)=>{
    
    const id = parseInt(req.params.id);
    const initiative=initiatives.find((element)=>{
      return element.id=== id;
    });
    if (!initiative)return next(new AppError("Initiative not found",404));
    res.status(200).send(initiative);
  })
  .delete(/* TODO: Add protect + requireAdmin & handler */protect,requireAdmin,(req,res,next)=>{
    const id = parseInt(req.params.id);
        const initiative=initiatives.findIndex((element)=>{
      return element.id===id;
    });
    if (initiative===-1)return next(new AppError("Initiative not found",404));
    const deleted=initiatives.splice(initiative,1)[0];
    res.status(200).send(deleted);

  } );

export default router;
