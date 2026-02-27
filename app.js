const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const authsRouter = require("./routes/v1/auth");
const usersRouter = require("./routes/v1/user");
const categoriesRouter = require("./routes/v1/category");
const coursesRouter = require("./routes/v1/course");
const commentsRouter = require("./routes/v1/comment");
const contactRouter = require("./routes/v1/contact");
const newsLetterRouter = require("./routes/v1/contact");
const searchRouter = require("./routes/v1/search");
const notificationRouter = require("./routes/v1/notification");
const discountRouter = require("./routes/v1/discount");
const articleRouter = require("./routes/v1/article");
const orderRouter = require("./routes/v1/order");
const ticketRouter = require("./routes/v1/ticket");
const menuRouter = require("./routes/v1/menu");
const configSwagger = require("./configs/swagger");

configSwagger(app);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser(bcrypt.hash("hello", 12)));
app.use(cors());
app.use(helmet());
app.use(
  "/course/covers",
  express.static(path.join(__dirname, "public", "course", "covers")),
);

/**
 * @swagger
 * /auth :
 *  get :
 *      summary : get personal user
 *      description : get personal user info with access , refresh Token
 *      responses :
 *      200 :
 *          description : get user info successfully.
 *      401 :
 *          description : user is not valid or user access token expired!
 */
app.use("/v1/auth", authsRouter);
app.use("/v1/users", usersRouter);
app.use("/v1/category", categoriesRouter);
app.use("/v1/courses", coursesRouter);
app.use("/v1/comments", commentsRouter);
app.use("/v1/contacts", contactRouter);
app.use("/v1/newsletters", newsLetterRouter);
app.use("/v1/search", searchRouter);
app.use("/v1/notifications", notificationRouter);
app.use("/v1/discounts", discountRouter);
app.use("/v1/articles", articleRouter);
app.use("/v1/orders", orderRouter);
app.use("/v1/tickets", ticketRouter);
app.use("/v1/menus", menuRouter);

app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(500).json({ error: err.message });
});

module.exports = app;
