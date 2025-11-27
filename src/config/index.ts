// src/config/index.ts
import dotenv from "dotenv"

dotenv.config()

const toNumber = (value: string | undefined, fallback: number): number => {
    if (value === undefined) return fallback;
    const n = Number(value);
    return Number.isNaN(n) ? fallback : n;
};


export const config = {
    NODE_ENV: process.env.NODE_ENV ?? "development",
    PORT: toNumber(process.env.PORT, 3000),
    LOG_LEVEL: process.env.LOG_LEVEL ?? "info",

    PEOPLESOFT_BASE_URL: process.env.PEOPLESOFT_BASE_URL ?? "http://localhost:4000",

    // Mock PeopleSoft auth
    PEOPLESOFT_USERNAME: process.env.PEOPLESOFT_USERNAME ?? "psadmin",
    PEOPLESOFT_PASSWORD: process.env.PEOPLESOFT_PASSWORD ?? "changeme"
}