import express, { Request, Response } from "express";
import { PORT } from "./config/config";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("Hello from server");
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
