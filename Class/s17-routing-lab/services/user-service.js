import {User} from "../models/User.js";

export const createUser=async ({username,name, email,password})=>{
    
    const user= await User.create({username,name,email,password})
    .catch(dbError=>{
        console.error(dbError.message);
    });
    return user;
    // try{
    //     const user= await User.create({username,name,email,password});
    //     return user;
    // }catch(dbError){
        
    // }
};
export const findUser=async (username)=>{
    const userfound = await User.findOne({username})
    .catch((dbError)=>console.error(dbError.message));
    return userfound;

};

export const findUsers=async (name)=>{
    return await User.find({name})
    .sort({name:1})
    .catch((dbError)=>console.error(dbError.message));
};


