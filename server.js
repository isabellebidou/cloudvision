
var express = require("express"); // call expresss to be used by application
var app = express();
const uploadRoutes = require("./routes/uploadroutes");
const visionApiRoutes = require("./routes/visionapiroutes");
const recommandationRoutes = require("./routes/recommandationroutes");
app.use(uploadRoutes);
app.use(visionApiRoutes);
app.use(recommandationRoutes);
app.use(express.static("scripts"));
app.get("/", (req, res) => res.render("index"));
app.set("view engine", "pug");
//set up the environment for the app to run
app.listen(process.env.PORT || 7000, process.env.IP || "0.0.0.0", function () {
  if (!process.env.PORT) console.log("app is running on port 7000");
});
