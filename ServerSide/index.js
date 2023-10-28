import express from "express";
import cors from 'cors'
import UsersMethods from "./Database/models/users/userModel.js";
import { port } from './env.js'

const app = express();
const users = new UsersMethods()

app.use(express.json())
app.use(cors())

app.post("/user", async (req, res) => {
    const { name, age, email, username, password } = req.body
    res.json(await users.addUser(name, age, email, username, password))
});

app.listen(port, () => {
    console.log(`Running on port: ${process.env.port}`);
})
