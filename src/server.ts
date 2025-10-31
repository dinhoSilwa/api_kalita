import express, { Request, Response } from "express";
import cors from "cors";
import { corsOptions } from "./middlewares/cors";
import { ErrorHandlerMiddleware } from "./middlewares/Errors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors(corsOptions));

app.get("/", (req: Request, res: Response) => {
  res.send(`Api is running on port ${res.req.socket.localPort}`);
});

app.use(ErrorHandlerMiddleware);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
