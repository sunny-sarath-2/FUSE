var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var cookieParser = require("cookie-parser");
var cors = require("cors");
var https = require("https");
var fs = require("fs");
let exec = require("child_process").exec;
let _ = require("lodash");

const app = express();

const port = process.env.PORT || 3001;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/", express.static(__dirname + "/public"));

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT ,DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, Authorization"
  );
  next();
});
app.get("/launch", (req, res) => {
  exec("lsof -i -P -n | grep LISTEN", (err, stdout, stderr) => {
    let openports = _.words(stdout.replace(/[^0-9]+/g, " "));
	console.log(req.body)    
//res.send({body:req.body})
     createSite(openports, port + 1).then((result, err,finlizedPort ) => {
      console.log(result, err,finlizedPort );
      res.send({ result: result, err: err, finlizedPort :finlizedPort  });
    });
  });
});

createSite = (openports, portgiven) =>
  new Promise((resolves, rejects) => {
    {
      if (!openports.includes(portgiven)) {
        let finlizedPort = portgiven;
console.log(finlizedPort)
console.log(`firewall-cmd --zone=public --add-port=${finlizedPort}/tcp --permanent`)
console.log(`docker run -d --name check1 -p ${finlizedPort}:3000 affiliate`)
        exec(
          `firewall-cmd --zone=public --add-port=${finlizedPort}/tcp --permanent`,
          (err, stdout, stderr) => {
            console.log(err, stdout, "created");
            if (stdout == "success\n") {
              console.log("created");
              exec("firewall-cmd --reload", () => {
                exec(
                  `docker run -d --name ${finlizedPort} -p ${finlizedPort}:3000 affiliate`,
                  (err, stdout) => {
                    resolves(finlizedPort ,stdout, err,finlizedPort );
                    console.log(err, stdout);
                  }
                );
              });
            }
          }
        );
      } else {
        createSite(openports, portgiven + 1);
      }
    }
  });

app.get("*", function(req, res, next) {
  res.sendFile(path.resolve(__dirname + "/public", "", "index.html"));
});

https
  .createServer(
    {
      key: fs.readFileSync("server.key"),
      cert: fs.readFileSync("server.cert")
    },
    app
  )
  .listen(port, () => console.log(`Listening on port ${port}`));
