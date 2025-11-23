import express from "express";
import cors from "cors";
import { corsOptions } from "./middlewares/globals/cors";
import { ErrorHandlerMiddleware } from "./middlewares/globals/Errors";
import serviceFormRoutes from "./routes/v1/service-form/serviceForm.routes";
import authRoutes from "./routes/v1/auth.routes";
import adminRoutes from "./routes/v1/admin.routes";
import { setupSwagger } from "./swagger";
import PortfolioUploadService from "./routes/v1/portifolio-upload/portfolioUpload.routes";

export const app = express();

app.use(express.json());
app.use(cors(corsOptions));

setupSwagger(app);

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API Kalita Fotografia está online",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/v1/portfolio", PortfolioUploadService);
app.use("/api/v1/service-form", serviceFormRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("API Kalita Fotografia está online");
});

app.use(ErrorHandlerMiddleware);
