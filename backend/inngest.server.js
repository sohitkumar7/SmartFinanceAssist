import express from "express";
import { serve } from "inngest/express";
import dotenv from "dotenv";
import { inngest } from "./inngest/index.js";
import { functions } from "./inngest/functions.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/api/inngest", serve({ client: inngest, functions }));

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}`);
});
