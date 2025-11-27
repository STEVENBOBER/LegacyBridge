// src/utils/logger.ts
import { config } from "../config";

type LogLevel = "debug" | "info" | "warn" | "error";

const levelWeights: Record<LogLevel, number> = {
    debug: 10,
    info: 20,
    warn: 30,
    error: 40
}

const currentLevel: LogLevel = (config.LOG_LEVEL as LogLevel) || "info";

const shouldLog = (level: LogLevel) => levelWeights[level] >= levelWeights[currentLevel];

const formatMessage = (level: LogLevel, message: string) => {
    const ts = new Date().toISOString();
    return `[${ts}] [${level.toUpperCase()}] ${message}`
};

export const logger = {
    debug: (msg: string) => {
        if (shouldLog("debug")) {
            console.debug(formatMessage("debug", msg));

        }
    },
    info: (msg: string) => {
        if (shouldLog("info")) {
            console.debug(formatMessage("info", msg));

        }
    },
    warn: (msg: string) => {
        if (shouldLog("warn")) {
            console.debug(formatMessage("warn", msg));
        }
    },
    error: (msg: string, err?: unknown) => {
        if (shouldLog("error")) {
            const base = formatMessage("debug", msg)
            if (err instanceof Error) {
                console.error(`${base} - ${err.message}\n${err.stack}`);
            } else if (err) {
                console.error(`${base} -`, err);
            } else {
                console.error(base);
            }
        }
    }
}