// Packages
import express from 'express'
import type { Request, Response, NextFunction } from 'express'
import cors from "cors"
import helmet from 'helmet'

// Files
import { config } from './config'
import peoplesoftRouter from "./routes/peoplesoft"



const app = express()
const PORT = config.PORT

// Security & CORS--->
app.use(helmet())

app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))


// CORE MIDDLEWARE--->
app.use(express.json());

app.use((req: Request, _res: Response, next: NextFunction) => {
    console.log(
        `[${new Date().toISOString()}] ${req.method} ${req.url} (env=${config.NODE_ENV})`
    );
    next();
});

// ROUTES--->
app.use("/peoplesoft", peoplesoftRouter)

app.get("/health", (_req, res) => {
    res.status(200).json({
        status: "ok",
        service: "LegacyBridge API",
        uptime: process.uptime(),
        timeStamp: new Date().toISOString()
    })
})

// Sanity check
app.get("/", (_req, res) => {
    res.send("Legacy bridge API is running")
})

// ERROR HANDLER--->
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error("Unhandled error:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
});

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`)
})