import { CorsOptions } from "cors";

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
];

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || process.env.NODE_ENV === 'development') {
      return callback(null, true);
    }

    if (origin && allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      const errorMsg = `Origem '${origin}' não permitida`;
      return callback(new Error(errorMsg), false);
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: true,
  optionsSuccessStatus: 200,
  maxAge: 86400,
};
