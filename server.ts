import path from "path";
import { dirname } from "path";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import rateLimit from "express-rate-limit";
import pino from "pino";

dotenv.config();

// Structured Logger Setup
export const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: "SYS:standard",
    },
  },
});

const app = express();

import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";

// import fileUpload from "express-fileupload";
import cloudinary from "cloudinary";
import "express-async-errors";
import morgan from "morgan";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
//db and authenticateUser
import connectDB from "./db/connect.ts";

//router
import authRouter from "./routes/AuthRoutes.js";
import postsRouter from "./routes/postRoute.js";
import eventsRouter from "./routes/eventsRoute.js";
import healthRouter from "./routes/healthRoute.js";
import contactRouter from "./routes/ContactRoute.js";
import departmentRoute from "./routes/departmentRoute.js";
import uploadRouter from "./routes/pdfRoute.js";
import imageRouter from "./routes/imageRoute.js";
import workerRouter from "./routes/workerRoute.js";
import pastorRouter from "./routes/pastorRoute.js";
import eldersRouter from "./routes/eldersRoute.js";
import reviewRouter from "./routes/reviewRoute.js";
import resourceRouter from "./routes/resourceRoute.js";
import ministryRouter from "./routes/ministryRoute.js";
import sermonRouter from "./routes/sermonRoute.js";
//middleware
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// Security: CORS Configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true, // Allow cookies to be sent
};
app.use(cors(corsOptions));

// Security: Rate Limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  message: "Too many requests from this IP, please try again after 15 minutes",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply the rate limiting middleware to all requests under /api/v1
app.use("/api/v1", apiLimiter);

app.use(express.json());

app.use(express.static("./public"));

// Configure Security Headers with Helmet
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "default-src": ["'self'"],
      "script-src": ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      "style-src": ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      "font-src": ["'self'", "https://fonts.gstatic.com", "data:"],
      "img-src": ["'self'", "data:", "https://res.cloudinary.com", "https://images.unsplash.com", "blob:"],
      "connect-src": ["'self'", "https://res.cloudinary.com"],
      "media-src": ["'self'", "https://res.cloudinary.com"],
      "frame-src": ["'self'", "https://www.youtube.com", "https://youtube.com"]
    },
  })
);
app.use(mongoSanitize());
app.use(cookieParser());

const __dirname = dirname(fileURLToPath(import.meta.url));

// Next.js frontend is deployed as a separate service now, so we don't serve a built React SPA from the backend anymore.
// The backend is strictly a JSON API.

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/posts", postsRouter);
app.use("/api/v1/events", eventsRouter);
app.use("/api/v1/health", healthRouter);
app.use("/api/v1/contact", contactRouter);
app.use("/api/v1/position", departmentRoute);
app.use("/api/v1/pdf", uploadRouter);
app.use("/api/v1/image", imageRouter);
app.use("/api/v1/worker", workerRouter);
app.use("/api/v1/pastor", pastorRouter);
app.use("/api/v1/elder", eldersRouter);
app.use("/api/v1/review", reviewRouter);
app.use("/api/v1/resource", resourceRouter);
app.use("/api/v1/ministry", ministryRouter);
app.use("/api/v1/sermons", sermonRouter);

// Basic health check route for the root
app.get("/", (req, res) => {
  res.status(200).json({ msg: "Emmasdale SDA Church API is running successfully!" });
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 5000;

const start = async () => {
  try {
    if (!process.env.MONGO_URL) {
      logger.fatal("FATAL ERROR: MONGO_URL environment variable is missing.");
      process.exit(1);
    }
    
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () =>
      logger.info(`Server is listening on port ${port}....`)
    );
  } catch (error) {
    logger.error({ msg: "Error starting server:", error });
    process.exit(1);
  }
};

start();
