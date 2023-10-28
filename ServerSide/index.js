import express from "express";
import dotenv from "dotenv";
import cors from 'cors'
import UsersMethods from "./Database/models/users/usermodel.js";
dotenv.config();
const app = express();
app.use(express.json())
app.use(cors())
const users = new UsersMethods()
app.post("/user", async (req, res) => {
    const { name, age, email, username, password } = req.body
    res.json(await users.addUser(name, age, email, username, password))
});


app.listen(process.env.port, () => {
    console.log(`Running on port: ${process.env.port}`);
})
