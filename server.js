import path from "path";
import { dirname } from "path";
import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import { fileURLToPath } from "url";

// import fileUpload from "express-fileupload";
import cloudinary from "cloudinary";
import "express-async-errors";
import morgan from "morgan";
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
//db and authenticateUser
import connectDB from "./db/connect.js";

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
//middleware
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}
app.use(express.json());

app.use(express.static("./public"));

// app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: false,
    directives: {
      "default-src": helmet.contentSecurityPolicy.dangerouslyDisableDefaultSrc,
      "script-src": ["'self'"],
    },
  })
);
app.use(xss());
app.use(mongoSanitize());

const __dirname = dirname(fileURLToPath(import.meta.url));

// only when ready to deploy
app.use(express.static(path.resolve(__dirname, "./client/build")));

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

app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}....`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
