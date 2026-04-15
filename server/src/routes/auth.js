import { Router } from "express";
import { prisma } from "../lib/prisma.js"

const router = Router();

router.post("/signup", async (req, res) => {
    try{
        const {username, email, password } = req.body;
        if(!username || !email || !password)
            return res.status(400).json({ error: "Missing signing up informations"})
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

router.post("/login", async (req, res) => {
    try{
        const {email, password} = req.body;                             // On destructure le contenu de la request front
        if(!email || !password)
            return res.status(400).json({ error: "Missing login information"})

        const user = await prisma.user.findUnique({                     // requête prisma (ne pas oublier prisma.ColonneDeLaDB.findUnique({}))
            where: { email }
        });
    
    if(!user || password !== user.password)
        return res.status(401).json({error : "Invalid credentials"});

    return res.status(200).json({
        message: "Logging Successful",
        user: {
            id: user.id,
            username: user.username,
            email: user.email
        },
    })
    } catch(error) {
        console.log(error);
        return res.status(500).json({error: "Something went wrong"});
    }

})


export default router;