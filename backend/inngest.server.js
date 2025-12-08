import express from "express";
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js"

const app = express();
// Important: ensure you add JSON middleware to process incoming JSON POST payloads.
app.use(express.json());
// Set up the "/api/inngest" (recommended) routes with the serve handler
app.use("/api/inngest", serve({ client: inngest, functions }));



// app.listen(3000, () => {
//   console.log('Server running on http://localhost:3000');
// });

const PORT = 4000; // Use DIFFERENT PORT
app.listen(PORT, () => {
  console.log(`Inngest server running on http://localhost:${PORT}`);
});