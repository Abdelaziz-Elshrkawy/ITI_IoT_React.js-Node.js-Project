import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json())
app.use(cors())

app.get("/", async (req, res) => {
    res.send('Hello World!')
});


app.listen(process.env.port, () => {
    console.log(`Running on port: ${process.env.port}`);
})
