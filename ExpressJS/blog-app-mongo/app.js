const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");
const indexRoutes = require("./routes/index");
const authMiddleware = require("./middleware/authMiddleware");
const expressLayouts = require("express-ejs-layouts");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(expressLayouts);
app.use((req, res, next) => {
  res.locals.userId = req.session.userId;
  next();
});
app.use("/", indexRoutes);
app.use("/auth", authRoutes);
app.use("/posts", authMiddleware, postRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
