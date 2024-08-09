import express from "express";
import morgan from "morgan";
import "dotenv/config";
import appRoutes from "./routes";
import globalErrorHandler from "./utils/global-error-handler";
import cookieParser from "cookie-parser";

const app = express();

app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser());

app.use(appRoutes);

app.use(globalErrorHandler);
export default app;
