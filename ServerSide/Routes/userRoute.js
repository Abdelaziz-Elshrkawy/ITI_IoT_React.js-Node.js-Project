import { Router } from "express";
import UsersMethods from "../Database/models/userModel.js";

const userRoute = Router()
const users = new UsersMethods()

userRoute.post("/", async (req, res) => {
    const { name, age, email, username, password } = req.body
    res.json(await users.addUser(name, age, email, username, password))
});

userRoute.get('/login', async (req, res) => {
    const { email, password } = req.body
    res.json(await users.login(email, password))
})


export default userRoute