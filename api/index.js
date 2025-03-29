import express from "express";
import router from "./routes/routes.js";
import cors from "cors";

const app = express();
const port = 8080;
const allowedOrigins = ['http://localhost:3000', 'https://buzz-aladim.vercel.app'];

app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000', 'https://buzz-aladim.vercel.app'],
    credentials: true
}));

app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    console.log("Request: " + req.method + " " + req.url);
    next();
});

app.use("/", router);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

console.log("Server initialized")

export default app;
