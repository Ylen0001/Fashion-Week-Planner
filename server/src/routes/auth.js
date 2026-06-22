import { Router } from "express";
import { prisma } from "../lib/prisma.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { authenticateToken } from "../middleware/middleware.js";

const router = Router();
const SECRET_KEY = process.env.JWT_SECRET;
const SALT_ROUNDS = 10;

router.post("/signup", async (req, res) => {
    try{
        const {username, email, password } = req.body;
        if(!username || !email || !password)
            return res.status(400).json({ error: "Missing signing up informations"})
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        const newUser = await prisma.user.create({
            data :  { username, email, password: hashedPassword }
        });
        const token = jwt.sign(
            { userId: newUser.id },
            SECRET_KEY,
            { expiresIn: "1h" }
        );
        return res.status(201).json({
            message: "Signed up successfully",
            token,
            user: {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
            }
        });
        
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
    
    const passwordMatch = user && await bcrypt.compare(password, user.password);
    if(!passwordMatch)
        return res.status(401).json({error : "Invalid credentials"});

    const token = jwt.sign(
    { userId: user.id },
    SECRET_KEY,
    { expiresIn: "1h" }
    ); 
    
    return res.status(200).json({
        message: "Logging Successful",
        token,
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

router.get("/me", authenticateToken, async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.userId },
            select: { id: true, username: true, email: true },
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Something went wrong" });
    }
});

export default router;