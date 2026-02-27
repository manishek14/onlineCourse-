require("dotenv").config({ path: require("path").join(__dirname, ".env") });
const connectDB = require("./configs/db");

const startServer = async () => {
  await connectDB();

  const app = require("./app");

  const port = process.env.PORT || 3000;

  app.get("/", (req, res) => {
    res.json({ 
      message: "Online Course Platform API",
      version: "1.0.0",
      documentation: "/api-docs"
    });
  });

  app.get("/health", (req, res) => {
    res.status(200).json({ 
      status: "healthy",
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    });
  });

  app.listen(port, () => {
    console.log(`server is running on port ${port}.`);
  });
};

startServer();
