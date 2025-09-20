import express from 'express'
import {prisma} from '@repo/db/db'
const app=express();
app.use(express.json());

app.get("/user", (req, res) => {
  prisma.user.findMany()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
})

app.post("/user", async(req, res) => {
  const { name, password } = req.body;
  
  if (!name || !password) {
    res.status(400).json({ error: "Username and password are required" });
    return
  }

  const user=await prisma.user.findFirst({
    where:{
      name:name
    }
  })

  if(user){
    res.status(200).json({
      message:"user already exist"
    })
  }

 await prisma.user.create({
    data: {
      name,
      password
    }
  })
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
})

app.listen(8081,()=>{
    console.log("the app is listening to port 8081")
});