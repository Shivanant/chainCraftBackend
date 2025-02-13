import pino from "pino";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { format } from "date-fns";
import { ENV } from "../configs/constant.js";
import { createStream } from "rotating-file-stream";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the logs directory
const logsDir = path.join(__dirname, "../logs");
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true }); // Ensure recursive creation
}

// Function to create a rotating file stream
const createRotatingStream = (filename) => {
  return createStream(filename, {
    interval: "15d", // Rotate every 15 days
    path: logsDir, // Logs directory
    compress: "gzip", // Compress old files
  });
};

// Function to format timestamps
const timestampFormat = (timestamp) => {
  return format(new Date(timestamp), "MMMM dd yyyy, HH:mm:ss");
};

// Function to create a logger
const createLogger = (filename) => {
  const stream = createRotatingStream(filename); // Create a rotating stream
  const logger = pino(
    {
      timestamp: () => `,"time":"${timestampFormat(Date.now())}"`,
      formatters: {
        level: (label) => ({ level: label }),
        bindings: (bindings) => ({
          pid: bindings.pid,
          hostname: bindings.hostname,
        }),
        log: (object) => object,
      },
    },
    stream
  );

  return logger;
};

// Define loggers for different functionalities
const errorLogger = createLogger("pinoerrors.log");
const socketLogger = createLogger("socketerrors.log");

export { errorLogger, socketLogger };
