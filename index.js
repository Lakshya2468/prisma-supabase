const express=require("express");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
var port = 3000;

const app=express();
app.use(express.json());


app.get("/vehicle",async(req,res)=>{
    const vehicles = await prisma.vehicle.findMany();
    res.json(vehicles);

} )

app.get("/owner",async(req,res)=>{
    const Owners = await prisma.owner.findMany();
    res.send(Owners);
} )

// same name routes of get and post 
app.post("/vehicle",async(req,res)=>{
    // use desturcuture
    const {vehicle_name,type,id}=req.body;
 
    // send back the created vehicle name
     await prisma.vehicle.create({
        data:{
           vehicle_name,
            type,
            owner: {
                connect: {
                  id,
                },
            },
        },
    });

    res.send(vehicle_name);
})

app.post("/owner",async(req,res)=>{
    const {owner_name,gender}=req.body;
  
    // variable name should be to the context 
    // means it should be createdOwner
     await prisma.owner.create({
        data:{
            owner_name,
            gender,
        },
    });

    res.send(owner_name);
})




app.delete("/vehicle/:id",async(req,res) =>{
    const id =req.params.id;
    const existingVehicle = await prisma.vehicle.findUnique({
        where: { id: parseInt(id) },
      });
      if (!existingVehicle) {
        return res.status(404).json({ error: 'Vehicle not found' });
      }
      await prisma.vehicle.delete({
        where: { id: parseInt(id)},
      });
      res.send("deleted");
})




app.delete("/owner/:id",async(req,res) =>{
    const id =req.params.id;
    const existingOwner = await prisma.owner.findUnique({
        where: { id: parseInt(id) },
      });
      if (!existingOwner) {
        return res.status(404).json({ error: 'Vehicle not found' });
      }
      await prisma.owner.delete({
        where: { id: parseInt(id)},
      });
      res.send("deleted");
})



app.patch("/vehicle/:id",async(req,res) =>{
    const {vehicle_name,type,id}=req.body;
    const idv =req.params.id;
    const existingVehicle = await prisma.vehicle.findUnique({
        where: { id: parseInt(idv) },
      });
      if (!existingVehicle) {
        return res.status(404).json({ error: 'Vehicle not found' });
      }
       await prisma.vehicle.update({
        where: { id: parseInt(idv) },
        data:{
            vehicle_name,
            type,
            owner: {
                connect: {
                  id,
                },
            },
        },
    });

    res.send(vehicle_name);

})




app.patch("/owner/:id",async(req,res) =>{
    const {owner_name,gender}=req.body;
  
    const id =req.params.id;
    const existingowner = await prisma.owner.findUnique({
        where: { id: parseInt(id) },
      });
      if (!existingowner) {
        return res.status(404).json({ error: 'Vehicle not found' });
      }
    //   use cammel case in for variabels
    await prisma.owner.update({
        where: { id: parseInt(id) },
        data:{
            owner_name,
            gender,
          
        },
    });

    res.send(owner_name);

})



// use a var called port and then pass it to the listen first argument 
app.listen(port,()=>{
    console.log("server started");
})