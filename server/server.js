import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import adminRouter from "./routes/adminRoute.js";
import blogRouter from "./routes/blogRoute.js";

const app = express();
app.use(express.json());
app.use(cors());

await connectDB();

app.use("/api/admin", adminRouter);
app.use("/api/blog", blogRouter);

app.get("/", (req, res) => {
  res.send("Hi Beeresh");
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, (req, res) => {
  console.log("Server is running port " + PORT);
});

export default app;
