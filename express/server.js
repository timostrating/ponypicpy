
const express = require("express");
const app = express();
const minify = require("express-minify");

///////////////////////////////////////////////////  
//                                               //
// API-Functions (eg. /api/verymuchjsondata)     //
//                                               //
///////////////////////////////////////////////////
const api = express.Router();
app.use("/api", api);

api.use((_req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    next();
});

const apiFiles = [
    "charts/vrije-dagen",
    "charts/zon"
];
for (var i in apiFiles)
    require("./" + apiFiles[i] + ".js")(api);

app.get("/", (req, res, next) => {
    console.log("er zit iemand op de site ofzo");
    next();
});
app.use(minify());
app.use("/", express.static(__dirname + "/web_app"));
app.use("*", (req, res) => res.sendFile(__dirname + "/web_app/index.html"));
app.listen(9090, () => console.log("Ponypic listening on port 9090"));