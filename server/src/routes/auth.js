import { Router } from "express";
import { prisma } from "../lib/prisma.js"

const router = Router();

router.post("/signup", async (req, res) => {
    try{
        const {username, email, password } = req.body;
        if(!username | !email | !password)
            return res.status(400).json({ error: "Missing logging informations"})
        const newUser = await prisma.user.create({
            data :  { username, email, password }
        });
        return res.status(201).json(newUser);
        
    } catch (error) {
        if(error.code === "P2002")
            return res.status(409).json({ error: "email already in use"});
        console.log(error);
        res.status(500).json({ error: "Something went wrong" });
    }
});


export default router;