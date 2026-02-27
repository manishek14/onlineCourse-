require("dotenv").config({ path: require("path").join(__dirname, ".env") });
const connectDB = require("./configs/db");

const startServer = async () => {
  await connectDB();

  const app = require("./app");

  const port = process.env.PORT || 3000;

  app.get("/", (req, res) => {
    const token = req.header("Authorization").split(" ")[1];
    res.json({ message: `token => ${token}` });
  });

  app.listen(port, () => {
    console.log(`server is running on port ${port}.`);
  });
};

startServer();
